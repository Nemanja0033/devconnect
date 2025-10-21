"use client"
import React, { useEffect } from 'react'
import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { useFetchNofiticationsQuery } from '../hooks/useFetchNotificationsQuery'
import Loader from '@/components/screens/Loader'

const NotificationToggle = ({ reciverId }: { reciverId: string}) => {
  const { data, isLoading, isError } = useFetchNofiticationsQuery(reciverId);

  useEffect(() => {
    console.log(data);
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer hover:text-primary transition-all relative">
          <Bell strokeWidth={1.2} />
          {data?.data.notifications.length> 0 && <div className='bg-red-500 w-2 h-2 absolute top-0 left-0 rounded-full'></div>}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-3 grid gap-2'>
        {isLoading ? (
          <Loader />
        ) : data?.data.notifications.map((notification: any) => (
          <div className="w-full p-3 rounded-md bg-accent shadow-md flex justify-center items-center">
            <span>{notification.message}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationToggle
