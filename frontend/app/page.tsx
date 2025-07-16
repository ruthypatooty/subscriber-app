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
import { redirect, usePathname, useRouter } from "next/navigation";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.routePath && status === "authenticated") {
      router.push(session.user.routePath);
    }
  }, [session, status, router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShowNotification(false);

    try {
      const result = await signIn("credentials", {
        userName,
        password,
        redirect: false,
      });

      if (result?.error) {
        setIsSuccess(false);
        setMessage("Invalid username or password");
        setShowNotification(true);
      } else {
        setIsSuccess(true);
        setMessage("Login successful!");
        setShowNotification(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsSuccess(false);
      setMessage("Login failed");
      setShowNotification(true);
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   const { user } = session || {};
  //   if (status === "authenticated" && user?.routePath && pathname === "/") {
  //     console.log("Redirecting to:", user.routePath);
  //     router.replace(user.routePath);

  //   }
  // }, [status, session?.user?.routePath, pathname, router]);

  // const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   setShowNotification(false);

  //   try {
  //     const authResponse = await signIn("credentials", {
  //       userName,
  //       password,
  //       redirect: false, // Prevent automatic redirection
  //     });
  //     if (authResponse?.ok) {
  //       setUserName("");
  //       setPassword("");
  //       setIsSuccess(true);
  //       setShowNotification(true);
  //       setMessage(`User found`);
  //       console.log(authResponse, "authResponse in login page");

  //       await update();
  //     } else {
  //       setIsSuccess(false);
  //       setShowNotification(true);
  //       setMessage(`Login failed`);
  //       console.error("Login failed:", authResponse?.error);

  //       throw new Error("NextAuth session creation failed");
  //     }
  //   } catch (error) {
  //     console.error("error in post user submit", error);
  //   }
  // };
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
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-base-100 w-96 shadow-sm">
          <form style={{ maxWidth: 350, margin: "40px auto", width: "100%" }}>
            <Stack gap="md" className="card-body items-center text-center">
              <h2 className="card-title">Login Page</h2>
              <Input
                placeholder="username"
                value={userName}
                onChange={(e) => setUserName(e.currentTarget.value)}
              />
              <PasswordInput
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <div className="card-actions">
                <Button
                  onClick={handleLoginSubmit}
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  login button
                </Button>
                <h2 className="card-title">
                  <CreateUSerAnchor />
                </h2>
              </div>
            </Stack>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
