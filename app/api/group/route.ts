import { prisma } from "@/libs/db"

export async function POST(req:Request) {
    try {
        const {text, imageUrl, userId} = await req.json()
        const group = await prisma.group.create({
            data:{
                name:text,
                imageUrl:text,
                userId
            }
        })
        return Response.json(group,{status:200})
    } catch (error) {
        console.log('group api', error)
        return Response.json({message:'somthing wrong happened', error},{status:500})
    }
    
}