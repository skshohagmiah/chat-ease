import { prisma } from "@/libs/db";
import { pusherServer } from "@/libs/pusher";

export async function POST(req:Request){
    const pusher = pusherServer();
    try {
        const data = await req.json()
        const {conversationId} = data;
        const message = await prisma.message.create({
            data:{
                ...data
            }
        })
        pusher.trigger(conversationId,'message', {
            text:message.text,
            id:message.id,
            imageUrl:message.imageUrl,
            userId:message.userId
        })
        return Response.json(message, {status:200})
    } catch (error) {
        console.log('message api', error);
        return Response.json({message:'somthing went wrong'}, {status:500})
    }

}