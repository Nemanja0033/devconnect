import { db } from "@/db/db";

export default async function postPage ({params}: {params: {id: string}}){
    const data = await db.post.findUnique({
        where: {id: params.id}
    })
    
    return(
        <div>
            <h1>Single post page</h1>
            <div>
                <h2>{data?.title}</h2>
            </div>
        </div>
    )
}
