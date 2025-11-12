import ErrorTooltip from '@/components/reusables/FormErrorTooltip';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import Loader from '@/components/screens/Loader';
import SingleComment from './SingleComment';
import GlobalLoader from '@/components/screens/GlobalLoader';
import { PostType } from '@/types';
import { useHandleComments } from '../../hooks/useHandleComments';

export interface CommentForm {
    comment: string
}

const CommentSection = ({ post }: { post: PostType }) => {
  const commentForm = useForm<CommentForm>();
  const { handleSubmit, formState: { errors, isSubmitting }, reset, register} = commentForm;
  const { comments, isPending, isCommentSubmiting, handlePostComment, handleDeleteComment, setIsFocused, isFocused } = useHandleComments(post, reset);


  return (
    <div id='comments' className='w-full grid gap-3'>
        {isCommentSubmiting && <GlobalLoader />}
        <div className='w-full flex justify-start'>
            <span className='text-lg font-semibold'>Comments {!isPending && `(${comments?.data.length})`}</span>
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
           {isPending ? (
            <Loader />
           ) : comments?.data.map((com: Comment) => (
                <SingleComment key={com.id} deleteComment={() => handleDeleteComment(com.id)} comment={com} authorId={post.authorId} />
            ))}
        </div>
    </div>
  )
}

export default CommentSection