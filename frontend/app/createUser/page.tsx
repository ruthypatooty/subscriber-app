'use client';
import { roleEnum } from '@/shared/enum/roleEnum';
import { Button, Input, Menu, PasswordInput, Notification } from '@mantine/core'
import React from 'react';
import { useState } from 'react';

const CreateUser = () => {

    const [nameValue, setNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [roleValue, setRoleValue] = useState<number | undefined>(undefined);
    const [completeField, setCompleteField] = useState(false);
    const detailsRef = React.useRef<HTMLDetailsElement>(null);

    const createUserBtn = async () => {
        if (!nameValue || !passwordValue || !roleValue) {
            setCompleteField(false);
        }
        else {
            setCompleteField(true);
                    console.log('creating user with values:', nameValue, passwordValue, roleValue);
            try{
                const res = await fetch('http://localhost:3001/api/createuser',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nameValue, passwordValue, roleValue }),
                });
                const data = res.json();
                if(res.ok){
                    console.log('User created successfully:', data);
                    setNameValue('');
                    setPasswordValue('');
                    setRoleValue(undefined);
                }else{
                    console.error('Error creating user:', data);
                    setCompleteField(false);
                }
            }catch(error){
                console.error('Error creating user:', error);
            }
        }
    }

  return (
    <>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Name
      </label>
      <Input onChange={(e) => setNameValue(e.currentTarget.value)}
value={nameValue} placeholder="Enter user name here..." />

      <PasswordInput
        value={passwordValue}
        label="Password"
        placeholder="Password"
        onChange={(e) => setPasswordValue(e.currentTarget.value)}
      />
      <details className="dropdown" ref={detailsRef}>
        <summary className="btn m-1">Role Type</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          {Object.keys(roleEnum)
            .filter((role) => isNaN(Number(role)))
            .map((role) => (
              <li
                key={role}
                value={roleEnum[role as keyof typeof roleEnum]}
                onClick={() => {
                  setRoleValue(roleEnum[role as keyof typeof roleEnum]);
                  detailsRef.current?.removeAttribute('open');
                }}
              >
                <a>{role}</a>
              </li>
            ))}
        </ul>
      </details>
      <Button
        onClick={createUserBtn}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        create user
      </Button>
      {completeField && (
            <Notification title="We notify you that">
      You are now obligated to give a star to Mantine project on GitHub
    </Notification>
      )}
    </>
  );
}

export default CreateUser
