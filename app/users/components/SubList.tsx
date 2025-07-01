import { SubscriberAttributes } from '@/shared/subscriberType'
import { error } from 'console';
import React, { useEffect, useState } from 'react'

const SubList = () => {
    const [activeLatest, setActiveLatest] = useState<SubscriberAttributes>();

    const showLatest = async()=>{
        try{
            const res = await fetch('http://localhost:3001/api/active-subscribers');

            if(!res.ok){
                throw new Error(`error in showlist ${res.status}`);
            }

            const activeSubList : SubscriberAttributes= await res.json();
            setActiveLatest(activeSubList);

        }catch(error){
            console.error('error in subscriber list');
        }
    }
    useEffect(()=>{
        showLatest();
    },[]);
  return (
      <>
          <div>
              {/* <h1>Current active subscribers</h1>
              <ul>
                  {activeList.length === 0 && "No active subscribers"}
                  {activeList.map((sub: any) => (
                      <li key={sub.id}>
                          {sub.subscriberName}
                      </li>
                  ))}

              </ul> */}
              {activeLatest ? (
                  <div role="alert" className="alert alert-info">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>New subscriber:{activeLatest.subscriberName}</span>
                  </div>
              ) : <p>No new subscribers</p>}

          </div>
      </>
  )
}

export default SubList
