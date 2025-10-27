import { Button } from '@/components/ui/button'
import { ThumbsUp } from 'lucide-react'
import React from 'react'

const LikeButton = ({ handleLikePost, isLiked, likes }: any) => {
  return (
    <Button onClick={handleLikePost} className={`hover:text-primary cursor-pointer transition-all ${isLiked ? 'text-primary' : ''}`} variant={'secondary'}><ThumbsUp size={20} strokeWidth={0.75} />{likes}</Button>
)
}

export default LikeButton