import { coverPlaceholder } from '@/constants/constants'
import { EditIcon } from 'lucide-react'
import React from 'react'

const ProfileHeading = ({ user, openAvatarEdit, openHeadingEdit }: { user: any, openAvatarEdit?: () => void, openHeadingEdit?: () => void}) => {
  return (
    <section className="lg:w-[1000px] w-full h-105 shadow-md border-2 dark:bg-accent mt-2 rounded-md">
            <img src={coverPlaceholder} className="md:h-52 w-full rounded-md md:w-[999px] absolute" alt="" />
            <div className="relative top-32">
                <img onClick={openAvatarEdit} src={user?.user.avatar} className="rounded-full border-4 border-accent w-52 h-52 cursor-pointer" alt="" />
                <div className="px-5 grid">
                    <div className="flex justify-between w-full items-center">
                    <span className="text-2xl font-semibold">{user?.user.username}</span>
                    <button className='text-primary cursor-pointer' onClick={openHeadingEdit}><EditIcon /></button>
                    </div>
                    <span>{user?.user.title}</span>
                </div>
            </div>
    </section>
  )
}

export default ProfileHeading