import { getServerSession } from "next-auth/next"
import { authOptions } from "./authOptions"
import { prisma } from "./db"

export const getCurrentUser = async() => {
  const session = await getServerSession(authOptions)

    const user = await prisma.user.findFirst({
      where:{
        email:session?.user?.email as string
      }
    })

    if(!user) {
      return null
    }
    return user;
}