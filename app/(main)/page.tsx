import { redirect } from "next/navigation";
import Logout from "@/components/Logout";
import { getAuthSession } from "@/libs/getAuthSession";

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
