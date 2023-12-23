"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Tooltip from "./Tooltip";

interface SidebarItemProps {
  href: string;
  label?: string;
  icon: any;
}

const SidebarItem = ({ href, label, icon }: SidebarItemProps) => {
  const pathname = usePathname();
  return (
    <Tooltip text={label!} fullWidth>
      <Link
        href={href}
        className={` flex w-full text-3xl hover:flex-col hover:opacity-50 transition text-slate-300 group items-center justify-center gap-1 ${
          pathname.includes(href) &&
          "text-white border-b-2 md:border-b-0 md:border-l-4 border-slate-500"
        }`}
      >
        <span className="  rounded-full p-2">{icon}</span>
      </Link>
    </Tooltip>
  );
};

export default SidebarItem;
