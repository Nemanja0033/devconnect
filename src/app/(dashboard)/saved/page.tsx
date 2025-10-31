import { slugifyUsername } from "@/helpers/helpers";
import { getAuthOptions } from "@/lib/authOptions";
import { db } from "@/lib/prismaClient";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function FavouritePostsPage(){
    const session: any = await getServerSession(getAuthOptions());
    console.log(session);
    const favourites: any[] = await db.favourite.findMany({
        where: { authorId: session.user.id },
        select: {
            savedPost: {
                select: {
                    author: true,
                    id: true,
                    title: true,
                    content: true,
                    Comment: true,
                    Like: true,
                    images: true,
                    createdAt: true
                }
            }
        }
    });

    return(
        <div className="w-full h-full flex justify-center">
            <div className="w-5xl p-3 flex-col">
                <div className="w-full my-2 grid">
                    <h1 className="text-2xl font-semibold">Favourite Posts</h1>
                    <p className="text-gray-500 text-lg">Save posts you are intereset in for latter</p>
                </div>

                {favourites.length < 1 ? (
                    <div className="flex justify-center h-[70vh] items-center">
                        <span className="text-gray-600">No saved posts. . .</span>
                    </div>
                ) : null}

                <div className="grid md:grid-cols-3 w-full gap-3 mt-10">
                    {favourites.map((f) => (
                        <div key={f.savedPost.id} className="w-auto h-34 rounded-md shadow-md p-2 bg-accent/50">
                            <div className="w-full flex justify-between">
                                <div className="flex items-center gap-1">
                                    <Link href={`/profile/${slugifyUsername(f.savedPost.author.username)}`}>
                                        <img className="w-7 h-7 rounded-full" src={f.savedPost.author.avatar} alt="" />
                                    </Link>
                                    <Link href={`/post/${f.savedPost.id}`} className="font-semibold text-xl hover:underline cursor-pointer transition-all">{f.savedPost.title} </Link>
                                </div>
                            </div>
                        <p className="text-gray-500 line-clamp-3">{f.savedPost.content}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
}