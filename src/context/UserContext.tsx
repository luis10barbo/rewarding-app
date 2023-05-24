"use client";
import {
  getUser,
  loginServer,
  logoutServer,
  registerServer,
} from "@/app/server/session/user";
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
  login: (nickname: string, password: string) => void;
  register: (nickname: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<getUserResult | null>(null);

  async function loadUser() {
    const user = await getUser();
    if (user) setUser(user);
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
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
