"use server";
import db from "../prisma";
import { AuthenticatedCall, createError } from "../templates/callTemplates";

export type Claims = Extract<
  Awaited<ReturnType<typeof getMyClaimsSV>>,
  { error: false }
>["data"];

export async function getMyClaimsSV() {
  return new AuthenticatedCall().execute(async ({ user }) => {
    return await db.claim.findMany({
      where: { idOwner: user.idUser },
      include: { goal: true },
    });
  });
}

export async function unclaimClaimSV(idClaim: string) {
  return new AuthenticatedCall().execute(async ({ user }) => {
    const claim = await db.claim.findFirst({
      where: { idClaim: idClaim, idOwner: user.idUser },
    });
    if (!claim) return;
    await db.claim.delete({ where: { idClaim: claim.idClaim } });
    await db.user.update({
      where: { idUser: claim.idOwner },
      data: { balanceUser: { decrement: claim.valueClaim } },
    });
  });
}
