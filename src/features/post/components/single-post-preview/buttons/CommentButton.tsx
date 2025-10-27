import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import React from 'react'

const CommentButton = () => {
  return (
    <Button className={`hover:text-primary cursor-pointer transition-all`} variant={'secondary'}><MessageCircle size={20} strokeWidth={0.75} /></Button>  
  )
}

export default CommentButton