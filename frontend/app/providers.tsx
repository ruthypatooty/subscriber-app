'use client';
import { SessionProvider } from "next-auth/react";
import { MantineAppProvider } from "./MantineAppProvider";

export function Providers({children}:{children: React.ReactNode}) {
  return (
    <SessionProvider>
      <MantineAppProvider>
        {children}
      </MantineAppProvider>
    </SessionProvider>
  );
}