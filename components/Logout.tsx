'use client'
import React from 'react'
import Button from './Button'
import { signOut } from 'next-auth/react'
import { CiLogin } from "react-icons/ci";
const Logout = () => {
  return (
    <Button label='' type='button' icon={<CiLogin className='w-6 h-6'/>} secondary onClick={() => signOut({callbackUrl:'/'})}/>
  )
}

export default Logout