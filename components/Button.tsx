import React from 'react'
import Label from './Label'
import { IconContext, IconType } from 'react-icons'

interface ButtonProps {
    label:string
    primary?:boolean,
    secondary?:boolean,
    outline?: boolean
    type:'submit' | 'button'
    fullWidth?:boolean
    onClick?: () => void
    icon?:any
    disable?:boolean
}

const Button = ({label,primary,secondary,outline,type,fullWidth, onClick, icon:Icon,disable}:ButtonProps) => {
  return (
    <button 
    onClick={onClick}
    disabled={disable}
    type={type}
    className={`py-2 px-6 text-sm text-center rounded hover:opacity-50 transition-all
     flex items-center justify-center gap-4 mt-1
    ${primary && 'bg-white text-slate-900'}
    ${secondary && "bg-rose-500 text-slate-100"}
    ${outline && "bg-transparent border border-slate-400"}
    ${fullWidth && 'w-full'}
    ${disable && 'opacity-50'}
    `}
    >
      {Icon} {label}
    </button>
  )
}

export default Button