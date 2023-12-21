import { authOptions } from "@/libs/authOptions"
import NextAuth from "next-auth"

//@ts-ignore
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }