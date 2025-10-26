"use client"
import { Button } from "@/components/ui/button";
import CreateGroupModal from "@/features/groups/components/modals/CreateGroupModal";
import { slugifyUsername } from "@/helpers/helper";
import { useGroupStore } from "@/store/useGroupStore";
import { Users } from "lucide-react";
import Link from "next/link";

export default function GroupsPage(){
    // Mock data for groups
    const mockGroups: any[] = []

    const { isCreateGroupModalOpen, setIsCreateModalOpen } = useGroupStore();

    return(
        <main className="w-full h-full flex justify-center">
            <div className="w-5xl p-3 flex-col">
                <div className="w-full grid my-2">
                    <div className="w-full flex justify-between">
                        <h1 className="text-2xl font-semibold">Explore Groups</h1>
                        <Button onClick={() => setIsCreateModalOpen(true)} className="text-white cursor-pointer">+ Create New Group</Button>
                    </div>
                    <p className="text-gray-500 text-lg">Create a space for your team, tech stack, or favorite dev topic</p>
                </div>

                <div className="grid md:grid-cols-3 w-full gap-3 mt-10">
                    {mockGroups.length < 1 ? (
                        <span className="text-gray-500">No groups found . . . </span>
                    ) : mockGroups.map((g) => (
                        <div className="w-auto h-34 rounded-md shadow-md p-2 bg-accent/50">
                            <div className="w-full flex justify-between">
                                <div className="grid">
                                    <Link href={`/group/${slugifyUsername(g.name)}`} className="font-semibold text-xl hover:underline cursor-pointer transition-all">{g.name} </Link>
                                    <span className="text-xs text-primary flex gap-1 items-center"><Users size={18} strokeWidth={1} />{g.members.length}</span>
                                </div>
                                <Button variant={'secondary'} size={'sm'} className="text-primary hover:text-white cursor-pointer">Join</Button>
                            </div>
                            <p className="text-gray-500">{g.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <CreateGroupModal />
        </main>
    )
}