import ChatsList from '@/components/ChatsList'
import MidSidebar from '@/components/ChatsList'
import WelcomePage from '@/components/WelcomePage'
import { getChats } from '@/libs/getChats'
import { redirect } from 'next/navigation'
import React from 'react'

const ChatsPage = async() => {

  const {conversations,groups} = await getChats()

  // if(conversations[0]?.id){
  //   redirect(`/chats/${conversations[0].id}`)
  // }

  return (
    <div className='flex justify-between'>
      <ChatsList conversations={conversations} groups={groups} />
      <div className='ml-20 hidden md:block'>
      <WelcomePage />
      </div>
    </div>
  )
}

export default ChatsPage