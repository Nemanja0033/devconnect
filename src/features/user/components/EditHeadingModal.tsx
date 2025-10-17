import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { EditHeadingForm } from '../types'
import { Label } from '@/components/ui/label'

const EditHeadingModal = ({ user, isHeadingEditOpen, setIsHeadingEditOpen, handleUpdateUser }: any) => {
    const { register, handleSubmit } = useFormContext<EditHeadingForm>();

    return (
    <AlertDialog open={isHeadingEditOpen} onOpenChange={setIsHeadingEditOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit intro</AlertDialogTitle>
                <form className="w-full" onSubmit={handleSubmit(handleUpdateUser)}>
                    <Label className="text-primary text-sm" htmlFor="username">*Username</Label>
                    <Input {...register('username')} id="username" defaultValue={user?.username} />
                    <Label className="text-primary text-sm" htmlFor="title">*Title</Label>
                    <Input {...register("title")} id="title" defaultValue={user?.title} />
                    <div className="w-full flex justify-end mt-3 gap-2 items-center">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="submit" onClick={() => setIsHeadingEditOpen(false)}>Save</Button>
                    </div>
                </form>
            </AlertDialogHeader>
            <AlertDialogFooter>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
  )
}

export default EditHeadingModal