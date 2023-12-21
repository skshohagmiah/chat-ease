import { User } from "@prisma/client";
import { prisma } from "./db";
import { getAuthSession } from "./getAuthSession";
import { getCurrentUser } from "./getCurrentUser";


export const FindOrCreateConversation = async(user:User) => {
    const session = await getAuthSession();
    const currentUser = await getCurrentUser();
    const conversation = await prisma.conversation.findFirst({
      where:{
        OR:[
          {
            userOneId:currentUser?.id,
            userTwoId:user?.id
          },
          {
            userTwoId:currentUser?.id,
            userOneId:user?.id
          }
        ]
      },
      include:{
        messages:true
      }
    })
    if(!conversation){
        const newConversation  = await prisma.conversation.create({
            data:{
                userOneId:currentUser?.id as string,
                userTwoId:user?.id as string
            },
            include:{
                userOne:true,
                userTwo:true
            }
        })
        if(newConversation){
            return newConversation
        }

    }else{
        return conversation
    }
  
}