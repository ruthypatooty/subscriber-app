import { SubscriberAttributes } from '@/shared/subscriberType'
import { Alert, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { error } from 'console';
import React, { useEffect, useState } from 'react'

const SubList = () => {
    const [activeLatest, setActiveLatest] = useState<SubscriberAttributes>();
    const [isVisible, setIsVisible] = useState(false);

    const showLatest = async()=>{
        try{
            const res = await fetch('http://localhost:3001/api/active-subscribers');

            if(!res.ok){
                throw new Error(`error in showlist ${res.status}`);
            }

            const activeSubList : SubscriberAttributes= await res.json();
            setActiveLatest(activeSubList);
            setIsVisible(true);

        }catch(error){
            console.error('error in subscriber list');
        }
    }
    useEffect(()=>{
        showLatest();
    },[]);
        if (!activeLatest) {
        return (
            <Text size="sm" color="dimmed" className="text-center">
                No recent subscribers
            </Text>
        );
    }
  return (
      <>
        <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Alert
                icon={<IconCheck size="1rem" />}
                title="Latest Subscriber"
                color="green"
                radius="lg"
                variant="light"
                className="bg-green-50 border-green-200"
                withCloseButton
                onClose={() => setIsVisible(false)}
            >
                <Text size="sm" className="text-green-800">
                    Last approved: <strong>{activeLatest.subscriberName}</strong>
                </Text>
            </Alert>
        </div>
      </>
  )
}

export default SubList
