"use client";
import React, { useEffect, useState } from "react";
import { Message, User } from "@prisma/client";
import Avatar from "./Avatar";
import { pusherClient } from "@/libs/pusher";

interface MessageAreaProps {
  messages: Message[];
  otherUser: User;
  user: User;
  conversationId: string;
}

interface ResponseProps{
  id:string
  text:string,
  imageUrl?:string,
  userId:string,
}

const MessageArea = ({
  messages,
  otherUser,
  user,
  conversationId,
}: MessageAreaProps) => {
  const [allMessages, setAllMessages] = useState<ResponseProps[]>([]);

  useEffect(() => {
    const pusher = pusherClient();
    const channel = pusher.subscribe(conversationId);

    channel.bind("message", (message:ResponseProps) => {
      setAllMessages((prev) => [...prev, message]);
    });

    return () => {
      pusher.unsubscribe(conversationId);
    };
  }, [conversationId]);

  return (
    <section className="overflow-y-scroll mb-12 h-full w-full bg-slate-800 space-y-2 relative p-2">
      {messages?.map((message) => (
        <div key={message.id} className="flex flex-col gap-4">
          {message.userId === user?.id ? (
            <div className="align-start flex gap-4 items-center">
              <Avatar url={user.image!} />
              {message.text}
            </div>
          ) : (
            <div className="justify-start flex flex-row-reverse gap-4 items-center">
              <Avatar url={otherUser.image!} />
              {message.text}
            </div>
          )}
        </div>
      ))}
      {allMessages?.map((message) => (
        <div key={message.id} className="flex flex-col gap-4">
          {message.userId === user?.id ? (
            <div className="align-start flex gap-4 items-center">
              <Avatar url={user.image!} />
              {message.text}
            </div>
          ) : (
            <div className="justify-start flex flex-row-reverse gap-4 items-center">
              <Avatar url={otherUser.image!} />
              {message.text}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default MessageArea;
