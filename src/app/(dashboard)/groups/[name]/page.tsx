import { Button } from "@/components/ui/button";
import { db } from "@/lib/prismaClient";

export default async function GroupFeedPage({ params }: { params: { name: string} }){
    const group = await db.group.findUnique({
        where: { name: params.name },
        include: {
            posts: true,
        }
    });

    return(
        <div className="w-full h-full flex justify-center">
            <div className="w-5xl p-3 flex-col">
                <div className="w-full flex justify-between">
                    <h1 className="text-2xl font-semibold">{group.name}</h1>
                    <Button className="text-white cursor-pointer">+ Post</Button>
                </div>
            </div>
        </div>
    )

}