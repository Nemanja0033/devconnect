import ErrorTooltip from '@/components/reusables/FormErrorTooltip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'
import { postComment } from '@/features/post/services/post-interactions-service';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useFetchCommentsQuery } from '../../hooks/useFetchCommentsQuery';
import { Loader2 } from 'lucide-react';
import Loader from '@/components/screens/Loader';
import SingleComment from './SingleComment';
import { getSession } from 'next-auth/react';
import { NotificationType } from '@/features/notifications/types';
import { sendNotification } from '@/features/notifications/services/notification-service';

// ** This component needs to be refactored latter in production . . .

interface CommentForm {
    comment: string
}

const CommentSection = ({ post }: any) => {
  const { data: comments, isLoading, isError, refetch } = useFetchCommentsQuery(post.id);
  const [isFocused, setIsFocused] = useState(false);
  const commentForm = useForm<CommentForm>();
  const { handleSubmit, formState: { errors, isSubmitting }, reset, register} = commentForm;

  const handlePostComment = async (data: CommentForm) => {
    if(!data) return;
    const { comment } = data;
    const session: any = await getSession();
    const url = `/post/${post.id}#comment`;
    try{        
        await postComment(post.id, comment);
        setIsFocused(false);
        reset();
        refetch();
        
        if(session.user.id !== post.authorId){
            await sendNotification(session.user.id, session.user.name, post.authorId, url, NotificationType.COMMENT);
        }
    }
    catch(err){
        console.error("Error while commenting", err)
    }
  }

  return (
    <div id='comments' className='w-full grid gap-3'>
        <div className='w-full flex justify-start'>
            <span className='text-lg font-semibold'>Comments {!isLoading && `(${comments?.data.length})`}</span>
        </div>
        <hr />
        <form onSubmit={handleSubmit(handlePostComment)} className='w-full relative'>
            <Textarea {...register('comment', {
                required: "Enter a comment",
                maxLength: {
                    value: 1000,
                    message: "Limit reached!"
                }
            })} onFocus={() => setIsFocused(true)} className={`${isFocused && 'h-32'} max-h-40 px-5`} placeholder='Leave your comment. . .' />
            {isFocused && (
                
                <div className='flex items-center gap-2 absolute bottom-2 right-2'>
                    <Button onClick={() => setIsFocused(false)} className='text-white cursor-pointer' variant={'secondary'}>Cancel</Button>
                    <Button type='submit' className='text-white font-semibold cursor-pointer' variant={'default'}>{isSubmitting ? <Loader2 className='animate-spin' /> : 'Comment'}</Button>
                </div>
            )}
            <div className='absolute'>
                {errors.comment && <ErrorTooltip>{errors.comment.message}</ErrorTooltip>}
            </div>
        </form>

        <div className='w-full grid place-items-center gap-2 mt-5'>
           {isLoading ? (
            <Loader />
           ) : comments?.data.map((com: any) => (
                <SingleComment comment={com} authorId={post.authorId} />
            ))}
        </div>
    </div>
  )
}

export default CommentSection