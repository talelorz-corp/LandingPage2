import Head from 'next/head'
import Router from 'next/router'
import { useEffect, useState } from 'react'

declare type Post = {
  id: number;
  createdAt: Date;
  content: string;
  likes: number;
  authorId: string;
}


export default function Home() {
  const [userId, setUserId] = useState<string|null>("")

  useEffect(()=>{
    console.log("reload index page")
    fetch('http://localhost:3000/api/auth/checkLogin',
    {
        method : "GET"
    }
    )
    .then((res)=>res.json())
    .then((data)=>{
        console.log("fetched: ", data)
        if(!data.isLoggedIn){
          setUserId(null)
        }
        else{
          setUserId(data.userId)
        }
    })
  },[])

  useEffect(()=>{
    console.log("reload index page2")
    if(userId){
      test({pageCursor: 0, limit: 10})
    }
    else{
      testVisitor({pageCursor: 0, limit: 10})
    }
  }, [userId])

  function testVisitor(req: {
    pageCursor: number,
    limit: number,
  })
  {
    fetch('http://localhost:3000/api/posts/list/visitor', {
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

  function test(req: {
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

  const [posts, setPosts] = useState<Post[]>([])

  return (
    <>
      <Head>
        <title>Talelorz</title>
      </Head>
      <main>
          <p>
            피드&nbsp;
          </p>
          <div style={{height: "100px", width: "500px", padding:"20px", backgroundColor: "#999999"}}>
            <textarea/>
          </div>
          <div style={{height: "60px", width: "500px", padding:"20px", backgroundColor: "#99EE99"}}>
            <button onClick={()=>test({pageCursor: 2, limit: 5})}>
              send
            </button>
          </div>
          <div style={{width:"500px", height: "700px", backgroundColor: "#EE9999"}}>
            {posts.map((post)=> {
              return <Postcard post={post} likes={post.likes}/>
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
    <>
      <div key={props.post.id} style={{width: "500px", marginTop: "10px", backgroundColor: "#EEEEEE"}}>
        <p>
          <i>{props.post.authorId + " _" + props.post.id}</i>
        </p>
        <p>
          {props.post.content}
        </p>
        <p>
          Likes: {props.likes}
        </p>
      </div>
    </>

  )
}
