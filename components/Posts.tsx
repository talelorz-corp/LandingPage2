import React, { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import Post from "./Post";
import { stat } from "fs";
import InfiniteScroll from "react-infinite-scroller";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

function Posts() {
  //const [posts, setPosts] = useState([]);
  //useEffect(() => {});
  const bottom = useRef(null);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    "postList",
    ({ pageParam = { followingCursor: null, globalCursor: null } }) =>
      getPosts(pageParam),
    {
      getNextPageParam: (lastpage) => {
        console.log("lastpage: ", lastpage.nextGlobalCursor);
        return (
          {
            followingCursor: lastpage.nextFollowingCursor,
            globalCursor: lastpage.nextGlobalCursor,
          } || undefined
        );
      },
    }
  );

  const getPosts = async (req: {
    followingCursor: number | null;
    globalCursor: number | null;
  }) => {
    let result = "";
    await fetch("http://localhost:3000/api/posts/feed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }).then(async (res) => {
      const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();
      if (reader) {
        let readResult = await reader.read();
        while (readResult && !readResult.done) {
          console.log("value: ", readResult.value);
          result += readResult.value;
          readResult = await reader.read();
        }
      } else {
        console.log("no readable stream in response!");
      }
    });
    console.log("result: ", result);
    return JSON.parse(result);
    //.then((data) => {
    //  const newArr = data.posts;
    //  setPosts(newArr);
    //});
  };
  //const [posts, setPosts] = useState<Post[]>([]);
  useIntersectionObserver({
    root: null,
    target: bottom,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
    rootMargin: "0px",
    threshold: 1.0,
  });

  //return (
  //  <div>
  //    {status === "loading" && <p>불러오는 중</p>}
  //    {status === "error" && <p>에러 발생</p>}
  //    <InfiniteScroll loadMore={() => fetchNextPage()} hasMore={hasNextPage}>
  //      {status === "success" &&
  //        data.pages.map((group, index) => (
  //          <div key={index}>
  //            {group.posts.map((post: Post) => (
  //              <Post key={post.postId} post={post} />
  //            ))}
  //          </div>
  //        ))}
  //    </InfiniteScroll>
  //    <button onClick={() => fetchNextPage()}>더 불러오기</button>
  //    {isFetchingNextPage && <p>계속 불러오는 중</p>}
  //  </div>
  //);
  return (
    <div>
      {status === "loading" && <p>불러오는 중</p>}
      {status === "error" && <p>에러 발생</p>}
      {status === "success" &&
        data.pages.map((group, index) => (
          <div key={index}>
            {group.posts.map((post: Post) => (
              <Post key={post.postId} post={post} />
            ))}
          </div>
        ))}
      <button onClick={() => fetchNextPage()}>더 불러오기</button>
      <div ref={bottom} />
      {isFetchingNextPage && <p>계속 불러오는 중</p>}
    </div>
  );
}

export default Posts;
