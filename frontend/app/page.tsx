"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  PasswordInput,
  Stack,
  Notification,
} from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import CreateUSerAnchor from "./users/components/CreateUSerBtn";
import { useSession, signIn, signOut } from "next-auth/react";
import path from "path";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status, update } = useSession();

  useEffect(() => {
    const { user } = session || {};
    if (status === "authenticated" && user?.routePath && pathname === "/") {
      console.log("Redirecting to:", user.routePath);
      router.replace(user.routePath);

    }
  }, [status, session?.user?.routePath, pathname, router]);

  
  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowNotification(false);


    try {
      const authResponse = await signIn("credentials", {
        userName,
        password,
        redirect: false, // Prevent automatic redirection
      });
      if (authResponse?.ok) {
        setUserName("");
        setPassword("");
        setIsSuccess(true);
        setShowNotification(true);
        setMessage(`User found`);
        console.log(authResponse, "authResponse in login page");

        await update();
      } else {
        setIsSuccess(false);
        setShowNotification(true);
        setMessage(`Login failed`);
        console.error("Login failed:", authResponse?.error);

        throw new Error("NextAuth session creation failed");
      }
    } catch (error) {
      console.error("error in post user submit", error);
    }
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (
    status === "authenticated" &&
    pathname === "/" &&
    session?.user?.routePath
  ) {
    return <div>Redirecting...</div>;
  }
  return (
    <>
      {showNotification && (
        <Notification
          icon={isSuccess ? checkIcon : xIcon}
          color={isSuccess ? "teal" : "red"}
          title={isSuccess ? "Success!" : "Bummer!"}
          onClose={() => setShowNotification(false)}
        ></Notification>
      )}
      <form style={{ maxWidth: 350, margin: "40px auto", width: "100%" }}>
        <Stack>
          <h1>Login Page</h1>
          <Input
            placeholder="username"
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
          <PasswordInput
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Button
            onClick={handleLoginSubmit}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            login button
          </Button>
          <CreateUSerAnchor />
        </Stack>
      </form>
    </>
  );
};

export default LoginPage;
