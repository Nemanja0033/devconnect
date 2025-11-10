import { GroupMember } from "@/types";
import { useSession } from "next-auth/react";

export function useIsUserInGroup(members: GroupMember[]){
    const session: any = useSession();
    const isUserInGroup = members.some(
        (member: any) => member.userId === session?.data?.user?.id
    );

    return {
        isUserInGroup
    }
}