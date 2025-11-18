"use client";
import { Button } from "@/components/ui/button";
import WelcomeModal from "@/features/feed/components/modals/WelcomeModal";
import Post from "@/features/feed/components/Post";
import PostSkeleton from "@/features/feed/components/PostSkeleton";
import { useMeQuery } from "@/features/user/hooks/useMeQuery";
import { PostType } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export default function FeedPage() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<{ posts: PostType[]; nextCursor?: string }, Error>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get("/api/posts", {
        params: { cursor: pageParam, limit: 10 },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: currentUser } = useMeQuery();
  const allPosts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <div className="w-full p-3 h-full grid gap-2 place-items-center">
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => <PostSkeleton key={i} />)
        : allPosts.map((p) => {
            const isMyProfile = currentUser?.user?.username === p.author.username;
            return <Post key={p.id} post={p} isMyProfile={isMyProfile} />;
          })}

      {hasNextPage && (
        <Button
          variant="outline"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 text-sm text-primary cursor-pointer"
        >
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </Button>
      )}
      <WelcomeModal />
    </div>
  );
}
