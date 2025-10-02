import { EditIcon } from "lucide-react";
import { useState } from "react";

const ProfileAbout = ({ user, openAboutEdit }: { user: any, openAboutEdit: () => void}) => {
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);

  return (
    <section className="md:w-[1000px] h-auto mt-3 border-2 px-5 py-5 rounded-md shadow-md dark:bg-accent">
            <div className="w-full flex justify-between items-center">
                <span className="text-lg font-bold">About</span>
                <button className="text-primary cursor-pointer"  onClick={openAboutEdit}><EditIcon /></button>
            </div>
            <p className={`${!isReadMoreOpen ? 'line-clamp-3' : ''}`}>{user?.user.bio}</p>
            <span className="text-gray-400 cursor-pointer hover:underline" onClick={() => setIsReadMoreOpen(!isReadMoreOpen)}>{!isReadMoreOpen ? 'Show more...' : 'Show less'}</span>
    </section>
  )
}

export default ProfileAbout