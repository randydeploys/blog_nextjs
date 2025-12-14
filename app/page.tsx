import Link from "next/link";
import prisma from "@/lib/prisma";
import { UserGreeting } from "@/components/user-greeting";
import Blog from "@/components/blog";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  console.log(posts);
  return (
    <main className="container mx-auto px-4 py-8 ">
      <h1 className="text-5xl font-extrabold mb-8 text-center tracking-tight text-gray-900 font-[family-name:var(--font-geist-sans)]">
        Superblog
      </h1>

      <UserGreeting />

      <Blog />

    </main>
  );
}
