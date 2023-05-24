import { Goal } from "./GoalCard";

export type GoalStep = Goal["goalSteps"][0];
const GoalCardSteps: React.FC<{ step: GoalStep }> = ({ step }) => {
  return (
    <div className="bg-neutral-500/20 p-2 rounded-md">
      <div className={`step-${step.idGoalStep}`} key={step.idGoalStep}>
        <p className="text-sm text-neutral-300">{step.contentStep}</p>
      </div>
    </div>
  );
};
export default GoalCardSteps;
