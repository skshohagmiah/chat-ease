"use client";
import React, { useState } from "react";
import Tooltip from "./Tooltip";
import { IoMdAdd } from "react-icons/io";
import GroupModal from "./CreateGroupModal";
import { User } from "@prisma/client";

const ChatsListHeader = ({user}:{user:User}) => {
  const [isOpen, setIsOpen] = useState(false);

  if(isOpen){
    return <GroupModal user={user} onClose={() => setIsOpen(false)}/>
  }

  return (
    <div className="flex py-2 px-4 justify-between items-center h-[3.8rem] border-b-[1px] border-slate-600  w-full ">
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold text-slate-300">Messages</h2>
        <small className="text-slate-400 text-xs">
          your existing conversation and groups
        </small>
      </div>
      <div onClick={() => setIsOpen(true)}>
        <Tooltip text="create a group">
          <IoMdAdd className="p-2 bg-slate-600 rounded-md w-8 h-8" />
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatsListHeader;
