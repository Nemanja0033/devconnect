import { Button } from '@/components/ui/button'
import { slugifyUsername } from '@/helpers/helpers'
import { Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const GroupCard = ({ group }: any) => {
  return (
    <div className="w-auto h-34 rounded-md shadow-md p-2 bg-accent/50">
        <div className="w-full flex justify-between">
            <div className="grid">
                <Link href={`/group/${slugifyUsername(group.name)}`} className="font-semibold text-xl hover:underline cursor-pointer transition-all">{group.name} </Link>
                <span className="text-xs text-primary flex gap-1 items-center"><Users size={18} strokeWidth={1} />{group.members.length}</span>
            </div>
            <Button variant={'secondary'} size={'sm'} className="text-primary hover:text-white cursor-pointer">Join</Button>
        </div>
        <p className="text-gray-500">{group.description}</p>
    </div>
  )
}

export default GroupCard