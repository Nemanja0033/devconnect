import PostCard from "@/components/reusables/PostCard";
import { db } from "@/lib/prismaClient"; 

// ISR for refreshing cached data every x seconds

export const revalidate = 60; 

async function fetchPosts() {
  return await db.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      img: true,
      createdAt: true,
      _count: {
        select: {
          Like: true, 
          Comment: true, 
        },
      },
    },
  });
}


export default async function FeedPage() {
  const posts = await fetchPosts();

  return (
    <main className="w-full h-full flex px-5 justify-center">
      <section className="lg:w-[70%] grid grid-cols-1 place-items-center items-start p-5 rounded-md border-x border-gray-50 mt-3 shadow-lg">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} image={post.img} title={post.title} id={post.id} likes={post._count.Like} comments={post._count.Comment} author={""} date={""} />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </section>
    </main>
  );
}
