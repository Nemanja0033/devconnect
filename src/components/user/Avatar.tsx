import { AvatarProps } from "@/types";

export default function Avatar({ avatarUrl, size }: AvatarProps){
    return(
        <>
            <img className={`rounded-full ${size === 'lg' ? 'h-52 w-52' : 'h-20 w-20'} border-8 border-grey-400`} src={avatarUrl !== '' ? avatarUrl : '/avatar-placeholder.png'} alt="" />
        </>
    )
}