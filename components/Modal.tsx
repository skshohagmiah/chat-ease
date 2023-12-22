'use client'
import React, { useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import { RxCross1 } from "react-icons/rx";

interface ModalProps{
    oncomplete:(url:string) => void,
    onClose:() => void
}

const Modal = ({oncomplete,onClose}:ModalProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    },[])

    if(!mounted){
        return null
    }

  return (
    <div className='absolute z-50 inset-0 flex items-center justify-center h-full w-full shadow-md backdrop-blur-sm'>
        <div className='bg-slate-700 flex flex-col rounded-md p-4 gap-4'>
            <div className='flex justify-between'>
            <h2 className='text-center capitalize text-xl'>upload an image</h2>
            {/* @ts-ignore */}
            <button onClick={onClose} >
            <RxCross1/>
            </button>
            </div>
            <div>
              <ImageUpload endpoint='profileImage' oncomplete={oncomplete} />
            </div>
        </div>
    </div>
  )
}

export default Modal