import Header from "@/components/header/Header";
import { RewardContext } from "@/context/RewardContext";
import { UserContext } from "@/context/UserContext";
import { Reward as RewardType, User } from "@prisma/client";
import Image from "next/image";
import { useContext } from "react";

const Reward: React.FC<{ reward: RewardType; user: User }> = ({
  reward,
  user,
}) => {
  const isNotAbleToClaim = user.balanceUser < reward.valueReward;
  return (
    <main
      className="flex items-center min-h-screen bg-gradient-radial flex-col gap-2 relative overflow-hidden
after:rounded-full z-10 py-4"
    >
      <Header />
      <div className="flex flex-col gap-4  justify-center items-center rounded-md text-center">
        <div className="w-full aspect-square bg-neutral-500/20 rounded-md relative">
          <Image
            src="/static/images/pizza.jpg"
            alt=""
            fill={true}
            className="rounded-md object-cover"
          />
        </div>
        <p className="text-2xl ">
          {reward.nameReward}{" "}
          <span className=" text-neutral-400">(R${reward.valueReward})</span>
        </p>
        {/* <p className="text-base  text-neutral-300">
            {reward.dscriptionReward}
        </p> */}
        <div className="buttons flex gap-2 flex-col w-full">
          <button
            className={`w-full border-transparent border p-2  rounded-md  duration-75  ${
              isNotAbleToClaim
                ? "bg-neutral-500/5 cursor-not-allowed "
                : "bg-neutral-500/20 hover:bg-neutral-500/30 active:border-neutral-500/30"
            }`}
            disabled={isNotAbleToClaim}
          >
            Resgatar
          </button>
          <button className="w-full border-transparent border p-2 bg-red-300/20 rounded-md hover:bg-red-300/30 duration-75 active:border-neutral-500/30">
            Remover
          </button>
        </div>
      </div>

      <div className="w-full h-[90%] bg-cyan-300/10 absolute -top-32 -z-10 blur-[100px] rounded-full"></div>
      <div className="w-full h-full bg-neutral-900/10 absolute -z-20 top-0"></div>
    </main>
  );
};
export default Reward;
