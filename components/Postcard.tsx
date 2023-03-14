import { useRef, useEffect } from "react";
export function Postcard(props: {
  post: Post & { likes: number; hashtags?: string[]; category?: string };
}) {
  return (
    <>
      <div
        key={props.post.postId}
        style={{
          width: "500px",
          height: "auto",
          backgroundColor: "#EEEEEE",
          padding: "20px 20px 20px 20px",
        }}
      >
        <p style={{ fontFamily: "sans-serif", fontSize: "20px" }}>
          {props.post.authorId + " _" + props.post.postId}
        </p>
        <center>
          <p
            style={{
              width: "480px",
              height: "460px",
              backgroundColor: "#FFFFFF",
              textAlign: "left",
              padding: "10px 10px 10px 10px",
            }}
          >
            {props.post.content}
          </p>
        </center>
        <p style={{ fontFamily: "sans-serif", fontSize: "20px" }}>
          Likes: {props.post.likes}
        </p>
      </div>
    </>
  );
}
