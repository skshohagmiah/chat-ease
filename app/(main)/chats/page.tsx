import ChatsList from '@/components/ChatsList'
import WelcomePage from '@/components/WelcomePage'
import { getChats } from '@/libs/getChats'

import React from 'react'

const ChatsPage = async() => {

  const {conversations} = await getChats()

  return (
    <div className='flex justify-between'>
      <ChatsList conversations={conversations} />
      <div className='ml-20 hidden md:block'>
      <WelcomePage />
      </div>
    </div>
  )
}

export default ChatsPage