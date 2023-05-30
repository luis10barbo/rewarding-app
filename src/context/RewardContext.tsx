"use client";

import {
  Reward,
  claimRewardSV,
  getMyRewardSV,
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
  reward: Reward | null;
  setReward: Dispatch<SetStateAction<Reward | null>>;
  setIdReward: Dispatch<SetStateAction<string | null>>;
  claimReward: (idReward: string) => Promise<void>;
  removeReward: (idReward: string) => Promise<void>;
}

export const RewardContext = createContext({} as RewardContextInterface);

export const RewardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reward, setReward] = useState<Reward | null>(null);
  const [idReward, setIdReward] = useState<string | null>(null);

  const { loadUser } = useContext(UserContext);

  async function getReward() {
    if (!idReward) return;

    const response = await getMyRewardSV(idReward);

    if (response.error) return;
    setReward(response.data);
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
