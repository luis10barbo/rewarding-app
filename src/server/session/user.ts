"use server";

import db from "../prisma";
import { hash, genSalt } from "bcrypt";
import { getSessionCookie } from "../cookies";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { createError, createSuccess } from "../templates/callTemplates";
import { Prisma, User } from "@prisma/client";

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
    where: { nicknameUser: nickname },
  });
  if (!user) return false;
  if ((await hash(password, user.salt)) !== user.passwordUser) return false;

  await db.session.update({
    where: { idSession: await getSessionCookie() },
    data: { user: { connect: { idUser: user.idUser } } },
  });
  return true;
}

export async function logoutServer() {
  await db.session.update({
    where: { idSession: await getSessionCookie() },
    data: { user: { disconnect: true } },
  });
}

export async function registerServer(nickname: string, password: string) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  try {
    const user = await db.user.create({
      data: {
        balanceUser: 0,
        nicknameUser: nickname,
        passwordUser: hashedPassword,
        salt,
      },
    });

    await db.session.update({
      where: { idSession: await getSessionCookie() },
      data: {
        user: {
          connect: {
            idUser: user.idUser,
          },
        },
      },
    });
    return createSuccess(undefined);
  } catch (e) {
    console.log(e);
    if (
      !(e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
    )
      return createError("Unknown error has ocourred");

    const target = (e.meta as { target: string[] })["target"][0] as keyof User;
    switch (target) {
      case "nicknameUser":
        return createError(`User ${nickname} already exists`);
      default:
        return createError(`${target} already exists.`);
    }
  }
}
