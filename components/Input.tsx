'use client'
import React from 'react'

interface InputProps {
    type: string,
    label?:string,
    rest?:any
    placeholder:string
    disabled?: boolean
}


const Input = ({type,placeholder,label,rest,disabled}:InputProps) => {
  return (
    <>
     <input className={`p-2 w-full border rounded focus:outline-none focus-visible:outline-none text-slate-900 focus:ring-2 border-slate-400 ${disabled && 'opacity-50'}`}
      placeholder={placeholder} 
      disabled={disabled}
      id={label}
      type={type}
      {...rest}
      />
    </>
   
  )
}

export default Input