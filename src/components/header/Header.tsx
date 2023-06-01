import HeaderButton from "./HeaderButton";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

const Header: React.FC<{ extraComponents?: React.ReactNode }> = ({
  extraComponents = <></>,
}) => {
  const { register, login, user, logout } = useContext(UserContext);
  return (
    <header className=" overflow-y-auto flex max-w-[100vw] mx-auto items-center gap-2 pb-4">
      <Link href={"/me/goals"}>
        <HeaderButton
          onClick={async () => {
            await login("luis10barbo", "teste");
          }}
        >
          Goals
        </HeaderButton>
      </Link>
      <Link href={"/me/history"}>
        <HeaderButton>History</HeaderButton>
      </Link>
      <Link href={"/me/rewards"}>
        <HeaderButton
          onClick={async () => {
            await login("luis10barbo", "teste");
          }}
        >
          Rewards
        </HeaderButton>
      </Link>
      {extraComponents}
      {!user ? (
        <>
          <HeaderButton
            onClick={async () => {
              await register("luis10barbo", "teste");
            }}
          >
            registrar
          </HeaderButton>
          <HeaderButton
            onClick={async () => {
              await login("luis10barbo", "teste");
            }}
          >
            login
          </HeaderButton>
        </>
      ) : (
        <>
          <HeaderButton
            onClick={async () => {
              await logout();
            }}
          >
            logout
          </HeaderButton>

          <p className="bg-green-600/70 p-3 rounded-md text-sm">
            R${user.balanceUser.toFixed(2)}
          </p>
        </>
      )}
    </header>
  );
};
export default Header;
