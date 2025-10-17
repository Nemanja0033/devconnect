'use client'
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useUser(){
    const [isUserProfile, setIsUserProfile] = useState(false);
    const params  = useParams();
    const { username } = params;

    const rawUsername = String(username);
    const clearUsername = rawUsername.replace('-', ' ');

    useEffect(() => {
        async function checkIfMyProfile(){
            const currentUser = await getSession();
            

            if(clearUsername === currentUser?.user?.name){
                setIsUserProfile(true);
            }
        }

        checkIfMyProfile();
    }, []);

    return {
        isUserProfile,
        rawUsername
    }
}