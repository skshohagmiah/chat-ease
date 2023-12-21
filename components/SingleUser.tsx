import { User } from "@prisma/client";
import React from "react";
import Avatar from "./Avatar";
import { getAuthSession } from "@/libs/getAuthSession";
import { FindOrCreateConversation } from "@/libs/FindOrCreateConversation";
import Link from "next/link";

const SingleUser = async ({ user }: { user: User }) => {
  const session = await getAuthSession();
  const conversation = await FindOrCreateConversation(user);

  return (
    <Link
      href={`/chats/${conversation?.id}`}
      className="flex items-start justify-start md:justify-start p-1 gap-4 mt-2 rounded hover:opacity-50 transition"
    >
      <Avatar user={user} session={session} url={user.image || ""} />
      <div className="flex items-start justify-center flex-col">
        <p className="text-2xl md:text-lg text-slate-300 capitalize font-bold">
          {user.name}
        </p>
        <small className="text-xl md:text-xs font-thin  text-slate-400">
          this is yout last message
        </small>
      </div>
    </Link>
  );
};

export default SingleUser;
