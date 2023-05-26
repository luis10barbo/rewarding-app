import HeaderButton from "./HeaderButton";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

const Header: React.FC<{ extraComponents?: React.ReactNode }> = ({
  extraComponents = <></>,
}) => {
  const { register, login, user, logout } = useContext(UserContext);
  return (
    <header className=" overflow-y-auto flex max-w-[100vw]  items-center gap-2 pb-4">
      <Link href={"/"}>
        <HeaderButton
          onClick={async () => {
            await login("luis10barbo", "teste");
          }}
        >
          Goals
        </HeaderButton>
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

          <p>Saldo: R${user.balanceUser}</p>
        </>
      )}
    </header>
  );
};
export default Header;
