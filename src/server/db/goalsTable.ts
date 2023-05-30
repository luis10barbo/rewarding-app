"use server";
import { Goal } from "@prisma/client";
import { AuthenticatedCall } from "../templates/callTemplates";
import db from "../prisma";

export async function getGoalSV(idGoal: Goal["idGoal"]) {
  return db.goal.findUnique({
    where: {
      idGoal,
    },
    include: {
      goalSteps: true,
      reward: true,
      user: true,
    },
  });
}
export type UniqueGoal = NonNullable<Awaited<ReturnType<typeof getGoalSV>>>;

export async function saveGoalSV(params: {
  nameGoal: string;
  descriptionGoal?: string;
  goalSteps: string[];
  reward: {
    nameReward: string;
    valueReward: number;
  };
}) {
  new AuthenticatedCall().execute(async ({ user }) => {
    await db.goal.create({
      data: {
        completed: false,
        nameGoal: params.nameGoal,
        descriptionGoal: params.descriptionGoal,
        reward: {
          create: {
            nameReward: params.reward.nameReward,
            valueReward: params.reward.valueReward,
            user: {
              connect: {
                idUser: user.idUser,
              },
            },
          },
        },
        goalSteps: {
          create: params.goalSteps.map((step) => {
            return { completed: false, contentStep: step };
          }),
        },
        user: {
          connect: {
            idUser: user.idUser,
          },
        },
      },
    });
  });
}
export type Goals = NonNullable<Awaited<ReturnType<typeof getAllGoalsSV>>>;

export async function getAllGoalsSV() {
  return await db.goal.findMany({
    include: {
      goalSteps: true,
      reward: true,
    },
  });
}

export async function getMyGoalsSV() {
  return await new AuthenticatedCall().execute(async ({ user }) => {
    return await db.goal.findMany({
      where: { user: { idUser: user.idUser } },
      include: {
        goalSteps: true,
        reward: true,
      },
    });
  });
}

export async function deleteAllGoalsSV() {
  return await db.goal.deleteMany({ where: {} });
}

export async function deleteGoalSV(idGoal: string) {
  return await db.goal.delete({ where: { idGoal } });
}

export async function markGoalCompletedSV(idGoal: string) {
  return new AuthenticatedCall().execute(async ({ user }) => {
    const goal = await db.goal.findFirst({
      where: { idGoal, idOwner: user.idUser },
    });
    if (!goal) return;

    const result = await db.goal.update({
      where: { idGoal: goal.idGoal },
      data: {
        claim: {
          create: {
            owner: { connect: { idUser: goal.idOwner } },
            valueClaim: goal.reward,
          },
        },
      },
    });
    await db.user.update({
      where: { idUser: user.idUser },
      data: { balanceUser: { increment: result.reward } },
    });
    return result;
  });
}

export async function markGoalUncompletedSV(idGoal: string) {
  return new AuthenticatedCall().execute(async ({ user }) => {
    const goal = await db.goal.findFirst({
      where: { idGoal, idOwner: user.idUser },
    });
    if (!goal) return;

    const result = await db.goal.update({
      where: { idGoal: goal.idGoal },
      data: {
        claim: { disconnect: true },
      },
    });
    await db.user.update({
      where: { idUser: user.idUser },
      data: { balanceUser: { increment: result.reward } },
    });
    return result;
  });
}
