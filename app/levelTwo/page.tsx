'use client';
import { SubscriberEnum } from '@/shared/enum/statusEnum';
import { SubscriberAttributes } from '@/shared/subscriberType';
import React, { useEffect, useState } from 'react'

const LevelTwoPage = () => {
    const [subscriberList,setSubscriberList] = useState<SubscriberAttributes[]>([]);

    useEffect(()=>{
        const approved1subs = async()=>{
            try{
                const res = await fetch('http://localhost:3001/api/secondlevelapprover/firstlevelapproved');
                const data = await res.json();
                setSubscriberList(data);

            }catch(error){
                console.log("error in level 2 page", error);
            }
        }
        approved1subs();
    },[]);

    const handleLevel2Approval= async(subscriberId: number, decision: SubscriberEnum.Level2Approved | SubscriberEnum.Rejected)=>{
        try{
            const res = await fetch('http://localhost:3001/api/secondlevelapprover/decision',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({subscriberId, decision}),
        });
        }catch(error){
            console.error("error in level 2 approval", error);
        }
        setSubscriberList((prev)=>subscriberList.filter((s)=>s.id!==subscriberId));
    }
  return (
        <>
            <div>
                <h1 className="header">Subscribers List for level 2 approver</h1>
                <ul>
                    {subscriberList.length===0 && "No pending for approval"}
                    {subscriberList.map((sub: any) => (
                        <li key={sub.id}>{sub.subscriberName}
                            <button onClick={() => handleLevel2Approval(sub.id, SubscriberEnum.Level2Approved)} className="bg-fuchsia-900 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Approve
                            </button>
                            <button onClick={() => handleLevel2Approval(sub.id, SubscriberEnum.Rejected)} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Reject
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </>
  )
}

export default LevelTwoPage
