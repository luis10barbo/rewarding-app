"use client";

import Reward from "@/components/pages/rewardPage/Reward";
import { RewardContext, RewardProvider } from "@/context/RewardContext";
import { UserContext } from "@/context/UserContext";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

const RewardsPage: NextPage = () => {
  const id = useSearchParams().get("id");
  const { setIdReward, reward } = useContext(RewardContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIdReward(id);
  }, [id]);
  if (!reward || !user) return <></>;
  return <Reward reward={reward} user={user} />;
};

export default RewardsPage;
