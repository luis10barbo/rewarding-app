"use client";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function MeLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoadingUser, loadUser } = useContext(UserContext);
  const navRouter = useRouter();
  async function tryLoadingUser() {
    const result = await loadUser();
    console.log(result);
    if (!result) navRouter.push("/login");
  }
  useEffect(() => {
    if (user === null && !isLoadingUser) {
      tryLoadingUser();
    }
  }, [user]);
  return (
    <div className="/me py-4 w-full flex flex-col">
      {isLoadingUser ? <p>Loading user</p> : children}
    </div>
  );
}
