import Rewards from "@/components/pages/rewardsPage/Rewards";
import { RewardsProvider } from "@/context/RewardsContext";
import { NextPage } from "next";

const RewardsPage: NextPage = () => {
  return (
    <RewardsProvider>
      <Rewards />
    </RewardsProvider>
  );
};

export default RewardsPage;
