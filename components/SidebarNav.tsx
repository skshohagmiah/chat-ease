import React from 'react'
import SidebarItem from './SidebarItem'
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiGroup } from "react-icons/bi";
import Avatar from './Avatar';
import { getCurrentUser } from '@/libs/getCurrentUser';
import { getAuthSession } from '@/libs/getAuthSession';
import Logout from './Logout';

const SidebarNav = async() => {
const user = await getCurrentUser()
const session = await getAuthSession()

  return (
    <nav className="bg-slate-800 border-r-[1px] border-slate-600 rounded-md md:rounded-none flex w-full h-16 justify-around items-center bottom-0  md:flex-col fixed md:top-0 md:justify-start md:h-full md:pt-4 md:space-y-6 md:pb-2 md:w-16 " >
        <SidebarItem icon={<IoChatbubblesOutline />} label='Chats' href='/chats'  />
        <SidebarItem icon={<BiGroup />} label='people' href='/people'  />
        <div className='md:flex md:items-end md:grow w-full md:w-auto flex justify-center items-center'>
        <Avatar user={user || undefined} session={session} url={user?.image || ''}/>
        </div>
    </nav>
  )
}

export default SidebarNav