"use client";
import { getUser } from "@/app/server/session/user";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  useEffect,
} from "react";

export type getUserResult = Awaited<ReturnType<typeof getUser>>;

interface UserContextInterface {
  user: getUserResult;
  setUser: Dispatch<SetStateAction<getUserResult>>;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<getUserResult | null>(null);

  function loadUser() {
    getUser();
    if (user) setUser(user);
  }

  useEffect(() => {
    if (!user) loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
