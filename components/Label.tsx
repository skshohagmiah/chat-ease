import React from 'react'


interface LabelProps{
    id:string,
    text:string
}

const Label = ({id,text}:LabelProps) => {
  return (
    <label htmlFor={id} className='text-sm font-light text-slate-300'>
            {text}
    </label>
  )
}

export default Label