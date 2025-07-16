"use client";
import { SubscriberAttributes } from "@/shared/subscriberType";
import React, { useEffect, useState } from "react";
import BackBtn from "../users/components/BackBtn";
import SubList from "../users/components/SubList";
import { SubscriberEnum } from "@/shared/enum/statusEnum";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Paper, Table, Title } from "@mantine/core";

const LevelTwoPage = () => {
  const [subscriberList, setSubscriberList] = useState<SubscriberAttributes[]>(
    []
  );
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session || session?.user?.role !== 2) {
      console.log("Unauthorized access, redirecting to home page");
      router.push("/");
      return;
    }
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/api/secondlevelapprover/firstlevelapproved"
        );
        const data = await res.json();
        setSubscriberList(data);
      } catch (error) {
        console.error(
          "Error fetching pending subscribers for level 2 approver",
          error
        );
      }
    };
    fetchSubscribers();
    setCheckingAuth(false);
  }, [session, status, router]);    

  const handleLevel2Approval = async (
    subscriberId: number,
    decision: SubscriberEnum.Level2Approved | SubscriberEnum.Rejected
  ) => {
    try {
      const res = await fetch(
        "http://localhost:3001/api/secondlevelapprover/decision",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subscriberId, decision }),
        }
      );
    } catch (error) {
      console.error("error in level 2 approval", error);
    }
    setSubscriberList((prev) =>
      subscriberList.filter((s) => s.id !== subscriberId)
    );
  };
  return (
    <>
      <BackBtn />
     <Paper shadow="xs" p="md" withBorder className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-4">
          <Title size="h4">Subscribers List for level 2 approver</Title>

          {subscriberList.length === 0 ? (
            <div>No pending for approval from level 1</div>
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
                            handleLevel2Approval(sub.id, SubscriberEnum.Level2Approved)
                          }
                          className="bg-fuchsia-900 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleLevel2Approval(sub.id, SubscriberEnum.Rejected)
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
                      <div className="w-full">
              <SubList />
            </div>
        </div>
      </Paper>
    </>
  );
};

export default LevelTwoPage;
