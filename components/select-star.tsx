"use client";

import { useState, useTransition } from "react";
import { ratePost } from "@/actions/rate-post";
import { useRouter } from "next/navigation";

export default function SelectStar({
  postId,
  slug,
  initialValue,
}: {
  postId: number;
  slug: string;
  initialValue: number | null;
}) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleRate(star: number) {
    // ⚡ mise à jour instantanée
    setValue(star);

    startTransition(async () => {
      await ratePost(postId, star, slug);
      router.refresh(); // 🔄 recharge les Server Components
    });
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={isPending}
          onClick={() => handleRate(star)}
          className={`text-2xl transition ${
            star <= (value ?? 0)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
