
import React, { useState } from "react";
import { User } from "@prisma/client";

const ChatsListHeader = ({user}:{user:User}) => {

  return (
    <div className="flex py-2 px-4 justify-between items-center h-[3.8rem] border-b-[1px] border-slate-600  w-full ">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-slate-300">Messages</h2>
        <small className="text-slate-400 text-xs">
          your existing conversation and groups
        </small>
      </div>
    </div>
  );
};

export default ChatsListHeader;
