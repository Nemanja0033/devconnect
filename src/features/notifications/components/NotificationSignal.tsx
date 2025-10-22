import { Bell } from 'lucide-react'
import React from 'react'

const NotificationSignal = ({hasUnread}: {hasUnread: boolean}) => {
  return (
    <>
        <button className="cursor-pointer hover:text-primary transition-all relative">
          <Bell strokeWidth={1.2} />
          {hasUnread ? <div className='bg-red-500 w-2 h-2 absolute top-0 left-0 rounded-full'></div> : null}
        </button>
    </>
  )
}

export default NotificationSignal