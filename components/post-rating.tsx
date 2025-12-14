"use client";

import SelectStar from "@/components/select-star";

type Props = {
  postId: number;
  averageRating: number | null;
  userRating: number | null;
  isAuthenticated: boolean;
  slug: string;
};

export default function PostRating({
  postId,
  averageRating,
  userRating,
  isAuthenticated,
  slug,
}: Props) {
  return (
    <div className="mt-8 space-y-2">
      {/* ⭐ Moyenne */}
      <div className="flex items-center gap-2">
        <span className="font-semibold">Rating:</span>
        {averageRating ? (
          <>
            <span>{averageRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">
              / 5
            </span>
          </>
        ) : (
          <span className="text-gray-500">No ratings yet</span>
        )}
      </div>

      {/* ⭐ Note utilisateur */}
      {isAuthenticated ? (
        <div>
          <p className="text-sm text-gray-600 mb-1">
            Your rating
          </p>
          <SelectStar
            postId={postId}
            initialValue={userRating}
            slug={slug}
          />
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Login to rate this article
        </p>
      )}
    </div>
  );
}
