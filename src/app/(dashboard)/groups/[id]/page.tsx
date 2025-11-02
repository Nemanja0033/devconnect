'use client'
import GlobalLoader from "@/components/screens/GlobalLoader";
import { Button } from "@/components/ui/button";
import Post from "@/features/feed/components/Post";
import CreateGroupPostModal from "@/features/groups/components/modals/CreateGroupPostModal";
import { useGroupFeed } from "@/features/groups/hooks/useGroupFeed";
import { useIsUserInGroup } from "@/features/groups/hooks/useIsUserInGroup";
import { fetchSingleGroup } from "@/features/groups/services/groups-service";
import { useGroupFeedStore } from "@/features/groups/store/useGroupStore";
import { GroupPostForm } from "@/features/groups/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function GroupFeedPage(){
    const params : { id: string} = useParams();
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['group', params?.id],
        queryFn: () => fetchSingleGroup(params.id),
        enabled: !!params?.id
    });
    const { isUserInGroup } = useIsUserInGroup(data?.groupData?.[0].members ?? []);
    const { setIsNewPostModalOpen } = useGroupFeedStore();
    const { isLoading: isPostCreating, handleCreateGroupPost } = useGroupFeed(params.id);
    const createGroupPostForm = useForm<GroupPostForm>();

    if(isLoading){
        return <GlobalLoader />
    }

    return(
        <div className="w-full h-full flex justify-center">
            <div className="w-[600px]  flex-col">
                <div className="w-full flex justify-between my-3">
                    <h1 className="text-2xl font-semibold">{data?.groupData?.[0].name}</h1>
                    {isUserInGroup && <Button onClick={() => setIsNewPostModalOpen(true)} className="text-white cursor-pointer">+ New post</Button>}
                </div>

                <div className="grid gap-2 place-items-center w-full">
                    {data?.groupData[0].posts.map((p: any) => (
                        <Post key={p.id} post={p} />
                    ))}
                </div>
            </div>
            <FormProvider {...createGroupPostForm}>
                <CreateGroupPostModal handleSubmit={handleCreateGroupPost} />
            </FormProvider>
            {isPostCreating && <GlobalLoader />}
        </div>
    )

}