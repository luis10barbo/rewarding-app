import {
  AllGoals,
  getAllGoals,
  saveGoal,
  deleteAllGoals,
  getMyGoals,
} from "@/app/server/db/goalsTable";
import { useState, useEffect, useContext } from "react";
import HeaderButton from "../header/HeaderButton";
import Header from "../header/Header";
import GoalCard from "../goals/card/GoalCard";
import { UserContext } from "@/context/UserContext";

const Home: React.FC = () => {
  const [goals, setGoals] = useState<AllGoals | null>();

  const { user } = useContext(UserContext);

  async function getGoals() {
    const goal = await getMyGoals();
    console.log(goal);
    setGoals(goal);
  }

  useEffect(() => {
    getGoals();
  }, [user]);

  return (
    <main
      className="flex items-center min-h-screen bg-gradient-radial flex-col gap-2 relative overflow-hidden
        after:rounded-full z-10 py-4"
    >
      <Header
        extraComponents={
          <>
            <HeaderButton
              onClick={async () => {
                await saveGoal({
                  nameGoal: "Terminar esse site",
                  goalSteps: ["wAGA", "Outra etapa"],
                  descriptionGoal:
                    "A descricao mais pica do mundo e maior mais logan longa logan",
                  reward: { nameReward: "Pizza Enorme", valueReward: 72.5 },
                });
                getGoals();
              }}
            >
              Criar default
            </HeaderButton>
            <HeaderButton
              onClick={async () => {
                await deleteAllGoals();
                getGoals();
              }}
            >
              Deletar todos
            </HeaderButton>
          </>
        }
      />
      <div className="z-20 flex flex-col items-center gap-2">
        {/* <div className="w-full rounded-xl  bg-transparent border border-neutral-500 outline-1 focus:border-neutral-400 outline-none duration-75">
          <input className="bg-transparent w-full p-2 rounded-xl outline-none"></input>
        </div> */}
        {/* {JSON.stringify(goals)} */}
        {goals?.map((goal) => (
          <GoalCard goal={goal} key={goal.idGoal} />
        ))}
      </div>
      <div className="w-full h-[90%] bg-cyan-300/10 absolute -top-32 -z-10 blur-[100px] rounded-full"></div>
      <div className="w-full h-full bg-neutral-900/10 absolute -z-20 top-0"></div>
    </main>
  );
};
export default Home;
