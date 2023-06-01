import Header from "@/components/header/Header";
import { HistoryContext } from "@/context/HistoryContext";
import { Claims, unclaimClaimSV } from "@/server/db/claimTable";
import { useContext } from "react";

const History: React.FC = () => {
  const { claims, unclaimClaim } = useContext(HistoryContext);

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 w-full mt-4 items-center">
        {claims?.map((claim) => {
          return (
            <div
              key={claim.idClaim}
              className="bg-neutral-500/10 hover:bg-neutral-500/30 duration-75  w-full max-w-2xl flex flex-col  rounded-lg p-4"
            >
              <div className=" gap-2 overflow-auto">
                <p>{claim.goal.nameGoal}</p>
                <p className="text-sm text-neutral-300 pb-2">
                  {claim.goal.descriptionGoal}
                </p>
              </div>
              <div className="flex items-center text-sm gap-1">
                <p className="flex gap-1">
                  <span className="text-neutral-400">Claimed at</span>
                  {claim.dateClaim.toDateString()}{" "}
                  <span className="text-neutral-400">for</span> R${" "}
                  {claim.goal.reward.toFixed(2)}
                </p>

                <div className="buttons ml-auto gap-2">
                  <button
                    className="bg-black/70 hover:bg-black/50 p-2 rounded-md duration-75"
                    onClick={() => {
                      unclaimClaim(claim.idClaim);
                    }}
                  >
                    Unclaim
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default History;
