"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface AvatarProps {
  url: string;
  user?: User;
  session?: any;
}

const Avatar = ({ url, user, session }: AvatarProps) => {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (user?.name === session?.name) {
      setIsActive(true);
    }
  }, [url, user, session]);

  return (
    <div className="relative hover:opacity-45 cursor-pointer">
      <Image
        className="rounded-full ring-4"
        src={url || "/avatar.jpg"}
        alt="user photo"
        width={40}
        height={40}
      />
      {isActive && (
        <div className="absolute -top-0 -right-0 w-3 h-3 rounded-full bg-green-500" />
      )}
    </div>
  );
};

export default Avatar;
