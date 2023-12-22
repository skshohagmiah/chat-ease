import { prisma } from "@/libs/db";
import { pusherServer } from "@/libs/pusher";

export async function POST(req:Request){
    try {
        const data = await req.json()
        const {conversationId} = data;
        const message = await prisma.message.create({
            data:{
                ...data
            }
        })
        const pusher = pusherServer();
        pusher.trigger(conversationId,'message', message)
        return Response.json({message:'successfull'}, {status:200})
    } catch (error) {
        console.log('message api', error);
        return Response.json({message:'somthing went wrong'}, {status:500})
    }

}