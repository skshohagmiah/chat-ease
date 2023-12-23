import { prisma } from "./db";
import { getCurrentUser } from "./getCurrentUser";

export const getChats = async () => {
  const currentUser = await getCurrentUser();
  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        {
          userOneId: currentUser?.id,
        },
        {
          userTwoId: currentUser?.id,
        },
      ],
    },
    orderBy:{
      createdAt:'desc'
    }
  });


  return {
    conversations
  };
};
