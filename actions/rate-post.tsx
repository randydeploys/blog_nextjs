"use server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export async function ratePost(postId: number, value: number, slug: string) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  if (value < 1 || value > 5) {
    throw new Error("Invalid rating");
  }

  await prisma.postRating.upsert({
    where: {
      userId_postId: {
        userId: user.id,
        postId,
      },
    },
    update: { value },
    create: {
      userId: user.id,
      postId,
      value,
    },
  });
  revalidatePath(`/posts/${slug}`);
}
