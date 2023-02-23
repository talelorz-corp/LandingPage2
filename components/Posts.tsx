import React, { useState, useEffect } from "react";
import Post from "./Post";

const posts: Post[] = [
  {
    postId: 1,
    created_at: "Date",
    content: "aaaaaaaaaaaaaa",
    likes: 2,
    userId: "June",
  },
  {
    postId: 2,
    created_at: "Date",
    content: "aaaaaaaaaaaaaa",
    likes: 2,
    userId: "Hanjun",
  },
  {
    postId: 3,
    created_at: "Date",
    content: "aaaaaaaaaaaaaa",
    likes: 2,
    userId: "Taegu",
  },
];

function Posts() {
  //const [posts, setPosts] = useState([]);
  //useEffect(() => {});

  return (
    <div>
      {posts?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
}

/*function getPosts(req: {
    pageCursor: number,
    limit: number,
  })
  {
    fetch('http://localhost:3000/api/posts/list', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
    .then(res => res.json())
    .then(data => {
      const newArr = data.posts
      setPosts(newArr)
    });
  }
  const [posts, setPosts] = useState<Post[]>([])   */

export default Posts;
