import React, { useRef, useState } from "react";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";
import Image from "next/image";
import ExampleImage from "../public/img/tale-example.jpg";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex item-center p-5">
        <Avatar userId={post.authorId} />
        <p className="flex-1 font-bold">{post.authorId}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* Contents */}
      <div className="object-cover w-full whitespace-pre-line">
        {post.content}
      </div>
      {/* Buttons */}
      <div className="flex space-x-4">
        <HeartIcon className="btn" />
        <PaperAirplaneIcon className="btn" />
      </div>
      {/* Likes */}
      <div className="flex space-x-4">{post.likesCount} likes</div>
      {/* Dates */}
      <div>{post.createdAt}</div>
      {/* Caption */}
    </div>
  );
}

export default Post;
