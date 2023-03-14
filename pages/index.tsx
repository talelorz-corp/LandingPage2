import Posts from "@/components/Posts";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import Navigation from "@/components/Navigation";

declare type Post = {
  id: number;
  createdAt: Date;
  content: string;
  likes: number;
  authorId: string;
};

export default function Home() {
  const [userId, setUserId] = useState<string | null>("");

  useEffect(() => {
    console.log("reload index page");
    fetch("http://localhost:3000/api/auth/checkLogin", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("fetched: ", data);
        if (!data.isLoggedIn) {
          setUserId(null);
        } else {
          setUserId(data.userId);
        }
      });
  }, []);

  //useEffect(() => {
  //  console.log("reload index page2");
  //  if (userId) {
  //    test({ pageCursor: 0, limit: 10 });
  //  } else {
  //    testVisitor({ pageCursor: 0, limit: 10 });
  //  }
  //}, [userId]);
  //
  //function testVisitor(req: { pageCursor: number; limit: number }) {
  //  fetch("http://localhost:3000/api/posts/list/visitor", {
  //    method: "POST",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //    body: JSON.stringify(req),
  //  })
  //    .then((res) => res.json())
  //    .then((data) => {
  //      const newArr = data.posts;
  //      setPosts(newArr);
  //    });
  //}
  //
  //function test(req: { pageCursor: number; limit: number }) {
  //  fetch("http://localhost:3000/api/posts/list", {
  //    method: "POST",
  //    headers: {
  //      "Content-Type": "application/json",
  //    },
  //    body: JSON.stringify(req),
  //  })
  //    .then((res) => res.json())
  //    .then((data) => {
  //      const newArr = data.posts;
  //      setPosts(newArr);
  //    });
  //}
  //
  //const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Talelorz</title>
      </Head>
      <main>
        <div className="flex bg-gray-400">
          <Avatar userId="taegu" large />
          <div className="p-5 pb-0 text-6xl text-center">Talelorz</div>
        </div>
        <div>
          <Posts />
        </div>
        <div className="sticky bottom-0 z-50 flex-1 justify-center items-center">
          <Navigation />
        </div>
      </main>
    </div>
  );
}

export function Postcard(props: { post: Post; likes: number }) {
  return (
    <>
      <div
        key={props.post.id}
        style={{
          width: "500px",
          marginTop: "10px",
          backgroundColor: "#EEEEEE",
        }}
      >
        <p>
          <i>{props.post.authorId + " _" + props.post.id}</i>
        </p>
        <p>{props.post.content}</p>
        <p>Likes: {props.likes}</p>
      </div>
    </>
  );
}
