import { Conversation, User } from "@prisma/client";
import React from "react";
import Avatar from "./Avatar";
import { getAuthSession } from "@/libs/getAuthSession";
import { FindOrCreateConversation } from "@/libs/FindOrCreateConversation";
import Link from "next/link";
import { prisma } from "@/libs/db"
import { getCurrentUser } from "@/libs/getCurrentUser";

const SingleChat = async ({ conversation }: { conversation: Conversation }) => {
  const session = await getAuthSession();
  const currentUser = await getCurrentUser();


  const lastMessage = await prisma.conversation.findFirst({
    where:{
      id:conversation?.id
    },
    include:{
      messages:{
        orderBy:{
          createdAt:"desc"
        },
        take:1
      },
      userOne:true,
      userTwo:true
    }
  })

  const otherUser = lastMessage?.userOne.id === currentUser?.id ? lastMessage?.userTwo : lastMessage?.userOne

  return (
    <Link
      href={`/chats/${conversation?.id}`}
      className="flex items-center justify-start md:justify-start py-2 px-4 gap-4 mt-2 rounded shadow hover:opacity-50 transition"
    >
      <Avatar user={otherUser} session={session} url={otherUser?.image || ""} />
      <div className="flex items-start justify-center flex-col">
        <p className="text-lg  text-slate-300 capitalize font-semibold">
          {otherUser?.name}
        </p>
          {!lastMessage?.messages[0]?.text && <p className="text-xl md:text-xs font-thin  text-slate-400">welcome, start a conversation</p>}
        <small className="text-xl md:text-xs font-thin  text-slate-400">
          {lastMessage?.messages[0]?.text}
        </small>
      </div>
    </Link>
  );
};

export default SingleChat;
