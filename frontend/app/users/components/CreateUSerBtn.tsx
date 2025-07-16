"use client";
import { Anchor, Button, Popover } from "@mantine/core";
import Link from "next/link";
import React from "react";

const CreateUSerAnchor = () => {
  return (
    <>
      <div className="card-actions" style={{marginTop:"10px"}}>
        <Button component={Link} href="/createUser" variant="outline">
          Sign Up for new Users
        </Button>
      </div>
    </>
  );
};

export default CreateUSerAnchor;
