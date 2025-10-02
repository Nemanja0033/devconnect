import Loader from '@/components/screens/Loader'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import UploadImageForm from '@/features/post/components/UploadImage'
import React from 'react'

const EditAvatarModal = ({ isAvatarEditOpen, setIsAvatarEditOpen, isUploading, imagesUrl, handleUpdateUser, uploadImages}: any) => {
  return (
    <AlertDialog open={isAvatarEditOpen} onOpenChange={setIsAvatarEditOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Change Avatar</AlertDialogTitle>
                <UploadImageForm isInModal={true} onUpload={uploadImages} />
                <div className="flex justify-center items-center w-full mt-2">
                    {isUploading ? <Loader /> : imagesUrl.length > 0 && (
                        <div>
                            <img src={imagesUrl[0]} className="w-32 h-32 rounded-full" />
                            <span className="text-primary text-sm">*Avatar succesfully uploaded!</span>
                        </div>
                    )}
                </div>
                <div className="w-full flex justify-end mt-3 gap-2 items-center">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={() => {
                        handleUpdateUser();
                        setIsAvatarEditOpen(false);
                    }}>Save</Button>
                </div>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default EditAvatarModal