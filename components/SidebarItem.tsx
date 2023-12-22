"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  label?: string;
  icon: any;
}

const SidebarItem = ({ href, label, icon }: SidebarItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={` flex text-3xl hover:flex-col hover:opacity-50 transition shadow-xl text-slate-300 group items-center justify-center gap-1 ${
        pathname.includes(href) && "text-white"
      }`}
    >
      <span className="  rounded-full p-2">{icon}</span>
      <p className="hidden group-hover:flex text-xs group-hover:transition-all">
        {label}
      </p>
    </Link>
  );
};

export default SidebarItem;
