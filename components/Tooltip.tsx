import React from 'react'

interface TooltipProps{
    text:string,
    children:React.ReactNode
    position?:string
    fullWidth?:boolean
}

const Tooltip = ({text,children,position,fullWidth}:TooltipProps) => {
  return (
    <div className={`group relative inline-block ${fullWidth && 'w-full'}`}>
        {children}
        <span className={`invisible group-hover:visible p-1 bg-slate-600 text-sm z-50 whitespace-nowrap rounded-md absolute ${position ? position : '-bottom-6 right-0'} capitalize`}>{text}</span>
    </div>
  )
}

export default Tooltip