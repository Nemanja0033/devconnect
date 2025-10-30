import axios from "axios";
import { useState, useRef, useEffect } from "react";

export function useSearch(){
    const [searchTerm, setSearchTerm] = useState("");
    const [posts, setPosts] = useState<any []>([]);
    const [isLoading, setIsLoading] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function handleGetSearchedPosts(){
        if(!searchTerm) return;

        try{
            if(debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout(async () => {
                setIsLoading(true);
                const response = await axios.post('/api/search',{ searchTerm })
                setPosts(response.data.posts);
                setIsLoading(false);
            }, 300);
        }
        catch(err){
            console.error("Error while fething posts", err);
        }
    };

    handleGetSearchedPosts();
  }, [searchTerm]);

  const handleEscKey = (event: any) => {
        if(event.key === 'Escape'){
            setSearchTerm('');
        };
    }

  useEffect(() => {
    window.addEventListener('keydown', handleEscKey);

    return () => {
        window.removeEventListener('keydown', handleEscKey);
    }
  }, [handleEscKey]);

  return{
    setSearchTerm,
    searchTerm,
    posts,
    isLoading
  }
}