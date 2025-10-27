import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'

const FavouriteButton = () => {
  return (
    <Button className='hover:text-primary cursor-pointer transition-all' variant={'secondary'}><Heart size={20} strokeWidth={0.75} /></Button>
  )
}

export default FavouriteButton