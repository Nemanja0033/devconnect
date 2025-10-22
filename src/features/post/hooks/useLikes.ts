"use client"
import { NotificationType } from "@/features/notifications/types";
import { sendNotification } from "@/services/notifications/notification-service";
import { likePost } from "@/services/post-interactions/post-interactions-service";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useLikes(post: any){
    const [isLikesLoading, setIsLikesLoading] = useState(false);
    const [isLiked, setIsLiked] = useState<boolean | null>(null);
    const [likes, setLikes] = useState<number | null>(null);

    // **TODO** implement some rate limiting for likes
        const handleLikePost = async (postId: string) => {
            const user: any = await getSession();
            
            if(!user) return;
    
            try {
                // Optimistic UI update
                setIsLiked(!isLiked);
                setLikes((prev) => (prev ?? 0) + (isLiked ? -1 : 1));
    
                // Call the API to like/unlike the post
                await likePost(postId);
    
                // Prevent self-like notifications
                if(post.author.id === user?.user.id) return;
    
                // Send notification only when post is liked
                if(!isLiked){
                    await sendNotification(user?.user.id, user?.user.name, post.authorId, NotificationType.LIKE);
                }
    
            } catch (err) {
                setIsLiked((prev) => !prev);
                setLikes((prev) => (prev ?? 0) + (isLiked ? 1 : -1));
                console.error("Error liking the post:", err);
            }
        };

        useEffect(() => {
                const fetchLikes = async () => {
                    try {
                        setIsLikesLoading(true);
                        const session: any = await getSession();
                        const userId = session?.user.id;
        
                        if (!userId) {
                            setIsLikesLoading(false);
                            setIsLiked(false);
                            setLikes(post.Like.length);
                            return;
                        }
        
                        const userLike = post.Like.find((like: any) => like.authorId === userId);
                        setIsLiked(!!userLike);
                        setLikes(post.Like.length);
                    } catch (err) {
                        console.error("Error fetching likes:", err);
                    }
                    finally{
                        setIsLikesLoading(false);
                    }
                };
        
                fetchLikes();
            }, [post.Like]);

        return{
            isLikesLoading,
            isLiked,
            likes,
            handleLikePost
        }
}
