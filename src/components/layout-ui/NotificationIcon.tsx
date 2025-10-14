import React from 'react'
import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'

const NotificationToggle = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer hover:text-primary transition-all">
          <Bell strokeWidth={1.2} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-3'>
        <span className='text-gray-400 text-sm'>No new notifications</span>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationToggle
