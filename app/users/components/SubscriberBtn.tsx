'use client';
import Link from 'next/link';
import React from 'react'

const SubscriberBtn = () => {
  return (
    <>
        <Link href ="/subscriber">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>console.log("button clicked subscriber!")}>
                Subscriber
            </button>
        </Link>
    </>

  )
}

export default SubscriberBtn
