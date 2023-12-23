import React from "react";
import { Conversation, User } from "@prisma/client";
import SingleChat from "./SingleChat";
import Link from "next/link";
import ChatsListHeader from "./ChatsListHeader";
import { getCurrentUser } from "@/libs/getCurrentUser";

interface ChatsListProps {
  conversations: Conversation[];
}

const ChatsList = async ({ conversations }: ChatsListProps) => {
  const currentUser = await getCurrentUser();
  return (
    <section className="w-screen h-full mb-20 md:mb-0 md:ml-16 md:w-72 overflow-auto bg-slate-800/50 border-r-[1px] border-slate-600 md:h-full">
      <ChatsListHeader user={currentUser!} />
      {conversations.length === 0 ? (
        <div className="flex items-center justify-center flex-col h-[90%] ">
          <p className="capitalize text-xl text-rose-500 mb-2">
            sorry, no chats found!
          </p>
          <small className="text-xs text-slate-300">
            looks like you are new here
          </small>
          <small className="text-xs text-slate-300">
            go to people page to chat
          </small>
          <p className="text-md text-slate-300 p-2">
            Or click{" "}
            <Link className="underline" href={"/people"}>
              here
            </Link>
          </p>
        </div>
      ) : (
        conversations?.map((conversation: Conversation) => (
          <SingleChat key={conversation.id} conversation={conversation} />
        ))
      )}
    </section>
  );
};

export default ChatsList;
