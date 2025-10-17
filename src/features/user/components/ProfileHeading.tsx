import { coverPlaceholder } from '@/constants/constants'
import { EditIcon } from 'lucide-react'
import React from 'react'

const ProfileHeading = ({ user, isMyProfile, openAvatarEdit, openHeadingEdit }: { user: any, isMyProfile: boolean, openAvatarEdit?: () => void, openHeadingEdit?: () => void}) => {
  return (
    <section className="lg:w-[1000px] w-full h-32  shadow-md border-2 dark:bg-accent mt-2 rounded-md">
            <div className="relative bottom-40">
                <img onClick={openAvatarEdit} src={user?.avatar} className="rounded-full border-4 border-accent shadow-indigo-950 shadow-lg w-52 h-52 cursor-pointer" alt="" />
                <div className="px-5 grid mt-2">
                    <div className="flex justify-between w-full items-center">
                    <span className="text-2xl font-semibold">{user?.username}</span>
                    {isMyProfile && <button className='text-primary cursor-pointer' onClick={openHeadingEdit}><EditIcon /></button>}
                    </div>
                    <span className='text-sm'>{user?.title}</span>
                </div>
            </div>
    </section>
  )
}

export default ProfileHeading