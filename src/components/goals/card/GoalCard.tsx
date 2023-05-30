import { Goals } from "@/server/db/goalsTable";
import GoalCardSteps from "./GoalCardStep";
import { useContext, useState } from "react";
import { EditableText } from "./GoalEditableComponents";
import Link from "next/link";
import { GoalsContext } from "@/context/GoalsContext";

export type Goal = Goals[0];
const GoalCard: React.FC<{ goal: Goal }> = ({ goal }) => {
  const [isEditing, setEditing] = useState(false);
  const [isOptionsOpen, setOptionsOpen] = useState(false);

  const { deleteGoal, markAsCompleted } = useContext(GoalsContext);
  return (
    <div
      key={goal.idGoal}
      className="flex gap-2 min-w-[300px] w-full max-w-3xl min-h-[6rem] bg-gradient-to-tr bg-neutral-900  p-4 text-white rounded-xl"
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
        </div>
        {goal.goalSteps.length > 0 && (
          <div className="goal-steps flex flex-col gap-2 ">
            {goal.goalSteps.map((step) => (
              <GoalCardSteps
                step={step}
                isEditing={isEditing}
                key={step.idGoalStep}
              ></GoalCardSteps>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={() => setEditing((oldState) => !oldState)}
              className="p-2 bg-green-300/20 hover:bg-green-300/30 duration-75 rounded-md w-full"
            >
              Salvar Edições
            </button>
          )}
          <button
            className="bg-black/70 w-full rounded-md text-sm hover:bg-black/40 text-white"
            onClick={() => {
              markAsCompleted(goal.idGoal);
            }}
          >
            Completar (+R$ {goal.reward.toFixed(2)})
          </button>
          <div className="ml-auto relative">
            <div
              className={`flex duration-75 flex-col gap-2 right-0 absolute bottom-12 bg-neutral-500/20 backdrop-blur-sm p-2 rounded-md text-sm ${
                isOptionsOpen ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <button
                className="ml-auto w-full p-2 bg-red-300/20 hover:bg-red-300/30 duration-75 rounded-md "
                onClick={async () => {
                  await deleteGoal(goal.idGoal);
                }}
              >
                Remover
              </button>
              <button
                onClick={() => setEditing((oldState) => !oldState)}
                className="p-2 w-full bg-neutral-500/20 hover:bg-neutral-500/30 duration-75 rounded-md"
              >
                Editar
              </button>
            </div>
            <button
              className="h-[40px] p-2 aspect-square hover:bg-neutral-500/20 duration-75 rounded-md"
              onClick={() => setOptionsOpen((o) => !o)}
            >
              ...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GoalCard;
