"use client"
import { Button } from "@/components/ui/button";
import CreateGroupModal from "@/features/groups/components/modals/CreateGroupModal";
import { useGroupStore } from "@/features/groups/store/useGroupStore";
import { useFetchGroupsQuery } from "@/features/groups/hooks/useFetchGroupsQuery";
import { GroupForm } from "@/features/groups/types";
import { FormProvider, useForm } from "react-hook-form";
import GlobalLoader from "@/components/screens/GlobalLoader";
import { useCreateGroup } from "@/features/groups/hooks/useCreateGroup";
import { useIsUserAuth } from "@/hooks/useSession";
import GroupCard from "@/features/groups/components/GroupCard";

export default function GroupsPage(){
    const { data, isLoading, isError } = useFetchGroupsQuery();
    const { setIsCreateModalOpen } = useGroupStore();
    const { isLoading: isGroupSubmitting, handleCreateGroup } = useCreateGroup();
    const createGroupForm = useForm<GroupForm>();
    const { isAuth } = useIsUserAuth();

    if(isLoading || isGroupSubmitting){
        return <GlobalLoader />
    }

    return(
        <main className="w-full h-full flex justify-center">
            <div className="w-5xl p-3 flex-col">
                <div className="w-full grid my-2">
                    <div className="w-full flex justify-between">
                        <h1 className="text-2xl font-semibold">Explore Groups</h1>
                        {isAuth && <Button onClick={() => setIsCreateModalOpen(true)} className="text-white cursor-pointer">+ Create New Group</Button> }
                    </div>
                    <p className="text-gray-500 text-lg">Create a space for your team, tech stack, or favorite dev topic</p>
                </div>

                <div className="grid md:grid-cols-3 w-full gap-3 mt-10">
                    {data?.data.groups.length < 1 ? (
                        <span className="text-gray-500">No groups found . . . </span>
                    ) : data?.data.groups.map((g: any) => (
                        <GroupCard key={g.id} group={g} />
                    ))}
                </div>
            </div>
            <FormProvider {...createGroupForm}>
                <CreateGroupModal handleCreateGroup={handleCreateGroup} />
            </FormProvider>
        </main>
    )
}