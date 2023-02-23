import React, { useState } from 'react'
import Post from './Post'

const posts = [
  {
    id: 1,
    createdAt: Date,
    content: "aaaaaaaaaaaaaa",
    likes: 2,
    authorId: "Taegu",
  },
  {
    id: 2,
    createdAt: Date,
    content: "aaaaaaaaaaaaaa",
    likes: 2,
    authorId: "Taegu",
  },
  {
    id: 3,
    createdAt: Date,
    content: "aaaaaaaaaaaaaa",
    likes: 2,
    authorId: "Taegu",
  }
]

function Posts() {
  
  return (
    //<div>
    //  {posts.map((post) => (
    //    <Post 
    //    //id={post.id}
    //    authorId={post.authorId}
    //    content={post.content}
    //    createdAt={post.createdAt}
    //    likes={post.likes}
    //    />
    //  ))}
    //</div>
    {}
  )
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

export default Posts