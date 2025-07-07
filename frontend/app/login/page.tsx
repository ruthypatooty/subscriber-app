'use client';
import React, { useState } from 'react'
import { Button, Input, PasswordInput, Stack, Notification } from '@mantine/core';
import { IconX, IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import CreateUSerAnchor from './users/components/CreateUSerBtn';

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShowNotification(false);
    try {
      console.log("i inside the handle logsubmit")
      const res = await fetch('http://localhost:3001/api/loginpage/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });
      console.log('see user password here:', userName, password);
      const data = await res.json();
      if (res.ok) {
        console.log('res from user submit', res, data);
        setUserName('');
        setPassword('');
        setIsSuccess(true);
        setShowNotification(true);
        setMessage(`User found,${data.message}`);
        localStorage.setItem('user',JSON.stringify(data));
        setTimeout(() => {
          router.push(data.routePath);
        }, 500);
        

      } else {
        console.log('error in user submit');
        setMessage(`User not found,${data.message}`);
        setIsSuccess(false);
        setShowNotification(true);

      }
      
    } catch (error) {
      console.error('error in post user submit', error);
    }

  }
  return (
    <>
      {showNotification && (
        <Notification
          icon={isSuccess ? checkIcon : xIcon}
          color={isSuccess ? "teal" : "red"}
          title={isSuccess ? "Success!" : "Bummer!"}
          onClose={() => setShowNotification(false)}
        >
        </Notification>
      )}
      <form style={{ maxWidth: 350, margin: '40px auto', width: '100%' }}>
        <Stack>
          <h1>Login Page</h1>
          <Input placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)} />
          <PasswordInput
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Button
            onClick={handleLoginSubmit}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            login button
          </Button>
                  <CreateUSerAnchor />
        </Stack>
      </form>
    </>
  )
}

export default LoginPage
