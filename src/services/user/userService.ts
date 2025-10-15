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
  