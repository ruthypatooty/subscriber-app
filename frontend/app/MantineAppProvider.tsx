// This is a Client Component wrapper for the MantineProvider.
// It allows us to use Mantine's context and hooks in our app.
'use client'; 

import { MantineProvider,Notification } from '@mantine/core';
import React from 'react';

export function MantineAppProvider({ children }: { children: React.ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>;
}