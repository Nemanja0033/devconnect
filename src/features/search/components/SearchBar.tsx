
import React, { useEffect, useRef, useState } from 'react'
import { Delete, Search } from 'lucide-react'
import axios from 'axios';
import Link from 'next/link';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { TooltipContent } from '@/components/ui/tooltip';
import Loader from '@/components/screens/Loader';
import { Input } from '@/components/ui/input';
import { useSearch } from '../hooks/useSearch';

const SearchBar = () => {
  const { posts, searchTerm, setSearchTerm, isLoading } = useSearch();
  
  return (
    <div className='w-96'>
        <div className="w-full relative">
            <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="dark:bg-accent rounded-2xl w-full px-10" placeholder="Search DevConnect" />
            <Search strokeWidth={2} className="absolute top-[5.5px] left-2 text-gray-400" />
            {searchTerm.length > 0 && (
                <button onClick={() => setSearchTerm('')}>            
                    <Delete strokeWidth={2} className='absolute top-[5.5px] right-2 text-gray-400' />
                </button>
            )}
        </div>
        {searchTerm.length > 0 && (
            <div className='w-96 max-h-96 h-auto overflow-auto gap-2 rounded-md shadow-md absolute bg-slate-900 p-3'>
                {isLoading && <div className='w-full flex justify-center'><Loader /></div>}
                {posts.map((p) => (
                    <div key={p.id} className='w-full p-2 border-t'>
                        <div     className='flex items-center gap-2'>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <img className='w-5 h-5 rounded-full' src={p.author.avatar} alt={p.author.username} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span>{p.author.username}</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Link className='font-semibold cursor-pointer hover:underline' href={`/post/${p.id}`}>{p.title}</Link>
                        </div>
                        <p className='line-clamp-2 text-gray-600 text-sm'>{p.content}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default SearchBar