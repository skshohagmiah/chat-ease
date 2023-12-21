import { redirect } from "next/navigation";
import Logout from "@/components/Logout";
import { getAuthSession } from "@/libs/getAuthSession";
import SidebarNav from "@/components/SidebarNav";
import MidSidebar from "@/components/MidSidebar";
import MessageArea from "@/components/MessageArea";

export default async function Home() {
  const session = await getAuthSession();
  if (!session) {
     return redirect("/login");
  }
  if(session){
    return redirect('/chats')
  }
  return (
    <>
      {/* <MessageArea /> */}
    </>
  );
}
