import { AlertDialogHeader, AlertDialogFooter, AlertDialog, AlertDialogContent, AlertDialogCancel, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { FormProvider } from "react-hook-form"
import PostForm from "../../../features/post/components/PostForm"
import ProjectForm from "../../../features/post/components/ProjectForm"
import UploadedImagesMap from "@/features/post/components/UploadedImagesMap"
import { useEditDraftStore } from "@/store/useDraftStore"
import { PostDraftType, ProjectDraftType } from "../types"

interface DraftEditModal {
    isUploadedPhotosLoading: boolean,
    currentDraft: PostDraftType | ProjectDraftType | null,
    createPostForm: any
    createProjectForm: any
    handleSubmitProjectPost: () => void, 
    isSavingDraft: boolean,
    handleSavePostDraft: (form: any) => void
    handleSubmitPost: () => void
    handleRemoveUploadedImage: (url: string) => void
    setImageToPreview: (imageId: string) => void
    setIsPreviewOpen: (isPreview: boolean) => void
}

const DraftEditModal = ({
    isUploadedPhotosLoading,
    currentDraft, 
    createPostForm, 
    createProjectForm, 
    handleSubmitProjectPost, 
    isSavingDraft, 
    handleSavePostDraft, 
    handleSubmitPost,
    handleRemoveUploadedImage,
    setImageToPreview,
    setIsPreviewOpen} : DraftEditModal) => {
    const { isEditDraftModalOpen, setIsEditDraftModalOpen } = useEditDraftStore();
    
    return (
         <AlertDialog open={isEditDraftModalOpen} onOpenChange={setIsEditDraftModalOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Edit {currentDraft?.title}</AlertDialogTitle>
            </AlertDialogHeader>

            {currentDraft?.type === "CLASSIC" && (
                <FormProvider {...createPostForm}>
                <UploadedImagesMap isLoading={isUploadedPhotosLoading} imagesUrl={currentDraft.images} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} />
                <PostForm
                    isSavingDraft={isSavingDraft}
                    saveDraft={handleSavePostDraft}
                    savedFromDraft={currentDraft}
                    onSubmit={handleSubmitPost}
                />
                </FormProvider>
            )}

            <div className="overflow-auto">
                {currentDraft?.type === 'PROJECT' && (
                    <FormProvider {...createProjectForm}>
                    <UploadedImagesMap isLoading={isUploadedPhotosLoading} imagesUrl={currentDraft.images} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} />
                    <ProjectForm savedFromDraft={currentDraft} onSubmit={handleSubmitProjectPost} />
                    </FormProvider>
                )}
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DraftEditModal
