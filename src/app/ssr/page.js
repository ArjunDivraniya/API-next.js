import React from "react";

// Server-Side Rendering (SSR) with the new App Router fetch API
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: "no-store" });
  const posts = await res.json();
  return posts.slice(0, 5); // Display only the first 5 posts
}

export default async function SSRPosts() {
  const posts = await getPosts();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Latest Posts (SSR Example)</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "10px" }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}