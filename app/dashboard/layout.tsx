
import {FC, ReactNode} from 'react'
import { authOptions } from '../lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

interface layoutProps {
children: ReactNode
 
}

const layout = async ({ children }: layoutProps) =>{
    const session = await getServerSession(authOptions)
    if (!session) notFound()
    
    return <div className='w-full flex h-screen'>
        <div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white p-4'></div>
        <Link href='/dashboard' className='flex h-16 shrink-0 items-center' >
         
        </Link>
        {children}
    </div>
}

export default layout