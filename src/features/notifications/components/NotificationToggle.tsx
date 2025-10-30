"use client"
import React, { useMemo } from 'react'
import { Bell, TrashIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { useFetchNofiticationsQuery } from '../hooks/useFetchNotificationsQuery'
import Loader from '@/components/screens/Loader'
import { formatDate } from '@/helpers/helpers'
import { Notification } from '../types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { deleteNotifications, viewNotifications } from '../services/notification-service'

// **This component needs to be refactored latter to clean and scalabale code. 
// **use custom hook and feature based separation.
const NotificationToggle = ({ reciverId }: { reciverId: string}) => {
  const { data, isLoading, refetch } = useFetchNofiticationsQuery(reciverId);
  const hasUnread = useMemo(() => {
    return data?.data.notifications.some((n: Notification) => !n.viewed);
  }, [data]);
  
  const handleReadNotifications = async (reciverId: string) => {
    try{
      await viewNotifications(reciverId);
      refetch();
    }
    catch(err){
      console.error("Error while viewing notification", err);
    }
  }

  const handleClearNotifications = async (reciverId: string) => {
    try{
      await deleteNotifications(reciverId);
      refetch();
    }
    catch(err){
      console.error("Error while deleting notifications");
    }
  }

  return (
    <DropdownMenu onOpenChange={() => handleReadNotifications(reciverId)}>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer hover:text-primary transition-all relative">
          <Bell strokeWidth={1.2} />
          {hasUnread ? <div className='bg-red-500 w-2 h-2 absolute top-0 left-0 rounded-full'></div> : null}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-3 grid gap-2 max-h-60 overflow-auto'>
        {!isLoading && data?.data.notifications.length < 1 && (
          <span className='text-gray-600 text-sm p-3'>No new notifications. . .</span>
        )}
        {isLoading ? (
          <div className='w-full flex justify-center'>
            <Loader />
          </div>
        ) : data?.data.notifications.map((notification: Notification) => (
          <div key={notification.id} className={`w-full grid p-3 rounded-md hover:bg-accent/70 cursor-pointer bg-accent shadow-md`}>
            <Link href={notification.url} className='text-sm hover:underline hover:text-primary'>{notification.message}</Link>
            <span className='text-xs text-gray-400 text-end'>{formatDate(notification.createdAt)}</span>
          </div>
        ))}
        {data?.data.notifications.length > 0 && (
          <Button size={'sm'} onClick={() => handleClearNotifications(reciverId)} variant={'outline'} className='flex items-center hover:opacity-90 cursor-pointer transition-all'><TrashIcon /> Clear notifications</Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NotificationToggle
