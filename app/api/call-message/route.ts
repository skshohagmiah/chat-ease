import { pusherServer } from "@/libs/pusher";

export async function POST(req: Request) {
  const { conversationId } = await req.json();
  const pusher = pusherServer();
  pusher.trigger(conversationId, "callMessage", "this user is calling you");
  return Response.json({ message: "succesfull" }, { status: 200 });
}
