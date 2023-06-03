import HeaderButton from "./HeaderButton";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header: React.FC<{ extraComponents?: React.ReactNode }> = ({
  extraComponents = <></>,
}) => {
  const { register, login, user, logout } = useContext(UserContext);
  const navRouter = useRouter();
  return (
    <header className=" overflow-y-auto flex max-w-[100vw] min-h-[110px] items-center gap-2 pb-4 px-8">
      <Link href={"/me/goals"}>
        <HeaderButton>Goals</HeaderButton>
      </Link>
      <Link href={"/me/history"}>
        <HeaderButton>History</HeaderButton>
      </Link>
      <Link href={"/me/rewards"}>
        <HeaderButton>Rewards</HeaderButton>
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
        <div className="flex gap-2 bg-neutral-500/10 p-2 rounded-md items-center ml-auto">
          <p className="p-2">{user.nicknameUser}</p>
          <HeaderButton
            onClick={async () => {
              logout();
              void navRouter.push("/login");
            }}
          >
            logout
          </HeaderButton>

          <p className="bg-green-600/70 p-3 rounded-md text-sm">
            R${user.balanceUser.toFixed(2)}
          </p>
        </div>
      )}
    </header>
  );
};
export default Header;
