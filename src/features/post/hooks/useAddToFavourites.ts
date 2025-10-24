import { addPostToFavourites } from "@/services/post-interactions/post-interactions-service";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

// ** TODO fix favourites api, need to remove favourite on second click
export function useAddToFavourites(post: any){
       const  [isSavedLoading, setIsSavedLoading] = useState(false);
        const [isSaved, setIsSaved] = useState<boolean | null>(null);
        const [favourites, setFavourites] = useState<number | null>(null);
    
        // **TODO** implement some rate limiting for likes
            const handleAddPostToFavourites = async (postId: string) => {
                const user: any = await getSession();
                
                if(!user) return;
        
                try {
                    // Optimistic UI update
                    setIsSaved(!isSaved);
                    setFavourites((prev) => (prev ?? 0) + (isSaved ? -1 : 1));
        
                    await addPostToFavourites(postId, user?.user.id);
        
        
                } catch (err) {
                    setIsSaved((prev) => !prev);
                    setFavourites((prev) => (prev ?? 0) + (isSaved ? 1 : -1));
                    console.error("Error saving the post:", err);
                }
            };
    
            useEffect(() => {
                    const fetchFavourites = async () => {
                        try {
                            setIsSavedLoading(true);
                            const session: any = await getSession();
                            const userId = session?.user.id;
            
                            if (!userId) {
                                setIsSavedLoading(false);
                                setIsSaved(false);
                                setFavourites(post.favourite.length);
                                return;
                            }
        
                            console.log("@POSTTT ", post)
                            const userAreSavedPost = post.favourite.find((fav: any) => fav.authorId === userId);
                            setIsSaved(!!userAreSavedPost);
                            setFavourites(post.favourite.length);
                        } catch (err) {
                            console.error("Error fetching favourites:", err);
                        }
                        finally{
                            setIsSavedLoading(false);
                        }
                    };
            
                    fetchFavourites();
                }, [post.favourite]);
    
            return{
                isSavedLoading,
                isSaved,
                favourites,
                handleAddPostToFavourites
            }
}