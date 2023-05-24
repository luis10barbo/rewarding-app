import {
  AllGoals,
  getAllGoals,
  saveGoal,
  deleteAllGoals,
} from "@/app/server/db/goalsTable";
import { logoutServer } from "@/app/server/session/user";
import { UserContext } from "@/context/UserContext";
import { useState, useEffect, useContext } from "react";

const Home: React.FC = () => {
  const [goals, setGoals] = useState<AllGoals>();

  const { user, login, register } = useContext(UserContext);

  useEffect(() => {
    getAllGoals().then((goal) => setGoals(goal));
  }, []);

  return (
    <main
      className=" items-center min-h-screen bg-gradient-radial flex-col gap-4 relative overflow-hidden
        after:rounded-full z-10"
    >
      <div className="text-lg flex w-full justify-center gap-4 p-4">
        {!user ? (
          <>
            <button
              onClick={() => {
                register("luis10barbo", "teste");
              }}
            >
              registrar
            </button>
            <button
              onClick={() => {
                login("luis10barbo", "teste");
              }}
            >
              login
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              logoutServer();
            }}
          >
            logout
          </button>
        )}

        <button
          onClick={async () => {
            await saveGoal({
              nameGoal: "Teste",
              goalSteps: ["wAGA", "Outra etapa"],
              descriptionGoal:
                "A descricao mais pica do mundo e maior mais logan longa logan",
              reward: { nameReward: "Pizza", valueReward: 72.5 },
            });
          }}
        >
          Criar default
        </button>
        <button
          onClick={async () => {
            await deleteAllGoals();
          }}
        >
          Deletar todos
        </button>
      </div>
      <div className="w-full h-[90%] bg-cyan-300/10 absolute -top-24 -z-10 blur-[100px] rounded-full"></div>
      <div className="w-full h-full bg-neutral-700/10 absolute -z-20 top-0"></div>

      <div className="z-20 flex flex-col items-center gap-4">
        {/* {JSON.stringify(goals)} */}
        {goals?.map((goal) => {
          return (
            <div
              key={goal.idGoal}
              className="flex gap-2 w-[512px] min-h-[6rem] bg-gradient-to-tr bg-neutral-500/20  p-4 text-white rounded-xl"
            >
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                    <p className="text-xl">{goal.nameGoal}</p>
                    <p className="text-neutral-300 text-sm">
                      {goal.descriptionGoal}
                    </p>

                    {goal.goalSteps.length > 0 && (
                      <p className="text-sm mt-auto">Etapas</p>
                    )}
                  </div>

                  <div>
                    {goal.reward && (
                      <div className="flex flex-col text-center gap-2">
                        <p className="text-sm ">Recompensa</p>
                        <div className="aspect-square relative  h-24 bg-neutral-600/30 rounded-md">
                          <div className="absolute w-full h-full justify-center items-center flex flex-col ">
                            {goal.reward.nameReward && (
                              <p>{goal.reward.nameReward}</p>
                            )}
                            {goal.reward.valueReward && (
                              <p className="text-sm text-neutral-400">
                                (R${goal.reward.valueReward})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {goal.goalSteps.length > 0 && (
                  <div className="goal-steps flex flex-col gap-2 ">
                    {goal.goalSteps.map((step, index) => {
                      return (
                        <div
                          key={step.idGoalStep}
                          className="bg-neutral-500/20 p-2 rounded-md"
                        >
                          <div
                            className={`step-${index + 1}`}
                            key={step.idGoalStep}
                          >
                            <p className="text-sm text-neutral-300">
                              {index + 1}. {step.contentStep}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* {goal.reward && (
                  <>
                    <p className="text-sm">Recompensas</p>
                    <div className="flex gap-2 items-center">
                      <div className="p-2 bg-neutral-500/20 w-fit rounded-md">
                        {goal.reward.nameReward}
                      </div>
                      ou
                      <div className="p-2 bg-neutral-500/20 w-fit rounded-md">
                        R${goal.reward.valueReward.toString().replace(".", ",")}
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
export default Home;
