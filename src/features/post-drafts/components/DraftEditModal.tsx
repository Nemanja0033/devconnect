import { AlertDialogHeader, AlertDialog, AlertDialogContent, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { FormProvider } from "react-hook-form"
import { useEditDraftStore } from "@/features/post-drafts/store/useDraftStore"
import { PostDraftType, ProjectDraftType } from "../types"
import PostForm from "@/features/post/components/create-post/PostForm"
import ProjectForm from "@/features/post/components/create-post/ProjectForm"
import UploadedImagesMap from "@/features/post/components/create-post/UploadedImagesMap"

interface DraftEditModal {
    isUploadedPhotosLoading: boolean,
    currentDraft: PostDraftType | ProjectDraftType | null,
    createPostFormDraft: any
    createProjectFormDraft: any
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
    createPostFormDraft, 
    createProjectFormDraft, 
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
                <FormProvider {...createPostFormDraft}>
                <UploadedImagesMap isLoading={isUploadedPhotosLoading} imagesUrl={currentDraft.images} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} />
                <PostForm
                    isSavingDraft={isSavingDraft}
                    saveDraft={handleSavePostDraft}
                    savedFromDraft={currentDraft}
                    onSubmit={handleSubmitPost}
                    onClose={() => setIsEditDraftModalOpen(false)}
                />
                </FormProvider>
            )}

            <div className="overflow-auto">
                {currentDraft?.type === 'PROJECT' && (
                    <FormProvider {...createProjectFormDraft}>
                    <UploadedImagesMap isLoading={isUploadedPhotosLoading} imagesUrl={currentDraft.images} removeImage={handleRemoveUploadedImage} setImageToPreview={setImageToPreview} setIsPreviewOpen={setIsPreviewOpen} />
                    <ProjectForm onClose={() => setIsEditDraftModalOpen(false)} savedFromDraft={currentDraft} onSubmit={handleSubmitProjectPost} />
                    </FormProvider>
                )}
            </div>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DraftEditModal
