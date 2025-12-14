import PostRating from "@/components/post-rating";
import SelectStar from "@/components/select-star";
import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      comments: {
        include: { author: true },
      },
      postRatings: true,
    },
  });


  if (!post) {
    notFound();
  }

  let averageRating = 0;
  if (post.postRatings && post.postRatings.length > 0) {
    const totalRating = post.postRatings.reduce(
      (sum, rating) => sum + rating.value,
      0
    );
    averageRating = totalRating / post.postRatings.length;
  }

  // Placeholder for user-specific rating and authentication status.
  // In a real application, 'user' and 'userRating' would be fetched
  // based on the authenticated user's session.
  const user = await getUser();
  const userRating =
    post.postRatings.find((rating) => rating.userId === user?.id)?.value ||
    null;
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{post.title}</h1>
        <p className="text-gray-600 text-center">by {post.author.name}</p>
        <div className="prose prose-gray mt-8">
          {post.content || "No content available."}
        </div>
        <div>
          {/* comments */}
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <ul>
            {post.comments.length > 0 ? (
              post.comments.map((comment) =>
                comment ? (
                  <li key={comment.id}>
                    <p className="text-gray-600">{comment.content}</p>
                    <p>{comment.author.name}</p>
                  </li>
                ) : null
              )
            ) : (
              <li>
                <p className="text-gray-600">No comments available.</p>
              </li>
            )}
          </ul>
        </div>
        <PostRating
          postId={post.id}
          averageRating={averageRating}
          userRating={userRating}
          isAuthenticated={isAuthenticated}
          slug={post.slug}
        />
        <Link href="/posts" className="text-blue-500">
          Back to posts
        </Link>
      </article>
    </div>
  );
}
