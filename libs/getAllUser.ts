import { prisma } from "./db"
import { getCurrentUser } from "./getCurrentUser";

export const getAllUsers = async() => {
    const currentUser = await getCurrentUser();
    try {
        const users = await prisma.user.findMany({
            where:{
                NOT:{
                    email:currentUser?.email
                }
            }
        });
        return users
    } catch (error) {
        console.log(error)
    }
}