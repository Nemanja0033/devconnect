"use client";

import { db } from "@/db/db";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const { data: session} = useSession();

  // Fetch posts on page load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };


  const createPost = async () => {
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          authorId: "607c5fa6-1630-4f2b-af1f-d3c29e89b593"  // Ovde ide ID ulogovanog korisnika
        }),
      });

      if (!res.ok) throw new Error("Failed to create post");
      fetchPosts(); // Refresh posts
      setNewPost({ title: "", content: "" });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Testiranje CRUD operacija za postove</h1>

      {/* Forma za kreiranje posta */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Naslov"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Sadržaj"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          className="border p-2 rounded w-full my-2"
        />
        <button onClick={createPost} className="bg-blue-500 text-white px-4 py-2 rounded">
          Dodaj Post
        </button>
      </div>

      {/* Lista postova */}
      <div>
        {posts.length === 0 ? (
          <p>Nema postova...</p>
        ) : (
          posts.map((post: any) => (
            <div key={post.id} className="border p-4 my-2 rounded">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Obriši
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
