import { ActionIcon } from "@mantine/core";
import { IconArrowBigLeftLines, IconRewindBackward15, IconRewindBackward5, IconRewindForward60 } from "@tabler/icons-react";
import { log } from "console";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const BackBtn = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const logOutBtn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("session is already there, so signing out", session);
    try {
      // Sign out the user
      if (session) {
        console.log("Signing out user:", session);
        await signOut({
          redirect: false,
          callbackUrl: "/",
        });
        console.log("User signed out successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <>
    <ActionIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'red', to: 'orange', deg: 90 }}
      onClick={logOutBtn}
    >
      <IconArrowBigLeftLines />
    </ActionIcon>    </>
  );
};

export default BackBtn;
