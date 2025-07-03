'use client';
import Link from 'next/link';
import React from 'react'

const SubscriberBtn = () => {
  return (
    <>
        <Link href ="/subscriber">
            <button className='btn btn-outline btn-secondary'
            onClick={()=>console.log("button clicked subscriber!")}>
                Subscriber
            </button>
        </Link>
    </>

  )
}

export default SubscriberBtn
