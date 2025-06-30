'use client';
import Link from 'next/link';
import React from 'react'

const LevelOneApprover = () => {
  return (
    <>
        <Link href ="/levelOne">
            <button className='btn btn-outline btn-accent'
            onClick={()=>console.log("button clicked level one!")}>
                Level 1 Approver
            </button>
        </Link>
    </>

  )
}

export default LevelOneApprover
