"use client";
import { NextPage } from "next";
import GoalsPage from "./goals/page";
import { GoalsProvider } from "@/context/GoalsContext";

const MePage: NextPage = () => {
  return (
    <GoalsProvider>
      <GoalsPage />
    </GoalsProvider>
  );
};
export default MePage;
