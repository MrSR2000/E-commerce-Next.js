import Image from "next/image";
import React from "react";

import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  console.log("the src", src);

  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={30}
        width={30}
      />
    );
  } else {
    return <FaUserCircle size={24} />;
  }
};

export default Avatar;
