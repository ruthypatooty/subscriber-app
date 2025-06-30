import { SubscriberAttributes } from '@/shared/subscriberType'
import { error } from 'console';
import React, { useEffect, useState } from 'react'

const SubList = () => {
    const [activeList, setActiveList] = useState<SubscriberAttributes[]>([]);

    const showList = async()=>{
        try{
            const res = await fetch('http://localhost:3001/api/active-subscribers');

            const activeSubList : SubscriberAttributes[]= await res.json();
            setActiveList(activeSubList);

            if(!res.ok){
                throw new Error(`error in showlist ${res.status}`);
            }
        }catch(error){
            console.error('error in subscriber list');
        }
    }
    useEffect(()=>{
        showList();
    },[]);
  return (
      <>
          <div>
              <h1>Current active subscribers</h1>
              <ul>
                  {activeList.length === 0 && "No active subscribers"}
                  {activeList.map((sub: any) => (
                      <li key={sub.id}>
                          {sub.subscriberName}
                      </li>
                  ))}

              </ul>
          </div>
      </>
  )
}

export default SubList
