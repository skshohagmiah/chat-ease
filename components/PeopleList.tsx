
import React from "react";
import SingleUser from "./SingleUser";
import { User } from "@prisma/client";


const PeopleList = async ({data}:{data:User[]}) => {
  return (
    <section className="w-screen h-full mb-20 md:mb-0 md:ml-16 md:w-72 overflow-auto bg-slate-800/50 border-r-[1px] border-slate-600 md:h-full">
      <div className="flex flex-col py-2 px-4 justify-start items-start h-[3.8rem] border-b-[1px] border-slate-600  w-full ">
        <h2 className="text-lg font-semibold text-slate-300">People</h2>
        <p className="capitalize text-slate-400 text-xs">select a person to chat with</p>
      </div>
      {data?.map((user: User) => (
        <SingleUser key={user.id} user={user} />
      ))}
    </section>
  );
};

export default PeopleList;
