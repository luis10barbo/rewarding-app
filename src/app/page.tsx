"use client";

import { useEffect, useState } from "react";
import {
  AllGoals,
  deleteAllGoals,
  getAllGoals,
  saveGoal,
} from "./server/db/goalsTable";
import { getUser, login, logout, register } from "./server/session/user";
import { User } from "@prisma/client";

export default function Home() {
  const [goals, setGoals] = useState<AllGoals>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getAllGoals().then((goal) => setGoals(goal));
    getUser().then((user) => {
      console.log(user);
      if (user) setUser(user);
    });
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
              logout();
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
            <div className="flex gap-2 w-[512px] min-h-[6rem] bg-gradient-to-tr from-neutral-900 to-neutral-700 p-4 text-white rounded-xl">
              <div className="flex flex-col flex-1">
                <p>{goal.nameGoal}</p>
                <p className="text-neutral-300 text-sm mb-4">
                  {goal.descriptionGoal}
                </p>
                {goal.goalSteps.length > 0 && (
                  <div className="goal-steps mt-auto flex flex-col gap-2 ">
                    <p className="text-sm">Etapas</p>
                    {goal.goalSteps.map((step, index) => {
                      return (
                        <div className="bg-neutral-500/20 p-2 rounded-md">
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
              </div>
              {goal.reward && (
                <div className="flex flex-col text-center gap-2">
                  <p className="text-sm ">Recompensa</p>
                  <div className="aspect-square relative  h-24 bg-neutral-600/30 rounded-md">
                    <div className="absolute w-full h-full justify-evenly items-center flex flex-col ">
                      {goal.reward.nameReward && (
                        <p>{goal.reward.nameReward}</p>
                      )}
                      <div className="h-[1px] w-full bg-neutral-500/20"></div>
                      {goal.reward.valueReward && (
                        <p>R${goal.reward.valueReward}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
