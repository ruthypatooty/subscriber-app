'use client';
import { setRequestMeta } from 'next/dist/server/request-meta';
import React, { useState } from 'react'
import {SubscriberEnum} from '../../shared/enum/statusEnum';

const SubscriberPage = () => {
  const [subscriberName, setSubscriberName]=useState('');
  const [subscriberRequestStatus, setSubscriberRequestStatus] = useState(SubscriberEnum.Sent);
  const [message, setMessage] = useState('');

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
        <div className='flex items-center space-x-2'>
            <input type ="text" 
            placeholder="Enter your name..."
            className="flex-grow border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={subscriberName}
            onChange={(e)=>{setSubscriberName(e.target.value)}}
            />
            <button onClick={handleSubscriberSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Request
            </button>
        </div>
        {message && <p className='text-red-800'>{message}</p>}
    </>
  )
}

export default SubscriberPage
