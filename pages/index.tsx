import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'


export default function Home() {
  function test(req: {
    userId: UserId,
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
      console.log(data)
      const newArr = posts.concat(data)
      setPosts(newArr)
    });
  }

  const [posts, setPosts] = useState<{post: Post, likes: number, hashtags: string[]}[]>([
    {'post':{'content': 'sample', 'postId': 111, 'userId':'me', 'created_at':'today'},
      'likes': 11, 
      'hashtags': []}
  ])

  return (
    <>
      <Head>
        <title>Talelorz</title>
      </Head>
      <main className={styles.main}>
          <p>
            hyperclova&nbsp;
          </p>
          <div style={{height: "100px", width: "500px", padding:"20px", backgroundColor: "#999999"}}>
            <textarea> write a prompt</textarea>
          </div>
          <div style={{height: "60px", width: "500px", padding:"20px", backgroundColor: "#99EE99"}}>
            <button onClick={()=>test({userId: "쯔를생각해", pageCursor: 15, limit: 5})}>
              send
            </button>
          </div>
          <div style={{width:"500px", height: "700px", backgroundColor: "#EE9999"}}>
            {posts.map((post)=> {
              console.log(post)
              return <Postcard post={post.post} likes={post.likes}/>
            })}
          </div>
      </main>
    </>
  )
}


export function Postcard(props: 
  {post: Post, likes: number}) 
{
  return (
    <div style={{width: "500px", marginTop: "10px", backgroundColor: "#EEEEEE"}}>
      <p>
        {props.post.content}
      </p>
      <p>
        Likes: {props.likes}
      </p>
    </div>
  )
}
