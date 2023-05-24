import { Goal } from "./GoalCard";
import { EditableText } from "./GoalEditableComponents";

export type GoalStep = Goal["goalSteps"][0];
const GoalCardSteps: React.FC<{ step: GoalStep; isEditing: boolean }> = ({
  step,
  isEditing,
}) => {
  return (
    <div className="bg-neutral-500/20 p-2 rounded-md">
      <div className={`step-${step.idGoalStep}`} key={step.idGoalStep}>
        <EditableText
          className="text-sm text-neutral-300"
          textValue={step.contentStep}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
};
export default GoalCardSteps;
