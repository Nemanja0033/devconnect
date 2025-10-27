"use client"
import { sendNotification } from "@/features/notifications/services/notification-service";
import { NotificationType } from "@/features/notifications/types";
import { useMeQuery } from "@/features/user/hooks/useMeQuery";
import { likePost } from "@/features/post/services/post-interactions-service";
import { useEffect, useRef, useState } from "react";

export function useLikes(post: any){
    const { data: userData } = useMeQuery();
    const [isLikesLoading, setIsLikesLoading] = useState(false);
    const [isLiked, setIsLiked] = useState<boolean | null>(null);
    const [likes, setLikes] = useState<number | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    
    const handleLikePost = async (postId: string) => {
            try {
                // Optimistic UI update
                setIsLiked(!isLiked);
                setLikes((prev) => (prev ?? 0) + (isLiked ? -1 : 1));
    
                if(debounceRef.current) clearTimeout(debounceRef.current);

                debounceRef.current = setTimeout(async () => {
                    if(!userData?.user.id) return;

                    // Call the API to like/unlike the post
                    await likePost(postId);
        
                    // Prevent self-like notifications
                    if(post.author.id === userData?.user.id) return;
        
                    // Send notification only when post is liked
                    if(!isLiked){
                        const url = `/post/${post.id}`;
                        await sendNotification(userData?.user.id, userData?.user.username, post.authorId, url, NotificationType.LIKE);
                    }
                }, 500);
    
            } catch (err) {
                setIsLiked((prev) => !prev);
                setLikes((prev) => (prev ?? 0) + (isLiked ? 1 : -1));
                console.error("Error liking the post:", err);
            }
        };

        useEffect(() => {
                const countLikes = async () => {
                    try {
                        setIsLikesLoading(true);
        
                        if (!userData?.user.id) {
                            setIsLikesLoading(false);
                            setIsLiked(false);
                            setLikes(post.Like.length);
                            return;
                        }
        
                        const userLike = post.Like.find((like: any) => like.authorId === userData?.user.id);
                        setIsLiked(!!userLike);
                        setLikes(post.Like.length);
                    } catch (err) {
                        console.error("Error counitng likes:", err);
                    }
                    finally{
                        setIsLikesLoading(false);
                    }
                };
        
                countLikes();
            }, [post.Like]);

        return{
            isLikesLoading,
            isLiked,
            likes,
            handleLikePost
        }
}
