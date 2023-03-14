import React from "react";
import Image from "next/image";

type Props = {
  userId: string;
  large?: boolean;
};

function Avatar({ userId, large }: Props) {
  return (
    <div
      className={`rounded-full relative h-12 w-12 border object-contain p-1 mr-3 overflow-hidden ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${userId}`}
        fill
        alt="avatar-image"
      />
      <div>hihi</div>
    </div>
  );
}

export default Avatar;
