"use client";

import { useState, useEffect } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  // GET - Fetch users
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // POST - Create user
  const createUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password: "123456" }),
    });

    if (res.ok) {
      fetchUsers();
    }
  };

  // PUT - Update user
  const updateUser = async () => {
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, name, email }),
    });

    if (res.ok) {
      fetchUsers();
    }
  };

  // DELETE - Delete user
  const deleteUser = async (id: string) => {
    await fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      <input
        className="border p-2 mr-2"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={createUser} className="bg-blue-500 text-white px-4 py-2">Create User</button>

      <h2 className="mt-5 font-semibold">Users List:</h2>
      <ul className="mt-2">
        {users.map((user: any) => (
          <li key={user.id} className="border p-2 mb-2 flex justify-between">
            <span>{user.name} ({user.email})</span>
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
