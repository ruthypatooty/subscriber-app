"use client";
import { setRequestMeta } from "next/dist/server/request-meta";
import React, { useEffect, useState } from "react";
import BackBtn from "../users/components/BackBtn";
import SubList from "../users/components/SubList";
import { SubscriberEnum } from "@/shared/enum/statusEnum";
import { useRouter } from "next/navigation";
import { Button, Paper, Stack, TextInput, Text } from "@mantine/core";

const SubscriberPage = () => {
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberRequestStatus, setSubscriberRequestStatus] = useState(
    SubscriberEnum.Sent
  );
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    let user: { message?: { role?: number } } | null = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
    if (user?.message?.role !== 0) {
      router.push("/");
    }
  }, []);
  const handleSubscriberSubmit = async () => {
    console.log("sending request....", subscriberName);
    try {
      const res = await fetch("http://localhost:3001/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriberName, status: SubscriberEnum.Sent }),
      });
      console.log("res handle submit:", res);
      const data = await res.json();
      if (res.ok) {
        console.log("res here:", res, data);
        setSubscriberRequestStatus(SubscriberEnum.Sent);
        setSubscriberName("");
        setMessage("Submitted successfully");
      } else {
        console.error("error in post submit subscriber", data);
        setSubscriberRequestStatus(SubscriberEnum.Rejected);
        setMessage(data.message || "submit failed");
      }
    } catch (error) {
      console.error("error in handlesubscribersubmit", error);
    }
  };
  return (
    <>
      <BackBtn />
      <div className="flex justify-center items-center min-h-screen p-4 bg-base-100">
        <Paper
          shadow="md"
          p="xl"
          radius="lg"
          withBorder
          className="bg-white w-full max-w-2xl"
        >
          <Stack gap="lg" align="center">
            <Text size="xl" fw={600} className="text-center">
              Subscriber Request
            </Text>
            
            <div className="w-full max-w-md">
              <Stack gap="md">
                <TextInput
                  label="Subscriber Name"
                  placeholder="e.g., John Doe"
                  value={subscriberName}
                  onChange={(e) => setSubscriberName(e.currentTarget.value)}
                  size="md"
                  radius="md"
                  withAsterisk
                />
                
                <Button
                  onClick={handleSubscriberSubmit}
                  color="black"
                  variant="filled"
                  size="md"
                  radius="md"
                  fullWidth
                >
                  Submit Request
                </Button>
                
                {message && (
                  <Text 
                    color={message.includes('successfully') ? 'green' : 'red'} 
                    size="sm" 
                    className="text-center"
                  >
                    {message}
                  </Text>
                )}
              </Stack>
            </div>
            
            <div className="w-full">
              <SubList />
            </div>
          </Stack>
        </Paper>
      </div>
    </>
  );
};

export default SubscriberPage;
