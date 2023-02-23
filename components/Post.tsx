import React from "react";
import {
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIconFilled } from "@heroicons/react/24/solid";
import Avatar from "./Avatar";
import Image from "next/image";
import ExampleImage from "../public/img/tale-example.jpg";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex item-center p-5">
        <Avatar userId={post.userId} />
        <p className="flex-1 font-bold">{post.userId}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* Contents */}
      <img className="object-cover w-full" src={ExampleImage.src} alt="" />

      {/* Buttons */}
      <div className="flex space-x-4">
        <HeartIcon className="btn" />
        <PaperAirplaneIcon className="btn" />
      </div>
      {/* Caption */}
    </div>
  );
}

export default Post;
