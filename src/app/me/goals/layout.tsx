"use client";
import { GoalsProvider } from "@/context/GoalsContext";

export default function RewardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GoalsProvider>{children}</GoalsProvider>;
}
