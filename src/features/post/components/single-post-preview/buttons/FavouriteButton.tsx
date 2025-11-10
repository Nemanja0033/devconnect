import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import React from 'react'

const FavouriteButton = ({handleAddToSaved, isSaved, saves }: { handleAddToSaved: () => void, isSaved: boolean | null, saves : number | null}) => {
  return (
    <Button onClick={handleAddToSaved} className={`hover:text-primary cursor-pointer transition-all ${isSaved ? 'text-primary' : ''}`} variant={'secondary'}><Heart size={20} strokeWidth={0.75} />{saves}</Button>
  )
}

export default FavouriteButton