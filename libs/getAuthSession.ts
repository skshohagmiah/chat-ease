import { getServerSession } from "next-auth/next"
import { authOptions } from "./authOptions"
import { prisma } from "./db"

export const getAuthSession = async() => {
  const session = await getServerSession(authOptions)

  return session;
}