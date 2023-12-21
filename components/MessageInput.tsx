'use client'
import React from 'react'
import { IoTriangleOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { User } from '@prisma/client';



const MessageInput = ({user}:{user:User}) => {
  const {conversationId} = useParams()

  const formSchema = z.object({
    text: z.string().min(3,'text should be more than 3'),
    imageUrl:z.string().optional()
  })

  const {handleSubmit,register,reset,formState:{errors,isSubmitting}} = useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
      text:'',
      imageUrl:''
    }
  })

  const onsubmit = async(values: z.infer<typeof formSchema>) => {
      try {
        const res = await axios.post('/api/message',{...values, conversationId, userId:user?.id})
        reset()
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <form  onSubmit={handleSubmit(onsubmit)} className='absolute md:bottom-0 bottom-0 right-1 left-1 flex bg-slate-200 overflow-hidden rounded-md w-[97%]'>
         <button className='flex items-center justify-center hover:opacity-50 transition bg-slate-700 p-2 md:p-4 outline-none overflow-hidden'><CiCirclePlus className='text-slate-100 w-8 h-8 md:w-4 md:h-4'/></button>
        <input disabled={isSubmitting} type="text" {...register('text', {required:true})} className='p-2 md:p-2 bg-transparent text-lg md:text-sm w-full focus:outline-none text-slate-900' />
        <button disabled={isSubmitting} className='flex items-center justify-center hover:opacity-50 transition bg-slate-900 p-2 md:p-4 border-0 outline-none'><IoTriangleOutline className='rotate-45 w-6 h-6 md:w-4 md:h-4'/></button>
    </form>
  )
}

export default MessageInput