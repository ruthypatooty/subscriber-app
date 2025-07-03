import Image from "next/image";
import SubscriberBtn from "./users/components/SubscriberBtn";
import LevelOneApprover from "./users/components/LevelOneBtn";
import LevelTwoApprover from "./users/components/LevelTwoBtn";
import WelcomeMsg from "./users/components/Welcome";

export default function Home() {
  return (
    <>
    <div>
        <WelcomeMsg>
          <SubscriberBtn />
          <LevelOneApprover />
          <LevelTwoApprover />
        </WelcomeMsg>
    </div>
    </>
  );
}
