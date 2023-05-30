"use server";

import db from "../prisma";
import { AuthenticatedCall } from "../templates/callTemplates";

export type Rewards = NonNullable<Awaited<ReturnType<typeof getMyRewardsSV>>>;
export type Reward = Extract<Rewards, { error: false }>["data"][0];

export async function getMyRewardsSV() {
  return new AuthenticatedCall().execute(async ({ user }) => {
    return db.reward.findMany({ where: { idOwner: user.idUser } });
  });
}

export async function getMyRewardSV(idReward: string) {
  return new AuthenticatedCall().execute(async ({ user }) => {
    return db.reward.findFirst({
      where: { idOwner: user.idUser, idReward: idReward },
    });
  });
}

export async function getReward(idReward: string) {
  return db.reward.findUnique({ where: { idReward } });
}

export async function claimRewardSV(idReward: string) {
  return new AuthenticatedCall().execute(async ({ user }) => {
    const reward = await getReward(idReward);
    if (!reward) return;

    await db.user.update({
      where: { idUser: user.idUser },
      data: { balanceUser: { decrement: reward.valueReward } },
    });
  });
}

export async function removeRewardSV(idReward: string) {
  return new AuthenticatedCall().execute(async ({ user }) => {
    const reward = await db.reward.findFirst({
      where: { idReward, idOwner: user.idUser },
    });
    if (!reward) return;

    return db.reward.delete({ where: { idReward: reward.idReward } });
  });
}
