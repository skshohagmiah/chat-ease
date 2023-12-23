"use client";
import React, { useEffect, useRef, useState } from "react";
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
  const [incomimgMessages, setImcommingMessages] = useState<ResponseProps[]>(
    []
  );
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pusher = pusherClient();
    const channel = pusher.subscribe(conversationId);

    channel.bind("message", (message: ResponseProps) => {
      setImcommingMessages((prev) => [...prev, message]);
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    });

    return () => {
      pusher.unsubscribe(conversationId);
    };
  }, [conversationId]);

  return (
    <section
      ref={messageContainerRef}
      className="overflow-y-scroll mb-12 h-full w-full bg-slate-800/20 space-y-2 relative py-2 px-4"
    >
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

      {incomimgMessages?.map((message) => (
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
    </section>
  );
};

export default MessageArea;
