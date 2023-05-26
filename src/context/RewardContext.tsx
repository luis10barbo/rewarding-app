"use client";

import { Rewards } from "@/components/pages/rewardsPage/card/RewardCard";
import {
  claimRewardSV,
  getMyRewardSV,
  getMyRewardsSV,
  removeRewardSV,
} from "@/server/db/rewardsTable";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  useContext,
} from "react";
import { UserContext } from "./UserContext";

interface RewardContextInterface {
  reward: Rewards | null;
  setReward: Dispatch<SetStateAction<Rewards | null>>;
  setIdReward: Dispatch<SetStateAction<string | null>>;
  claimReward: (idReward: string) => Promise<void>;
  removeReward: (idReward: string) => Promise<void>;
}

export const RewardContext = createContext({} as RewardContextInterface);

export const RewardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reward, setReward] = useState<Rewards | null>(null);
  const [idReward, setIdReward] = useState<string | null>(null);

  const { loadUser } = useContext(UserContext);

  async function getReward() {
    if (idReward) setReward(await getMyRewardSV(idReward));
  }

  async function claimReward(idReward: string) {
    await claimRewardSV(idReward);
    loadUser();
  }

  async function removeReward(idReward: string) {
    await removeRewardSV(idReward);
    getReward();
  }

  useEffect(() => {
    getReward();
  }, [idReward]);

  return (
    <RewardContext.Provider
      value={{
        reward: reward,
        setReward,
        setIdReward,
        claimReward,
        removeReward,
      }}
    >
      {children}
    </RewardContext.Provider>
  );
};
