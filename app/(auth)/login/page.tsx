'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Link from 'next/link'
import React from 'react'
import { z } from 'zod';
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

const LoginPage = () => {

    const formSchema = z.object({
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
          email: '',
          password:''
        },
      });


     async function onSubmit(values:z.infer< typeof formSchema>){
       try {
        signIn('credentials', {email:values.email, password:values.password, callbackUrl:'/', redirect:true})
       } catch (error) {
        console.log(error)
       }
      }



  return (
    <div className='flex items-center justify-center w-full h-full'>
        <div className='w-[350px] border p-4 shadow border-slate-400 rounded-md'>
            <h2 className='text-3xl font-bold p-2 text-center'>Sign In</h2>
            <small className='text-sm text-center flex justify-center text-slate-400 -mt-2 mb-2'>to continue using chat ease</small>
            <form className='w-full space-y-2' onSubmit={handleSubmit(onSubmit)}>
                <div>
                <Label id='email' text='Email:'/>
                <Input type='text' disabled={isSubmitting} label='email' rest={register('email',{required:true})} placeholder='enter your email' />
                {errors.email && (
                    <p className='text-xs text-rose-400 p-1'>{errors.email.message}</p>
                )}
                </div>
                <div className='pb-2'>
                <Label id='password' text='Password:'/>
                <Input type='password' disabled={isSubmitting} label='password'  rest={register('password',{required:true})}  placeholder='password' />
                {errors.password && (
                    <p  className='text-xs text-rose-400 p-1'>{errors.password.message}</p>
                )}
                </div>
                <Button label='Sign In' disable={isSubmitting} type='submit' secondary fullWidth />
            </form>
            <h3 className='text-center text-2xl font-semibold p-2 text-slate-300'>Or</h3>
            <Button onClick={() => signIn('google',{callbackUrl:'/'})} icon={<FaGoogle/>} fullWidth label='Sign In With Google' type='button' outline/>
            <Button onClick={() => signIn('github',{callbackUrl:'/'})} icon={<FaGithub/>} fullWidth label='Sign In With Github' type='button' outline/>
            <p className='p-2 text-sm text-center text-slate-300'>Dont`t have an Account ? <Link className='underline hover:text-white' href={'/register'}>Sign Up</Link></p>
        </div>  
    </div>
  )
}

export default LoginPage