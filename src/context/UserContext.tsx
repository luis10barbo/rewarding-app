"use client";

import {
  getUser,
  loginServer,
  logoutServer,
  registerServer,
} from "@/server/session/user";
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
  login: (nickname: string, password: string) => Promise<void>;
  register: (nickname: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<getUserResult>;
  isLoadingUser: boolean;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<getUserResult>(null);
  const [isLoadingUser, setLoadingUser] = useState(true);

  async function loadUser() {
    setLoadingUser(true);

    const user = await getUser();
    setUser(user);

    setLoadingUser(false);
    return user;
  }

  async function login(nickname: string, password: string) {
    await loginServer(nickname, password);
    loadUser();
  }

  async function register(nickname: string, password: string) {
    await registerServer(nickname, password);
    loadUser();
  }

  async function logout() {
    await logoutServer();
    loadUser();
  }

  useEffect(() => {
    if (!user) loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        logout,
        loadUser,
        isLoadingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
