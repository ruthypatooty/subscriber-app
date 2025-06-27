'use client';
import { Lovers_Quarrel } from 'next/font/google';
import React, { useEffect, useState } from 'react'
import { SubscriberAttributes } from '@/shared/subscriberType';
import { SubscriberEnum } from '@/shared/enum/statusEnum';

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
            <div>
                <h1 className="header">Subscribers List for level 1 approver</h1>
                <ul>
                    {subscriberList.length===0 && "no subs pending for approval"}
                    {subscriberList.map((sub: any) => (
                        <li key={sub.id}>{sub.subscriberName}
                            <button onClick={() => handleApproval(sub.id, SubscriberEnum.Level1Approved)} className="bg-amber-300 hover:bg-amber-200 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Approve
                            </button>
                            <button onClick={() => handleApproval(sub.id, SubscriberEnum.Rejected)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </>
  )
}

export default LevelOnePage
