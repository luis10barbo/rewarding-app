import {
  Goals,
  deleteGoalSV,
  saveGoalSV,
  getMyGoalsSV,
  deleteAllGoalsSV,
  markGoalCompletedSV,
} from "@/server/db/goalsTable";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserContext } from "./UserContext";

interface GoalsContextInterface {
  goals: Goals | null;
  setGoals: Dispatch<SetStateAction<Goals | null>>;
  getMyGoals: () => Promise<void>;
  deleteAllGoals: () => Promise<void>;
  deleteGoal: (idGoal: Parameters<typeof deleteGoalSV>[0]) => Promise<void>;
  saveGoal: (idGoal: Parameters<typeof saveGoalSV>[0]) => Promise<void>;
  markAsCompleted: (idGoal: string) => Promise<void>;
}

export const GoalsContext = createContext({} as GoalsContextInterface);

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [goals, setGoals] = useState<Goals | null>(null);
  const { loadUser } = useContext(UserContext);

  async function getMyGoals() {
    const goals = await getMyGoalsSV();
    if (!goals.error) setGoals(goals.data);
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

  async function markAsCompleted(params: string) {
    await markGoalCompletedSV(params);
    await getMyGoals();
    await loadUser();
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
        markAsCompleted,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
};
