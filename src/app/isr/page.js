import React from "react";

// Incremental Static Regeneration (ISR) with the new App Router fetch API
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", { next: { revalidate: 30 } });
  const posts = await res.json();
  return posts;
}

export default async function Blogs() {
  const posts = await getPosts();
  const time = new Date().toLocaleTimeString();

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Blog List (ISR Example)</h1>
      <p>Page generated at: {time}</p>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
      <p>
        (This page will revalidate every <strong>30 seconds</strong>)
      </p>
    </div>
  );
}