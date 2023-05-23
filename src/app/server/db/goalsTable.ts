"use server";

import db from "@/app/server/prisma";
import { Goal } from "@prisma/client";
import { getUser } from "../session/user";
import { AuthenticatedCall } from "../templates/callTemplates";

export async function getGoal(idGoal: Goal["idGoal"]) {
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
export type UniqueGoal = NonNullable<Awaited<ReturnType<typeof getGoal>>>;

export async function saveGoal(params: {
  nameGoal: string;
  descriptionGoal?: string;
  goalSteps: string[];
}) {
  new AuthenticatedCall().execute(async ({ user }) => {
    await db.goal.create({
      data: {
        completed: false,
        nameGoal: params.nameGoal,
        descriptionGoal: params.descriptionGoal,
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
export type AllGoals = NonNullable<Awaited<ReturnType<typeof getAllGoals>>>;

export async function getAllGoals() {
  return await db.goal.findMany({
    include: {
      goalSteps: true,
      reward: true,
    },
  });
}

export async function deleteAllGoals() {
  return await db.goal.deleteMany({ where: {} });
}
