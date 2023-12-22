'use client'
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { User } from '@prisma/client';
import Button from './Button';
import Modal from './Modal';



const MessageInput = ({user}:{user:User}) => {
  const {conversationId} = useParams()
  const [isOpen, setIsOpen] = useState(false)

  const formSchema = z.object({
    text: z.string().min(3,'text should be more than 3'),
    imageUrl:z.string().optional()
  })

  const {handleSubmit,register,reset,setValue,formState:{errors,isSubmitting}} = useForm({
    resolver:zodResolver(formSchema),
    defaultValues:{
      text:'',
      imageUrl:''
    }
  })

  const onsubmit = async(values: z.infer<typeof formSchema>) => {
      try {
        await axios.post('/api/message',{...values, conversationId, userId:user?.id})
        reset()
      } catch (error) {
        console.log(error)
      }
  }

  const onComplete = (url:string) => {
    console.log('image upload',url)
    setValue('imageUrl',url)
  }

const handleImageClick = () => {
  setIsOpen(true)
}

const onModalClose= () => {
  setIsOpen(false)
}

  if(isOpen){
    return <Modal onClose={onModalClose} oncomplete={onComplete}/>
  }

  return (
    <form  onSubmit={handleSubmit(onsubmit)} className='absolute bottom-0 left-2 right-2 p-2 flex items-center justify-center gap-2 bg-slate-900 overflow-hidden w-[98%]'>
         <button onClick={handleImageClick} type='button'  className='hover:opacity-50 transition'><CiCirclePlus className='w-8 h-8' /></button>
        <input disabled={isSubmitting} type="text" {...register('text', {required:true})} className='p-3 bg-slate-600 rounded-md text-lg md:text-sm w-full focus:outline-none text-slate-200' />
        <button className='hover:opacity-50 transition'><IoSend className='w-8 h-8' /></button>
    </form>
  )
}

export default MessageInput