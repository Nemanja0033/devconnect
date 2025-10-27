import { useMeQuery } from "@/features/user/hooks/useMeQuery";
import { addPostToFavourites } from "@/features/post/services/post-interactions-service";
import { useEffect, useRef, useState } from "react";

export function useAddToFavourites(post: any){
        const { data: userData } = useMeQuery();
        const [isSavedLoading, setIsSavedLoading] = useState(false);
        const [isSaved, setIsSaved] = useState<boolean | null>(null);
        const [favourites, setFavourites] = useState<number | null>(null);
        const debounceRef = useRef<NodeJS.Timeout | null>(null);

        
        const handleAddPostToFavourites = async (postId: string) => {
                try {
                    // Optimistic UI update
                    setIsSaved(!isSaved);
                    setFavourites((prev) => (prev ?? 0) + (isSaved ? -1 : 1));

                    if(debounceRef.current) clearTimeout(debounceRef.current);
                    
                    debounceRef.current = setTimeout(async() => {
                        if(!userData?.user.id) return;
                        await addPostToFavourites(postId, userData?.user.id);
                    }, 500);
                } catch (err) {
                    setIsSaved((prev) => !prev);
                    setFavourites((prev) => (prev ?? 0) + (isSaved ? 1 : -1));
                    console.error("Error saving the post:", err);
                }
            };
    
            useEffect(() => {
                    const conutFavourites = async () => {
                        try {
                            setIsSavedLoading(true);
            
                            if (!userData?.user.id) {
                                setIsSavedLoading(false);
                                setIsSaved(false);
                                setFavourites(post.favourite.length);
                                return;
                            }
        
                            console.log("@POSTTT ", post)
                            const userAreSavedPost = post.favourite.find((fav: any) => fav.authorId === userData?.user.id);
                            console.log("is user  liked ? ? ", post)
                            setIsSaved(!!userAreSavedPost);
                            setFavourites(post.favourite.length);
                        } catch (err) {
                            console.error("Error counting favourites:", err);
                        }
                        finally{
                            setIsSavedLoading(false);
                        }
                    };
            
                    conutFavourites();
                }, [post.favourite]);
    
            return{
                isSavedLoading,
                isSaved,
                favourites,
                handleAddPostToFavourites
            }
}