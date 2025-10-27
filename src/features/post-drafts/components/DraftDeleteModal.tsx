import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useDeleteDraftStore } from "@/features/post-drafts/store/useDraftStore";
import { PostDraftType, ProjectDraftType } from "../types";

const DraftDeleteModal = ({ currentDraft, handleDeleteDraft} : { currentDraft: PostDraftType | ProjectDraftType | null, handleDeleteDraft: (draftType: "post" | "project", draftId: string | undefined) => void}) => {
  const { isDeleteDraftModalOpen, setIsDeleteDraftModalOpen } = useDeleteDraftStore();
  
  return (
    <AlertDialog open={isDeleteDraftModalOpen} onOpenChange={setIsDeleteDraftModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {currentDraft?.title} draft.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteDraft(currentDraft?.type === "CLASSIC" ? 'post' : 'project', currentDraft?.id)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DraftDeleteModal