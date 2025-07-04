'use client';
import { setRequestMeta } from 'next/dist/server/request-meta';
import React, { useEffect, useState } from 'react'
import BackBtn from '../users/components/BackBtn';
import SubList from '../users/components/SubList';
import { SubscriberEnum } from '@/shared/enum/statusEnum';
import { useRouter } from 'next/navigation';

const SubscriberPage = () => {
  const [subscriberName, setSubscriberName]=useState('');
  const [subscriberRequestStatus, setSubscriberRequestStatus] = useState(SubscriberEnum.Sent);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
      const userStr = localStorage.getItem('user');
        let user: { message?:{userName?: string} } | null = null;
        if (userStr) {
            try {
                user = JSON.parse(userStr);
            } catch (e) {
                console.error('Failed to parse user from localStorage', e);
            }
        }
        if (user?.message?.userName !== 'sub1') {
            router.push('/');
        }
 
  }, []);
  const handleSubscriberSubmit = async()=>{
    console.log('sending request....', subscriberName);
    try{
      const res = await fetch('http://localhost:3001/api/subscribers',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({subscriberName, status: SubscriberEnum.Sent}),
      });
     console.log("res handle submit:",res);
      const data = await res.json();
      if(res.ok){
        console.log("res here:",res, data);
        setSubscriberRequestStatus(SubscriberEnum.Sent);
        setSubscriberName('');
        setMessage('Submitted successfully');
      }else{
        console.error("error in post submit subscriber",data);
        setSubscriberRequestStatus(SubscriberEnum.Rejected);
        setMessage(data.message||"submit failed");
      }
    }catch(error){
      console.error("error in handlesubscribersubmit", error);
    }
  }
  return (
    <>
      <BackBtn />
      <div className='flex justify-center items-center h-screen gap-4'>
        <input type="text"
          placeholder="Enter your name..."
          className=" border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
          value={subscriberName}
          onChange={(e) => { setSubscriberName(e.target.value) }}
        />
        <button onClick={handleSubscriberSubmit} className="btn btn-secondary hover:bg-pink-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2">
          Request
        </button>
        {message && <p className='text-red-800'>{message}</p>}

      </div>
      <div className='flex justify-baseline'><SubList /></div>
    </>
  )
}

export default SubscriberPage
