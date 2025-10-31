"use client";
import GlobalLoader from "@/components/screens/GlobalLoader";
import { fetchUserFavouritePosts } from "@/features/favourite-posts/services/favourites-service";
import { useMeQuery } from "@/features/user/hooks/useMeQuery";
import { slugifyUsername } from "@/helpers/helpers";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function FavouritePostsPage() {
  const { data: userData } = useMeQuery();
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["savedPosts", userData?.user?.id],
    queryFn: () => fetchUserFavouritePosts(userData?.user.id),
  });

  if (isLoading) {
    return (
      <GlobalLoader />
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="text-red-500">Failed to load favourite posts.</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-5xl p-3 flex-col">
        <div className="w-full my-2 grid">
          <h1 className="text-2xl font-semibold">Favourite Posts</h1>
          <p className="text-gray-500 text-lg">Save posts you are interested in for later</p>
        </div>

        {data.savedPosts.length < 1 ? (
          <div className="flex justify-center h-[70vh] items-center">
            <span className="text-gray-600">No saved posts...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 w-full gap-3 mt-10">
            {data.savedPosts.map((f: any) => (
              <div
                key={f.savedPost.id}
                className="w-auto h-34 rounded-md shadow-md p-2 bg-accent/50"
              >
                <div className="w-full flex justify-between">
                  <div className="flex items-center gap-1">
                    <Link href={`/profile/${slugifyUsername(f.savedPost.author.username)}`}>
                      <img
                        className="w-7 h-7 rounded-full"
                        src={f.savedPost.author.avatar}
                        alt=""
                      />
                    </Link>
                    <Link
                      href={`/post/${f.savedPost.id}`}
                      className="font-semibold text-xl hover:underline cursor-pointer transition-all"
                    >
                      {f.savedPost.title}
                    </Link>
                  </div>
                </div>
                <p className="text-gray-500 line-clamp-3">{f.savedPost.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
