"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const { data: session } = useSession();
  const [comments, setComments] = useState<{ [key: string]: string }>({}); // Objekat za komentare
  const [isLiked, setIsLiked] = useState(false);

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
          authorId: "607c5fa6-1630-4f2b-af1f-d3c29e89b593", // ID ulogovanog korisnika
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

  const handleCommentChange = (postId: string, value: string) => {
    setComments((prev) => ({ ...prev, [postId]: value }));
  };

  const handleComment = async (postId: string) => {
    if (!comments[postId]) return alert("Unesite komentar!");

    try {
      await fetch("api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          content: comments[postId],
        }),
      });

      setComments((prev) => ({ ...prev, [postId]: "" })); // Resetuj input za taj post
      alert("Komentar dodat!");
    } catch (error) {
      console.error("Greška pri dodavanju komentara:", error);
    }
  };

  const handleLike = async (postId: string) => {
    setIsLiked(true);
    await fetch('/api/likes', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        postId: postId,
      })
    })
  }

  const handleUnlike = async (postId: string) => {
    setIsLiked(false);
    await fetch('api/likes', {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        postId: postId
      })
    })
  }

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
              <Link href={`/post/${post.id}`}>Otvori</Link>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Obriši
              </button>

              {/* Input za komentar */}
              <input
                type="text"
                placeholder="Dodaj komentar"
                value={comments[post.id] || ""}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                className="border p-2 w-full mt-2"
              />
              <button
                onClick={() => handleComment(post.id)}
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
              >
                Dodaj Komentar
              </button>
              <button onClick={!isLiked ? () => handleLike(post.id) : () => handleUnlike(post.id)}>{isLiked ? "Like" : "Unlike"}</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
