"use client";

import Header from "@/components/header/Header";
import HeaderButton from "@/components/header/HeaderButton";
import RewardCard from "@/components/rewards/card/RewardCard";
import { RewardsContext } from "@/context/RewardsContext";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { useContext } from "react";

const Rewards: React.FC = () => {
  const { rewards } = useContext(RewardsContext);
  return (
    <main
      className="flex items-center min-h-screen bg-gradient-radial flex-col gap-2 relative overflow-hidden
  after:rounded-full z-10 py-4"
    >
      <Header
        extraComponents={
          <>
            <HeaderButton onClick={async () => {}}>Criar default</HeaderButton>
            <HeaderButton
              onClick={async () => {
                // await deleteAllGoals();
              }}
            >
              Deletar todos
            </HeaderButton>
          </>
        }
      />
      <div className="z-20 grid grid-cols-2 items-center gap-4">
        {rewards?.map((reward) => (
          <RewardCard reward={reward} key={reward.idReward}></RewardCard>
        ))}
      </div>
      <div className="w-full h-[90%] bg-cyan-300/10 absolute -top-32 -z-10 blur-[100px] rounded-full"></div>
      <div className="w-full h-full bg-neutral-900/10 absolute -z-20 top-0"></div>
    </main>
  );
};

export default Rewards;
