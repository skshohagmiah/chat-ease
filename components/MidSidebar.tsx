import { getAllUsers } from "@/libs/getAllUser";
import React from "react";
import SingleUser from "./SingleUser";
import { User } from "@prisma/client";

const MidSidebar = async () => {
  const users = await getAllUsers();
  return (
    <section className="w-screen h-full p-2 mb-20 md:mb-0 md:ml-16 md:w-72 overflow-auto bg-slate-900 border-r-[1px] border-slate-600 md:h-full">
      {users?.map((user: User) => (
        <SingleUser key={user.id} user={user} />
      ))}
    </section>
  );
};

export default MidSidebar;
