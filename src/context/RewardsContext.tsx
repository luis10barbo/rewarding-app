"use client";

import { Rewards } from "@/components/rewards/card/RewardCard";
import {
  claimRewardSV,
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

interface RewardsContextInterface {
  rewards: Rewards[] | null;
  setRewards: Dispatch<SetStateAction<Rewards[] | null>>;
  claimReward: (idReward: string) => Promise<void>;
  removeReward: (idReward: string) => Promise<void>;
}

export const RewardsContext = createContext({} as RewardsContextInterface);

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rewards, setRewards] = useState<Rewards[] | null>(null);

  const { loadUser } = useContext(UserContext);

  async function getRewards() {
    setRewards(await getMyRewardsSV());
  }

  async function claimReward(idReward: string) {
    await claimRewardSV(idReward);
    loadUser();
  }

  async function removeReward(idReward: string) {
    await removeRewardSV(idReward);
    getRewards();
  }

  useEffect(() => {
    getRewards();
  }, []);

  return (
    <RewardsContext.Provider
      value={{
        rewards,
        setRewards,
        claimReward,
        removeReward,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};
