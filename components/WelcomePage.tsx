import React from 'react'

const WelcomePage = () => {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center capitalize'>
        <h1 className='text-4xl mb-2 text-rose-500'>Welcome to Chat Ease</h1>
        <p className='text-sm text-slate-400'>Select a user or a conversation to start a conversation</p>
        <small className='text-sm text-slate-400'>or you can create a group, happy chatting.</small>
    </div>
  )
}

export default WelcomePage