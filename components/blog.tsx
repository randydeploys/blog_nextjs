import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/prisma";
import Link from "next/link"; // Changed from 'lucide-react' to 'next/link'

const Blog = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      {" "}
      {/* Corrected max-w class */}
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-semibold tracking-tight">
          Les derniers articles
        </h2>
        <Select defaultValue="recommended">
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommandé</SelectItem>
            <SelectItem value="latest">Plus récent</SelectItem>
            <SelectItem value="popular">Populaire</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          // Link to post
          <Card asChild key={post.id} className="shadow-none py-0 gap-3">
            <Link href={`/posts/${post.slug}`}>
              <CardContent className="pt-0 pb-5 px-5">
                {post.categories.length > 0 && (
                  <Badge variant="secondary">{post.categories[0].name}</Badge>
                )}

                <h3 className="mt-4 text-2xl text-[1.4rem] font-semibold tracking-[-0.015em]">
                  {post.title}
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-3">
                  {" "}
                  {/* Added line-clamp for truncation */}
                  {post.content}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-muted"></div>
                    <span className="text-muted-foreground font-medium">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="text-muted-foreground text-sm">
                    {post.createdAt.toDateString()}
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
