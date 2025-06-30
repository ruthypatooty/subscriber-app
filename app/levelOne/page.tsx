'use client';
import { Lovers_Quarrel } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import { SubscriberAttributes } from '@/shared/subscriberType';
import { SubscriberEnum } from '@/shared/enum/statusEnum';
import BackBtn from '../users/components/BackBtn';
import SubList from '../users/components/SubList';

const LevelOnePage = () => {
    const [subscriberList,setSubscriberList] = useState<SubscriberAttributes[]>([]);
    const [subscriberStatus, setSubscriberStatus]=useState(0);
  useEffect(()=>{
    const sentSubs = async()=>{
        try{
            const res = await fetch('http://localhost:3001/api/firstlevelapprover/pending-subscribers');
            const data = await res.json();
            setSubscriberList(data);
        }catch(error){
            console.error("error in levelonepage", error);
    
        }
    }
    sentSubs();
  },[]);

  const handleApproval = async(subscriberId: number,decision: SubscriberEnum.Level1Approved|SubscriberEnum.Rejected)=>{
        try{
            console.log('Making request to:', 'http://localhost:3001/api/firstlevelapprover/decision');
            console.log('Request body:', { subscriberId, decision });
            
            const res = await fetch('http://localhost:3001/api/firstlevelapprover/decision',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({subscriberId,decision}),
        });
        const data = await res.json();
        console.log(data);
        setSubscriberList((prev)=>prev.filter((s)=>s.id!==subscriberId));
        }catch(error){
            console.error("error decision level 1 approver", error);
        }
    }
  
  
    return (
        <>
            <BackBtn/>
            <div className='border-y-violet-800 flex flex-col justify-center items-center h-screen gap-4'>
                <h1 className="header p-4 pb-2 opacity-60 tracking-wide">Subscribers List for level 1 approver</h1>
                <ul className='list bg-base-100 rounded-box shadow-md'>
                    {subscriberList.length===0 && "no subs pending for approval"}
                    <span className='min-w-48'>{subscriberList.map((sub: any) => (
                        <li className='list-row flex gap-2 justify-between items-center' key={sub.id}>{sub.subscriberName}
                            <button onClick={() => handleApproval(sub.id, SubscriberEnum.Level1Approved)} className="bg-amber-300 hover:bg-amber-200 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Approve
                            </button>
                            <button onClick={() => handleApproval(sub.id, SubscriberEnum.Rejected)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Reject
                            </button>
                        </li>
                    ))}</span>
                </ul>

            </div>
            <SubList/>
        </>
  )
}

export default LevelOnePage
