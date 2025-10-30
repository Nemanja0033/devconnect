import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useGroupFeedStore } from "../../store/useGroupStore"
import CreateGroupPostForm from "../forms/CreateGroupPostForm";

const CreateGroupPostModal = ({ handleSubmit }: { handleSubmit: () => void}) => {
    const { isNewPostModalOpen, setIsNewPostModalOpen } = useGroupFeedStore();
  return (
        <AlertDialog open={isNewPostModalOpen} onOpenChange={setIsNewPostModalOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Create Post</AlertDialogTitle>
            </AlertDialogHeader>
            <CreateGroupPostForm onClose={() => setIsNewPostModalOpen(false)} onSubmit={handleSubmit} />
            </AlertDialogContent>
        </AlertDialog>
  )
}

export default CreateGroupPostModal