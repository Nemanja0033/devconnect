import { EditIcon } from "lucide-react";
import { useState } from "react";

const ProfileAbout = ({ user, isMyProfile, openAboutEdit }: {isMyProfile:boolean,  user: any, openAboutEdit?: () => void}) => {
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  return (
    <section className="lg:w-[1000px] w-full h-auto mt-3 border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <div className="w-full flex justify-between items-center">
                <span className="text-lg font-bold text-primary">About</span>
              {isMyProfile && <button className="text-primary cursor-pointer"  onClick={openAboutEdit}><EditIcon /></button>}
            </div>
            <p className={`${!isReadMoreOpen ? 'line-clamp-3' : ''}`}>{user?.bio}</p>
            <span className="text-gray-400 cursor-pointer hover:underline" onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}>{!isReadMoreOpen ? 'Show more...' : 'Show less'}</span>
    </section>
  )
}

export default ProfileAbout