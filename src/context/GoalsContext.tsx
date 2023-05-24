import {
  getMyGoalsSV,
  saveGoalSV,
  type Goals,
  deleteGoalSV,
  deleteAllGoalsSV,
} from "@/app/server/db/goalsTable";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface GoalsContextInterface {
  goals: Goals | null;
  setGoals: Dispatch<SetStateAction<Goals | null>>;
  getMyGoals: () => Promise<void>;
  deleteAllGoals: () => Promise<void>;
  deleteGoal: (idGoal: Parameters<typeof deleteGoalSV>[0]) => Promise<void>;
  saveGoal: (idGoal: Parameters<typeof saveGoalSV>[0]) => Promise<void>;
}

export const GoalsContext = createContext({} as GoalsContextInterface);

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [goals, setGoals] = useState<Goals | null>(null);

  async function getMyGoals() {
    setGoals(await getMyGoalsSV());
  }

  async function deleteAllGoals() {
    await deleteAllGoalsSV();
    await getMyGoals();
  }

  async function deleteGoal(idGoal: Parameters<typeof deleteGoalSV>[0]) {
    await deleteGoalSV(idGoal);
    await getMyGoals();
  }

  async function saveGoal(params: Parameters<typeof saveGoalSV>[0]) {
    await saveGoalSV(params);
    await getMyGoals();
  }

  useEffect(() => {
    getMyGoals();
  }, []);

  return (
    <GoalsContext.Provider
      value={{
        goals,
        setGoals,
        deleteAllGoals,
        deleteGoal,
        saveGoal,
        getMyGoals,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
