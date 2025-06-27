import Image from "next/image";
import SubscriberBtn from "./users/components/SubscriberBtn";
import LevelOneApprover from "./users/components/LevelOneBtn";
import LevelTwoApprover from "./users/components/LevelTwoBtn";

export default function Home() {
  return (
    <>
    <p>helloooo</p>
    <h1>User Type</h1>
    <SubscriberBtn />
    <LevelOneApprover />
    <LevelTwoApprover/>
    </>
  );
}
