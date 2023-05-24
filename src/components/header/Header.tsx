import { logoutServer } from "@/server/session/user";
import HeaderButton from "./HeaderButton";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const Header: React.FC<{ extraComponents?: React.ReactNode }> = ({
  extraComponents = <></>,
}) => {
  const { register, login, user, logout } = useContext(UserContext);
  return (
    <header className="flex justify-center items-center gap-2 h-[66px] ">
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
