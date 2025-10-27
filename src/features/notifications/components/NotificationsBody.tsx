import { Loader } from 'lucide-react'
import React from 'react'
import { Notification } from '../types'
import { formatDate } from '@/helpers/helper'

const NotificationsBody = ({ isLoading, data }: { isLoading: boolean, data: any}) => {
  return (
    <>
        {!isLoading && data?.data.notifications.length < 1 && (
            <span className='text-gray-600 text-sm p-3'>No new notifications. . .</span>
            )}
            {isLoading ? (
            <div className='w-full flex justify-center'>
                <Loader />
            </div>
            ) : data?.data.notifications.map((notification: Notification) => (
            <div className={`w-full grid p-3 rounded-md hover:bg-accent/70 cursor-pointer bg-accent shadow-md`}>
                <span className='text-sm'>{notification.message}</span>
                <span className='text-xs text-gray-400 text-end'>{formatDate(notification.createdAt)}</span>
            </div>
        ))}
    </>
  )
}

export default NotificationsBody