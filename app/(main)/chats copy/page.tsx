import MidSidebar from '@/components/MidSidebar'
import WelcomePage from '@/components/WelcomePage'
import React from 'react'

const ChatsPage = () => {
  return (
    <div className='flex justify-between'>
      <MidSidebar />
      <div className='ml-20 hidden md:block'>
      <WelcomePage />
      </div>
    </div>
  )
}

export default ChatsPage