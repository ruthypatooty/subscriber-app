"use client";
import { roleEnum } from "@/shared/enum/roleEnum";
import {
  Button,
  Input,
  Text,
  PasswordInput,
  Notification,
  Card,
  Select,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const CreateUser = () => {
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [roleValue, setRoleValue] = useState<number | undefined>(undefined);
  const [completeField, setCompleteField] = useState(false);
  const detailsRef = React.useRef<HTMLDetailsElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const createUserBtn = async (e: any) => {
    e.preventDefault(); // Prevent auto-submit
    if (!nameValue || !passwordValue || roleValue === undefined) {
      setCompleteField(false);
    } else {
      setCompleteField(true);
      console.log(
        "creating user with values:",
        nameValue,
        passwordValue,
        roleValue
      );
      try {
        const res = await fetch("http://localhost:3001/api/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nameValue, passwordValue, roleValue }),
        });
        const data = res.json();
        if (res.ok) {
          console.log("User created successfully:", data);
          setNameValue("");
          setPasswordValue("");
          setRoleValue(undefined);
          setIsSuccess(true);
          setTimeout(() => {
            router.push("/");
          }, 500);
        } else {
          console.error("Error creating user:", data);
          setCompleteField(false);
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={500}>Name</Text>

          <Input
            onChange={(e) => setNameValue(e.currentTarget.value)}
            value={nameValue}
            placeholder="Enter user name here..."
          />
          <Text fw={500}>Password</Text>

          <PasswordInput
            value={passwordValue}
            placeholder="Password"
            onChange={(e) => setPasswordValue(e.currentTarget.value)}
          />
          <Text fw={500}>Role Type</Text>

          <Select
            placeholder="Select role type"
            value={roleValue?.toString()}
            onChange={(value) =>
              setRoleValue(value ? parseInt(value) : undefined)
            }
            data={Object.keys(roleEnum)
              .filter((role) => isNaN(Number(role)))
              .map((role) => ({
                value: roleEnum[role as keyof typeof roleEnum].toString(),
                label: role,
              }))}
          />

          {/* // <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          //   {Object.keys(roleEnum) */}
          {/* //     .filter((role) => isNaN(Number(role)))
          //     .map((role) => (
          //       <li */}
          {/* //         key={role}
          //         value={roleEnum[role as keyof typeof roleEnum]}
          //         onClick={() => {
          //           setRoleValue(roleEnum[role as keyof typeof roleEnum]);
          //           detailsRef.current?.removeAttribute("open");
          //         }}
          //       >
          //         <a>{role}</a>
          //       </li>
          //     ))}
          // </ul> */}

          <Button
            fullWidth
            mt="md"
            radius="md"
            onClick={createUserBtn}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            type="button"
          >
            Create User
          </Button>
          {completeField && (
            <Notification
              title={isSuccess ? "Success!" : "wonk wonk"}
            ></Notification>
          )}
        </Card>
      </div>
    </>
  );
};

export default CreateUser;
