import { useSession } from "next-auth/react";

export function useIsUserInGroup(members: any[]){
    const session: any = useSession();
    const isUserInGroup = members.some(
        (member: any) => member.userId === session.data.user.id
    );

    return {
        isUserInGroup
    }
}