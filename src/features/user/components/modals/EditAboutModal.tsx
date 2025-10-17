import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { EditAboutForm } from '../types'

const EditAboutModal = ({ isAboutEditOpen, setIsAboutEditOpen, user, handleUpdateUser}: any) => {
  const { register, handleSubmit } = useFormContext<EditAboutForm>();

  return (
    <AlertDialog open={isAboutEditOpen} onOpenChange={setIsAboutEditOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Edit about</AlertDialogTitle>
                <form onSubmit={handleSubmit(handleUpdateUser)}>
                    <Label htmlFor="about" className="text-primary text-sm mb-2">*About</Label>
                    <Textarea {...register('bio')} defaultValue={user?.bio} id="about" />
                    <div className="w-full flex justify-end items-center gap-2 mt-3">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button type="submit" onClick={() => setIsAboutEditOpen(false)}>Save</Button>                        
                    </div>
                </form>
            </AlertDialogHeader>
            <AlertDialogFooter>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditAboutModal