import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import SidebarNav from '@/components/SidebarNav'
import { getAuthSession } from '@/libs/getAuthSession'
import { redirect } from 'next/navigation'
import Modal from '@/components/Modal'

const font = Roboto({ subsets: ['latin'] ,weight:['400','500','700']})

export const metadata: Metadata = {
  title: 'Chat Ease',
  description: 'Your privacy focus app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={`${font.className} bg-slate-900 text-slate-200 h-full`}>
        <div className='h-full max-w-[1400px] mx-auto flex overflow-hidden'>
          {session && (
            <>
            <SidebarNav />   
            </>
          )}
          {children}
        </div>
        </body>
    </html>
  )
}
