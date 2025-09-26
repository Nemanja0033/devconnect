import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogCancel, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { FormProvider } from "react-hook-form"
import PostForm from "./PostForm"
import ProjectForm from "./ProjectForm"
import { mapImagesObjectToRawArray } from "../_lib/lib"
import UploadedImagesMap from "./UploadedImagesMap"

const DraftEditModal = ({
    isDraftModalOpen, 
    isUploadedPhotosLoading,
    setIsDraftModalOpen, 
    currentDraft, 
    createPostForm, 
    createProjectForm, 
    handleSubmitProjectPost, 
    isSavingDraft, 
    handleSavePostDraft, 
    handleSubmitPost} : any) => {
    
    return (
         <AlertDialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit {currentDraft?.title}</AlertDialogTitle>
            </AlertDialogHeader>

            {currentDraft?.type === "CLASSIC" && (
                <FormProvider {...createPostForm}>
                {/* <UploadedImagesMap isLoading={isUploadedPhotosLoading} imagesUrl={mapImagesObjectToRawArray(currentDraft.images)} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} /> */}
                <PostForm
                    isSavingDraft={isSavingDraft}
                    saveDraft={handleSavePostDraft}
                    savedFromDraft={currentDraft}
                    onSubmit={handleSubmitPost}
                />
                </FormProvider>
            )}

            {currentDraft?.type === 'PROJECT' && (
                <FormProvider {...createProjectForm}>
                {/* <UploadedImagesMap isLoading={isLoading} imagesUrl={mapImagesObjectToRawArray(currentDraft.images)} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} /> */}
                <ProjectForm savedFromDraft={currentDraft} onSubmit={handleSubmitProjectPost} />
                </FormProvider>
            )}

            <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DraftEditModal
