import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { useGroupFeedStore } from '../../store/useGroupStore'
import { useFormContext } from 'react-hook-form'
import { GroupPostForm } from '../../types'
import ErrorTooltip from '@/components/reusables/FormErrorTooltip'

const CreateGroupPostForm = ({ onSubmit, onClose }: { onSubmit: () => void, onClose: () => void }) => {
    const { handleSubmit, register, formState: { errors } } = useFormContext<GroupPostForm>();
    const { setIsNewPostModalOpen } = useGroupFeedStore();
    
    return (
        <form className='grid gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <Label className='text-primary' htmlFor='name' >*Group name</Label>
            <Input {...register("title", { required: "Title is required" })} id='name' className='px-3' placeholder='e.g Frontend React' />
            
            {errors.title && <ErrorTooltip>{errors.title.message}</ErrorTooltip>}
            
            <Label className='text-primary' htmlFor='desc'>*Group name</Label>
            <Textarea {...register("content", { required: "Content is required"})} id='desc' className='px-3 max-h-32 h-20' placeholder='e.g Articles about React ecosystem. .  .'  />
            
            {errors.content && <ErrorTooltip>{errors.content.message}</ErrorTooltip>}
            
            <div className='w-full flex justify-end gap-2'>
                <Button type='button' onClick={onClose} variant={'secondary'} className='cursor-pointer'>Close</Button>
                <Button onClick={() => setIsNewPostModalOpen(false)} type='submit' className='text-white cursor-pointer'>Submit</Button>
            </div>
        </form>
    )
}

export default CreateGroupPostForm