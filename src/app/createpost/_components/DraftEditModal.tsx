import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { FormProvider } from "react-hook-form"
import { mapImagesObjectToRawArray } from "../_lib/lib"
import PostForm from "./PostForm"
import ProjectForm from "./ProjectForm"
import UploadedImagesMap from "./UploadedImagesMap"
import { useDraft } from "../_hooks/useDraft"
import { useSubmitPost } from "../_hooks/useSubmitPost"
import { useUploadImages } from "../_hooks/useUploadImages"

const DraftEditModal = () => {
    const {
        currentDraft,
        isDraftModalOpen,
        setIsDraftModalOpen,
        isSavingDraft,
        handleSavePostDraft,
    } = useDraft();
    const { 
        createPostForm,
        createProjectForm, 
        handleSubmitPost, 
        handleSubmitProjectPost
        } = useSubmitPost();
    const { isLoading, handleRemoveUploadedImage } = useUploadImages();
    return (
         <AlertDialog open={isDraftModalOpen} onOpenChange={setIsDraftModalOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit {currentDraft?.title}</AlertDialogTitle>
            </AlertDialogHeader>

            {currentDraft?.type === "CLASSIC" && (
                <FormProvider {...createPostForm}>
                {/* <UploadedImagesMap isLoading={isLoading} imagesUrl={mapImagesObjectToRawArray(currentDraft.images)} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} /> */}
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