export async function fetchCurrentUser() {
    const res = await fetch("/api/me", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export async function fetchCurrentUserPosts(){
    const res = await fetch("/api/me/posts", {credentials: "include"});
    if (!res.ok) throw new Error("Failed to fetch user posts");
    return res.json();
}
  