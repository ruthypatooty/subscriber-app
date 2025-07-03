'use client';
import Link from 'next/link';
import React from 'react'

const LevelTwoApprover = () => {
  return (
    <>
        <Link href ="/levelTwo">
            <button className='btn btn-outline btn-primary'
            onClick={()=>console.log("button clicked level two!")}>
                Level 2 Approver
            </button>
        </Link>
    </>

  )
}

export default LevelTwoApprover
