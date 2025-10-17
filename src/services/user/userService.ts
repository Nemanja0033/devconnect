import axios from "axios";

export async function fetchCurrentUser() {
    const res = await fetch("/api/me", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export async function fetchCurrentUserPosts(){
    const res = await fetch("/api/me/posts", {credentials: "include"});
    if (!res.ok) throw new Error("Failed to fetch user posts");
    const allData = await res.json();
    const postAndProjects = { 
        posts: allData.currentUserPosts.posts,
        projects: allData.currentUserPosts.Project
    }
    // const mergedData = [...allData.currentUserPosts.Project, ...allData.currentUserPosts.posts]
    return postAndProjects;
}

export async function fetchUser(username: string) {
  try {
    const response = await axios.get(`/api/users/${username}`);

    if (!response.data) {
        console.log(response.data)
      throw new Error("User not found");
    }

    return response.data;
  } catch (error) {
    throw error; 
  }
}


export async function fetchUserPosts(username: string){
    const response = await axios.get(`/api/posts/all-user-posts/${username}`);
}

export async function updateUser(updateData: Partial<{
    username: string,
    bio: string,
    avatar: string,
    title: string
}>){
    const res = await fetch("/api/me", {
        credentials: "include",
        headers: {"Content-Type": "application/json" },
        method: "PATCH",
        body: JSON.stringify(updateData)
    });

    if(!res.ok) throw new Error("Failed to update user");

    return res.json();
}
  