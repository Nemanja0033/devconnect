import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import { useForm } from 'react-hook-form'

interface GroupForm {
    name: string,
    description: string
}

const CreateGroupForm = ({ onSubmit, onClose }: { onSubmit: () => void, onClose: () => void }) => {
    const createGroupForm = useForm<GroupForm>();
    const { handleSubmit, register, formState: { errors } } = createGroupForm;
    
    return (
        <form className='grid gap-2 w-full' onSubmit={handleSubmit(onSubmit)}>
            <Label className='text-primary' htmlFor='name' >*Group name</Label>
            <Input id='name' className='px-3' placeholder='e.g Frontend React' />
            <Label className='text-primary' htmlFor='desc'>*Group name</Label>
            <Textarea id='desc' className='px-3 max-h-32 h-20' placeholder='e.g Articles about React ecosystem. .  .'  />
            <div className='w-full flex justify-end gap-2'>
                <Button onClick={onClose} variant={'secondary'} className='cursor-pointer'>Close</Button>
                <Button type='submit' className='text-white cursor-pointer'>Submit</Button>
            </div>
        </form>
    )
}

export default CreateGroupForm