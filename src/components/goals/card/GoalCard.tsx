import { AllGoals, deleteGoal } from "@/app/server/db/goalsTable";
import GoalCardSteps from "./GoalCardStep";
import { useState } from "react";
import { EditableText } from "./GoalEditableComponents";
import Link from "next/link";

export type Goal = AllGoals[0];
const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
  const [isEditing, setEditing] = useState(true);
  return (
    <div
      key={goal.idGoal}
      className="flex gap-2 w-[512px] min-h-[6rem] bg-gradient-to-tr bg-neutral-500/20  p-4 text-white rounded-xl"
    >
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 w-full">
            <EditableText
              className="text-xl"
              textValue={goal.nameGoal}
              isEditing={isEditing}
            />
            {/* <p className="text-xl">{goal.nameGoal}</p> */}
            {/* <p className="text-neutral-300 text-sm">{goal.descriptionGoal}</p> */}
            <EditableText
              className="text-neutral-300 text-sm h-full"
              textValue={goal.descriptionGoal || ""}
              isEditing={isEditing}
            />

            {goal.goalSteps.length > 0 && (
              <p className="text-sm mt-auto">Etapas</p>
            )}
          </div>

          <div>
            {goal.reward && (
              <div className="flex flex-col text-center gap-2">
                <p className="text-sm ">Recompensa</p>
                <Link href={`/reward/${goal.reward.idReward}`}>
                  <div className="aspect-square relative  h-24 bg-neutral-500/20 hover:bg-neutral-300/20 cursor-pointer duration-75 rounded-md">
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
                </Link>
              </div>
            )}
          </div>
        </div>
        {goal.goalSteps.length > 0 && (
          <div className="goal-steps flex flex-col gap-2 ">
            {goal.goalSteps.map((step) => (
              <GoalCardSteps step={step} key={step.idGoalStep}></GoalCardSteps>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={() => setEditing((oldState) => !oldState)}
              className="p-2 bg-green-300/20 hover:bg-green-300/30 duration-75 rounded-md w-full"
            >
              Salvar Edições
            </button>
          ) : (
            <>
              <button
                className="p-2 w-full bg-red-300/20 hover:bg-red-300/30 duration-75 rounded-md"
                onClick={async () => {
                  await deleteGoal(goal.idGoal);
                }}
              >
                Remover
              </button>
              <button
                onClick={() => setEditing((oldState) => !oldState)}
                className="p-2 bg-neutral-500/20 hover:bg-neutral-500/30 duration-75 rounded-md"
              >
                Editar
              </button>
            </>
          )}

          <button className="h-[40px] p-2 aspect-square hover:bg-neutral-500/20 duration-75 rounded-md">
            ...
          </button>
        </div>
      </div>
    </div>
  );
};
export default GoalCard;
