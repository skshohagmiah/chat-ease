import { prisma } from "@/libs/db";
import bcrypt from "bcrypt";
import { tree } from "next/dist/build/templates/app-page";


export async function POST(req:Request) {
    try {
        const {username, email, password} = await req.json();

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{
                name:username,
                email,
                password:hashedPassword
            }
        })

        return Response.json(user, {status:200})
    } catch (error) {
        console.log('registation error', error)
        return Response.json({message:'something went wrong'}, {status:500})
    }
}