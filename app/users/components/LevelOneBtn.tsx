'use client';
import Link from 'next/link';
import React from 'react'

const LevelOneApprover = () => {
  return (
    <>
        <Link href ="/levelOne">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>console.log("button clicked level one!")}>
                Level 1 Approver
            </button>
        </Link>
    </>

  )
}

export default LevelOneApprover
