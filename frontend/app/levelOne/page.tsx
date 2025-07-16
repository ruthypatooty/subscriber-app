"use client";
import { Lovers_Quarrel } from "next/font/google";
import React, { useEffect, useState } from "react";
import BackBtn from "../users/components/BackBtn";
import SubList from "../users/components/SubList";
import { SubscriberAttributes } from "@/shared/subscriberType";
import { SubscriberEnum } from "@/shared/enum/statusEnum";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Paper, Table, Title } from "@mantine/core";

const LevelOnePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [subscriberList, setSubscriberList] = useState<SubscriberAttributes[]>(
    []
  );

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session || session?.user?.role !== 1) {
      console.log("Unauthorized access, redirecting to home page");
      router.push("/");
      return;
    }
    const sentSubs = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/firstlevelapprover/pending-subscribers"
        );
        const data = await res.json();
        setSubscriberList(data);
      } catch (error) {
        console.error(
          "Error fetching pending subscribers for level 1 approver",
          error
        );
      }
    };
    sentSubs();
    setCheckingAuth(false);
  }, [session, status, router]);
  if (status === "loading" || checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!session || session.user?.role !== 1) {
    return <div>Redirecting...</div>;
  }
  const handleApproval = async (
    subscriberId: number,
    decision: SubscriberEnum.Level1Approved | SubscriberEnum.Rejected
  ) => {
    try {
      console.log(
        "Making request to:",
        "http://localhost:3001/api/firstlevelapprover/decision"
      );
      console.log("Request body:", { subscriberId, decision });

      const res = await fetch(
        "http://localhost:3001/api/firstlevelapprover/decision",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscriberId, decision }),
        }
      );
      const data = await res.json();
      console.log(data);
      setSubscriberList((prev) => prev.filter((s) => s.id !== subscriberId));
    } catch (error) {
      console.error("error decision level 1 approver", error);
    }
  };

  return (
    <>
      <BackBtn />
      <Paper shadow="xs" p="md" withBorder className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-4">
      <Title size="h4">Subscribers List for level 1 approver</Title>

          {subscriberList.length === 0 ? (
            <div>No subs pending for approval</div>
          ) : (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Subscriber Name</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {subscriberList.map((sub: any) => (
                  <Table.Tr key={sub.id}>
                    <Table.Td>{sub.subscriberName}</Table.Td>
                    <Table.Td>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleApproval(
                              sub.id,
                              SubscriberEnum.Level1Approved
                            )
                          }
                          className="bg-amber-300 hover:bg-amber-200 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleApproval(sub.id, SubscriberEnum.Rejected)
                          }
                          className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Reject
                        </button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </div>
        <SubList />
      </Paper>
    </>
  );
};

export default LevelOnePage;
