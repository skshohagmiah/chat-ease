import { User } from "@prisma/client";
import React from "react";
import Avatar from "./Avatar";
import { getAuthSession } from "@/libs/getAuthSession";
import { FindOrCreateConversation } from "@/libs/FindOrCreateConversation";
import Link from "next/link";
import { prisma } from "@/libs/db";

const SingleUser = async ({ user }: { user: User }) => {
  const session = await getAuthSession();
  const conversation = await FindOrCreateConversation(user);


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
      }
    }
  })

  return (
    <Link
      href={`/chats/${conversation?.id}`}
      className="flex items-center justify-start md:justify-start p-1 gap-4 mt-2 rounded shadow-lg hover:opacity-50 transition"
    >
      <Avatar user={user} session={session} url={user.image || ""} />
      <div className="flex items-start justify-center flex-col">
        <p className="text-xl md:text-lg text-slate-300 capitalize font-bold">
          {user.name}
        </p>
          {!lastMessage?.messages[0]?.text && <p className="text-xl md:text-xs font-thin  text-slate-400">welcome, start a conversation</p>}
        <small className="text-xl md:text-xs font-thin  text-slate-400">
          {lastMessage?.messages[0]?.text}
        </small>
      </div>
    </Link>
  );
};

export default SingleUser;
