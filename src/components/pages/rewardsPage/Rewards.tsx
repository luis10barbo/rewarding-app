"use client";

import Header from "@/components/header/Header";
import HeaderButton from "@/components/header/HeaderButton";
import RewardCard from "@/components/pages/rewardsPage/card/RewardCard";
import { RewardsContext } from "@/context/RewardsContext";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { useContext } from "react";

const Rewards: React.FC = () => {
  const { rewards } = useContext(RewardsContext);
  return (
    <>
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
    </>
  );
};

export default Rewards;
