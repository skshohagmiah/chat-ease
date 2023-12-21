'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Register = () => {


  const formSchema = z.object({
    username:z.string().min(3,'please provide a valid username'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8,'password length must be above 8 caracter')
  });

  const {
      register,
      handleSubmit,
      formState: { errors,isSubmitting },
      control,
      reset,
    } = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username:'',
        email: '',
        password:''
      },
    });


   async function onSubmit(values:z.infer< typeof formSchema>){
      try {
       const res = await axios.post('/api/register', values);
       signIn('credentials',{email:values.email, password:values.password, callbackUrl:'/', redirect:true})
       reset();
      } catch (error) {
        console.log(error)
      }
    }



  return (
    <div className='flex items-center justify-center w-full h-full'>
        <div className='w-[350px] border p-4 shadow border-slate-400 rounded-md'>
            <h2 className='text-3xl font-bold p-2 text-center'>Sign Up</h2>
            <small className='text-sm text-center flex justify-center text-slate-400 -mt-2 mb-2'>to continue using chat ease</small>
            <form className='w-full space-y-2' onSubmit={handleSubmit(onSubmit)}>
                <div>
                <Label id='name' text='Username:'/>
                <Input type='text' label='name' disabled={isSubmitting} rest={register('username',{required:true})}  placeholder='usarname' />
                {errors.username && (
                  <p className='text-rose-400 text-xs p-1'>{errors.username.message}</p>
                )}
                </div>
                <div>
                <Label id='email' text='Email:'/>
                <Input type='text' label='email' disabled={isSubmitting}  rest={register('email',{required:true})}  placeholder='enter your email' />
                {errors.email && (
                  <p className='text-rose-400 text-xs p-1'>{errors.email.message}</p>
                )}
                </div>
                <div className='pb-2'>
                <Label id='password' text='Password:'/>
                <Input type='password' disabled={isSubmitting} rest={register('password',{required:true})}  label='password'  placeholder='password' />
                {errors.password && (
                  <p className='text-rose-400 text-xs p-1'>{errors.password.message}</p>
                )}
                </div>
                <Button label='Sign Up' disable={isSubmitting} type='submit' secondary fullWidth />
            </form>
            <p className='p-2 text-sm text-center text-slate-300'>Already Have an Account ? <Link className='underline hover:text-white' href={'/login'}>Sign In</Link></p>
        </div>  
    </div>
  )
}

export default Register