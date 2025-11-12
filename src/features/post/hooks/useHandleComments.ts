import { sendNotification } from "@/features/notifications/services/notification-service";
import { NotificationType } from "@/features/notifications/types";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteComment, postComment } from "../services/post-interactions-service";
import { CommentForm } from "../components/single-post-preview/CommentSection";
import { PostType } from "@/types";
import { useFetchCommentsQuery } from "./useFetchCommentsQuery";
import { useQueryClient } from "@tanstack/react-query";

export function useHandleComments(post: PostType, resetForm: any){
    const queryClient = useQueryClient();
    const { data: comments, isPending } = useFetchCommentsQuery(post.id);
    const [isCommentSubmiting, setIsCommentSubmiting] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handlePostComment = async (data: CommentForm) => {
        if(!data) return;
        setIsCommentSubmiting(true);
        const { comment } = data;
        const session: any = await getSession();
        const url = `/post/${post.id}#comment`;
        try{        
            await postComment(post.id, comment);
            setIsFocused(false);
            resetForm();
            await queryClient.invalidateQueries({ queryKey: ['comments', post.id]});
            
            if(session.user.id !== post.authorId){
                await sendNotification(session.user.id, session.user.name, post.authorId, url, NotificationType.COMMENT);
            }
        }
        catch(err){
            console.error("Error while commenting", err);
            toast.error("Something went wrong");
        }
        finally{
            setIsCommentSubmiting(false);
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        if(!commentId) return;
        
        try{
            await deleteComment(commentId);
            toast.success("Comment deleted");
            await queryClient.invalidateQueries({ queryKey: ['comments', post.id]});
        }
        catch(err){
            console.error("Error while commenting", err);
            toast.error("Something went wrong");
        }
    }

    return {
        comments,
        isPending,
        isCommentSubmiting,
        isFocused,
        handlePostComment,
        handleDeleteComment,
        setIsFocused
    }
}