'use client';
import Link from 'next/link'
import React from 'react'

const CreateUSerAnchor = () => {
  return (
    <>
      <Link href="/createUser">
        <label className="swap swap-flip text-9xl">
          <input type="checkbox" />

          <div className="swap-on">😈</div>
          <div className="swap-off">😇</div>
        </label>
      </Link>
    </>
  );
}

export default CreateUSerAnchor
