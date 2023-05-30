"use client";
import { Claims, getMyClaimsSV, unclaimClaimSV } from "@/server/db/claimTable";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

interface HistoryContextInterface {
  claims: Claims | undefined;
  unclaimClaim: (idClaim: string) => Promise<void>;
}
export const HistoryContext = createContext({} as HistoryContextInterface);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [claims, setClaims] = useState<Claims>();

  const { loadUser } = useContext(UserContext);

  async function getClaims() {
    const response = await getMyClaimsSV();
    if (response.error) return;

    setClaims(response.data);
  }

  async function unclaimClaim(idClaim: string) {
    await unclaimClaimSV(idClaim);
    await getClaims();
    await loadUser();
  }

  useEffect(() => {
    getClaims();
  }, []);
  return (
    <HistoryContext.Provider value={{ claims, unclaimClaim }}>
      {children}
    </HistoryContext.Provider>
  );
};
