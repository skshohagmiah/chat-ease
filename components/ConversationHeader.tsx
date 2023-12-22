import { User } from "@prisma/client";
import React from "react";
import Avatar from "./Avatar";
import { MdOutlineSpatialAudioOff } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import Link from "next/link";
import Logout from "./Logout";
import { getCurrentUser } from "@/libs/getCurrentUser";

const ConversationHeader = async({
  user,
  conversationId,
}: {
  user: User;
  conversationId: string;
}) => {
  
  const currentUser = await getCurrentUser();
  return (
    <header className="bg-slate-900 border-b-[1px] border-slate-600 flex justify-between p-2">
      <div className="flex gap-2 items-center">
        <Avatar url={user.image || ""} />
        <p className="capitalize text-slate-300">{user.name}</p>
      </div>
      <div className="flex gap-4 items-center md:mr-8">
        <Link
          href={`/chats/${conversationId}/${currentUser?.email}/audio/room`}
          className="p-2 bg-slate-600 rounded-md"
        >
          <MdOutlineSpatialAudioOff className="w-6 h-6 text-slate-300 hover:opacity-45 transition" />
        </Link>
        <Link
          href={`/chats/${conversationId}/${currentUser?.email}/video/room`}
          className="p-2 bg-slate-600 rounded-md"
        >
          <IoVideocamOutline className="w-6 h-6 text-slate-300 hover:opacity-45 transition" />
        </Link>
        <div className="">
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default ConversationHeader;
