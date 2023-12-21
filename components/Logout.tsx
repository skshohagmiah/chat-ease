'use client'
import React from 'react'
import Button from './Button'
import { signOut } from 'next-auth/react'

const Logout = () => {
  return (
    <Button label='logout' type='button' secondary onClick={() => signOut({callbackUrl:'/'})}/>
  )
}

export default Logout