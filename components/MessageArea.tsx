"use client";
import React, { useEffect, useState } from "react";
import { Message, User } from "@prisma/client";
import Avatar from "./Avatar";
import { pusherClient } from "@/libs/pusher";
import { formatDate } from "@/libs/formatDate";
import Image from "next/image";

interface MessageAreaProps {
  messages: Message[];
  otherUser: User;
  user: User;
  conversationId: string;
}

interface ResponseProps {
  id: string;
  text: string;
  imageUrl?: string;
  userId: string;
  createdAt: Date;
}

const MessageArea = ({
  messages,
  otherUser,
  user,
  conversationId,
}: MessageAreaProps) => {
  const [allMessages, setAllMessages] = useState<ResponseProps[]>([]);
  const [callMessage, setCallMessage] = useState('')

  useEffect(() => {
    const pusher = pusherClient();
    const channel = pusher.subscribe(conversationId);

    channel.bind("message", (message: ResponseProps) => {
      setAllMessages((prev) => [...prev, message]);
    });

    channel.bind("callMessage", (message:string) => {
      setCallMessage(message)
    });
    return () => {
      pusher.unsubscribe(conversationId);
    };
  }, [conversationId]);

  useEffect(() => {
    const pusher = pusherClient();
    const channel = pusher.subscribe(conversationId);
    
    channel.bind("callMessage", (message:string) => {
      setCallMessage(message)
    });
    return () => {
      pusher.unsubscribe(conversationId);
    };
  }, [conversationId]);

  return (
    <section className="overflow-y-scroll mb-12 h-full w-full bg-slate-900 space-y-2 relative p-2">
      {messages?.map((message) => (
        <div key={message.id} className="flex flex-col gap-4">
          {message.userId === user?.id ? (
            <div className="align-start flex gap-4 items-center">
              <Avatar url={user.image!} />
              <div>
                <div className="flex flex-col p-1 rounded-md bg-slate-800">
                  <p>{message.text}</p>
                  <small className="text-xs text-slate-400">
                    {formatDate(message.createdAt).toString()}
                  </small>
                </div>
                {message.imageUrl && (
                  <Image
                  className="mt-2 rounded"
                    src={message.imageUrl}
                    alt="text attachment"
                    width={300}
                    height={300}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="justify-start flex flex-row-reverse gap-4 items-center">
              <Avatar url={otherUser.image!} />
               <div className="flex flex-col p-1 rounded-md bg-slate-800">
                <p>{message.text}</p>
                <small className="text-xs text-slate-400">
                  {formatDate(message.createdAt).toString()}
                </small>
                {message.imageUrl && (
                  <Image
                    src={message.imageUrl}
                    alt="text attachment"
                    width={200}
                    height={300}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {allMessages?.map((message) => (
        <div key={message.id} className="flex flex-col gap-4">
          {message.userId === user?.id ? (
            <div className="align-start flex gap-4 items-center">
              <Avatar url={user.image!} />
              <div className="flex flex-col p-1 rounded-md bg-slate-800">
                <p>{message.text}</p>
                <small className="text-xs text-slate-400">
                  {formatDate(message.createdAt).toString()}
                </small>
                {message.imageUrl && (
                  <Image
                    src={message.imageUrl}
                    alt="text attachment"
                    width={200}
                    height={300}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="justify-start flex flex-row-reverse gap-4 items-center">
              <Avatar url={otherUser.image!} />
              <div className="flex flex-col p-1 rounded-md bg-slate-800">
                <p>{message.text}</p>
                <small className="text-xs text-slate-400">
                  {formatDate(message.createdAt).toString()}
                </small>
                {message.imageUrl && (
                  <Image
                    src={message.imageUrl}
                    alt="text attachment"
                    width={200}
                    height={300}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ))}
      <p>{callMessage}</p>
    </section>
  );
};

export default MessageArea;
