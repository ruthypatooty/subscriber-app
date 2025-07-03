import React from 'react'

export default function WelcomeMsg({children}:{children:React.ReactNode}){
    return (
    <>
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
        <h1 className='text-5xl font-bold'>Select Role</h1>
        <main className='flex flex-col items-center gap-4'>{children}</main>
    </div>
    </>
  )
}

