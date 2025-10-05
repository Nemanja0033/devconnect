import Draft from '@/features/post-drafts/components/Draft';
import { DraftSkeleton } from '@/features/post-drafts/components/DraftSkeleton';
import { mapDraftsToNumberArray } from '@/features/post-drafts/lib/lib';
import { PostDraftType, ProjectDraftType } from '@/features/post-drafts/types';
import { useDeleteDraftStore, useEditDraftStore } from '@/store/useDraftStore';
import React from 'react'

const DraftSection = ({ isDraftsLoading, drafts, openEditDraftModal }: any) => {
  const { setIsDeleteDraftModalOpen} = useDeleteDraftStore();
  const { setCurrentDraft } = useEditDraftStore();
  return (
    <div className="w-full h-full overflow-auto">
              {isDraftsLoading ? <DraftSkeleton exsistingDrafts={mapDraftsToNumberArray(drafts)} /> : (
                drafts.map((draft: PostDraftType | ProjectDraftType) => (
                  <div className="w-full mt-3" key={draft.id}>
                    <Draft onEditClick={() => openEditDraftModal(draft.id)} 
                           onDeleteClick={() => {
                            setIsDeleteDraftModalOpen(true);
                            setCurrentDraft(draft);
                           }}
                           title={draft.title} 
                           type={draft.type} 
                    />
                  </div>
                ))
              )}

              {!isDraftsLoading && drafts.length === 0 && (
                <div className="w-full h-96 flex justify-center items-center">
                  <span className="text-md text-primary">No drafts to show</span>
                </div>
              )}
    </div>
  )
}

export default DraftSection