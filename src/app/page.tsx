"use client";

import { useEffect, useState } from "react";
import {
  AllGoals,
  deleteAllGoals,
  getAllGoals,
  saveGoal,
} from "./server/db/goalsTable";
import { getUser, login, logout, register } from "./server/session/user";
import { User } from "@prisma/client";
import { UserProvider } from "@/context/UserContext";

export default function Home() {
  return (
    <UserProvider>
      <Home />
    </UserProvider>
  );
}
