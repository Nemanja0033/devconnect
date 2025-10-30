import { useSession } from "next-auth/react";

export  function useIsUserAuth(){
    const session = useSession();
    const isAuth = session.status === "authenticated";

    return {
        isAuth
    }
} 