import ConversationHeader from "@/components/ConversationHeader";
import MessageArea from "@/components/MessageArea";
import MessageInput from "@/components/MessageInput";
import { prisma } from "@/libs/db";
import { getCurrentUser } from "@/libs/getCurrentUser";
import React from "react";
import { getChats } from "@/libs/getChats";
import ChatsList from "@/components/ChatsList";

interface ConversationIdPageProps {
  params: { conversationId: string };
}

const ConversationIdPage = async ({ params }: ConversationIdPageProps) => {
  const { conversations } = await getChats();
  const user = await getCurrentUser();

  const conversation = await prisma.conversation.findFirst({
    where: {
      id: params.conversationId,
    },
    include: {
      messages: true,
      userOne: true,
      userTwo: true,
    },
  });

  const otherUser =
    conversation?.userOne.id === user?.id
      ? conversation?.userTwo
      : conversation?.userOne;
  const messages = conversation?.messages;

  return (
    <div className="h-full w-full flex">
      <div className="hidden md:block">
        <ChatsList conversations={conversations} />
      </div>
      <div className="w-full flex flex-col mb-[4.5rem] md:mb-0 relative">
        <ConversationHeader
          conversationId={conversation?.id!}
          user={otherUser!}
        />
        <MessageArea
          conversationId={conversation?.id!}
          user={user!}
          messages={messages!}
          otherUser={otherUser!}
        />
        <MessageInput user={user!} />
      </div>
    </div>
  );
};

export default ConversationIdPage;
