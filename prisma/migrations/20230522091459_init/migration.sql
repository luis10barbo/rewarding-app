-- CreateTable
CREATE TABLE "Reward" (
    "idReward" TEXT NOT NULL,
    "nameReward" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Goal" (
    "idGoal" TEXT NOT NULL,
    "idReward" TEXT,
    "nameGoal" TEXT NOT NULL,
    "descriptionGoal" TEXT,
    CONSTRAINT "Goal_idReward_fkey" FOREIGN KEY ("idReward") REFERENCES "Reward" ("idReward") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GoalStep" (
    "idGoalStep" TEXT NOT NULL,
    "idGoal" TEXT NOT NULL,
    "contentStep" TEXT NOT NULL,
    CONSTRAINT "GoalStep_idGoal_fkey" FOREIGN KEY ("idGoal") REFERENCES "Goal" ("idGoal") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Reward_idReward_key" ON "Reward"("idReward");

-- CreateIndex
CREATE UNIQUE INDEX "Goal_idGoal_key" ON "Goal"("idGoal");

-- CreateIndex
CREATE UNIQUE INDEX "GoalStep_idGoalStep_key" ON "GoalStep"("idGoalStep");
