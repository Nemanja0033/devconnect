import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { useGroupStore } from '@/features/groups/store/useGroupStore'
import React from 'react'
import CreateGroupForm from '../forms/CreateGroupForm';
import { useCreateGroup } from '../../hooks/useCreateGroup';

const CreateGroupModal = ({ handleCreateGroup }: { handleCreateGroup: any}) => {
  const { isCreateGroupModalOpen, setIsCreateModalOpen } = useGroupStore();

  return (
     <AlertDialog open={isCreateGroupModalOpen} onOpenChange={setIsCreateModalOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Create Group</AlertDialogTitle>
            </AlertDialogHeader>
            <CreateGroupForm onClose={() => setIsCreateModalOpen(false)} onSubmit={handleCreateGroup} />
            </AlertDialogContent>
        </AlertDialog>
  )
}

export default CreateGroupModal