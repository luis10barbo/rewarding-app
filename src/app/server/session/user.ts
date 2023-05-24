"use server";

import db from "../prisma";
import { getSessionCookie } from "../cookies";

export async function getSession() {
  const sessionId = await getSessionCookie();
  const session = await db.session.findUnique({
    where: { idSession: sessionId },
    include: { user: true },
  });
  if (!session) {
    const session = await db.session.create({
      data: { idSession: sessionId },
      include: { user: true },
    });
    return session;
  }
  return session;
}

export async function getUser() {
  const session = await getSession();
  if (!session) return null;

  return session.user;
}

export async function loginServer(nickname: string, password: string) {
  const user = await db.user.findFirst({
    where: { nicknameUser: nickname, passwordUser: password },
  });
  if (!user) return;

  await db.session.update({
    where: { idSession: await getSessionCookie() },
    data: { user: { connect: { idUser: user.idUser } } },
  });
}

export async function logoutServer() {
  await db.session.update({
    where: { idSession: await getSessionCookie() },
    data: { user: { disconnect: true } },
  });
}

export async function registerServer(nickname: string, password: string) {
  console.log(nickname, password);

  await db.session.update({
    where: { idSession: await getSessionCookie() },
    data: {
      user: {
        create: {
          balanceUser: 0,
          nicknameUser: nickname,
          passwordUser: password,
        },
      },
    },
  });
}
