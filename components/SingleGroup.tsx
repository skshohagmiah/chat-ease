import { Conversation, Group, User } from "@prisma/client";
import React from "react";
import Avatar from "./Avatar";
import { getAuthSession } from "@/libs/getAuthSession";
import { FindOrCreateConversation } from "@/libs/FindOrCreateConversation";
import Link from "next/link";
import { prisma } from "@/libs/db"

const SingleGroup = async ({ group }: { group: Group }) => {
  const session = await getAuthSession();


  const groupMember = await prisma.group.findFirst({
    where:{
      id:group?.id
    },
    include:{
        members:{
            include:{
                user:true
            }
        }

    }
  })

  return (
    <Link
      href={`/chats/${group?.id}`}
      className="flex items-center justify-start md:justify-start py-2 px-4 gap-4 mt-2 rounded shadow hover:opacity-50 transition"
    >
      <Avatar user={groupMember?.members[0].user} session={session} url={groupMember?.members[0].user.image || ""} />
      <div className="flex items-start justify-center flex-col">
        <p className="text-lg  text-slate-300 capitalize font-semibold">
          {groupMember?.members.length} members
        </p>
          {/* {!lastMessage?.messages[0]?.text && <p className="text-xl md:text-xs font-thin  text-slate-400">welcome, start a conversation</p>}
        <small className="text-xl md:text-xs font-thin  text-slate-400">
          {lastMessage?.messages[0]?.text}
        </small> */}
      </div>
    </Link>
  );
};

export default SingleGroup;
