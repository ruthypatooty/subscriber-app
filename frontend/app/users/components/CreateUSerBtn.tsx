"use client";
import { Anchor, Button, Popover } from "@mantine/core";
import Link from "next/link";
import React from "react";

const CreateUSerAnchor = () => {

  return (
    <>
      <Anchor href="/createUser" underline="hover">
        Sign Up for new Users{" "}
      </Anchor>
    </>
  );
};

export default CreateUSerAnchor;
