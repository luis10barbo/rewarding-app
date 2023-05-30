import { RewardsContext } from "@/context/RewardsContext";
import { UserContext } from "@/context/UserContext";
import { Reward } from "@/server/db/rewardsTable";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

const RewardCard: React.FC<{ reward: Reward }> = ({ reward }) => {
  const { claimReward, removeReward } = useContext(RewardsContext);
  const { user } = useContext(UserContext);

  return (
    <div className="bg-neutral-500/10 rounded-xl p-4 flex flex-col gap-2">
      <div className="aspect-square min-w-[6rem] w-48 max-w-[100%] rounded-md bg-neutral-500/10 relative">
        <Image
          src={"/static/images/pizza.jpg"}
          alt=""
          fill={true}
          className="outline-none rounded-md object-cover"
        />
        <div className="flex flex-col text-xl z-10 absolute bottom-0 w-full text-center p-2 pt-12 rounded-b-md">
          <div className="flex flex-col justify-center items-center">
            <p className="text-base">{reward.nameReward}</p>
            <p className="text-sm text-neutral-300">
              (R$ {reward.valueReward})
            </p>
          </div>
        </div>
        <div className="absolute w-full h-full from-black/80 to-transparent rounded-md bg-gradient-to-t"></div>
      </div>
      <Link href={`/me/reward?id=${reward.idReward}`}>
        <button className="p-2 text-center w-full border-transparent border active:border-white/30 bg-neutral-500/20 hover:bg-neutral-500/30 duration-75 rounded-md">
          Abrir
        </button>
      </Link>

      {user && (
        <>
          <button
            className={`p-2 text-center w-full border-transparent border  duration-75 rounded-md ${
              user.balanceUser > reward.valueReward
                ? "active:border-white/30 bg-neutral-500/20 hover:bg-neutral-500/30"
                : "text-neutral-500 cursor-not-allowed bg-neutral-500/5"
            }`}
            onClick={() => {
              claimReward(reward.idReward);
            }}
          >
            Reinvindicar
          </button>
          <button
            className="p-2 text-center w-full border-transparent border  duration-75 rounded-md bg-red-300/20"
            onClick={() => {
              removeReward(reward.idReward);
            }}
          >
            Remover
          </button>
        </>
      )}
    </div>
  );
};
export default RewardCard;
