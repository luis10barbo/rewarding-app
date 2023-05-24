import { saveGoal, deleteAllGoals } from "@/app/server/db/goalsTable";
import { logoutServer } from "@/app/server/session/user";
import HeaderButton from "./HeaderButton";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const Header: React.FC<{ extraComponents?: React.ReactNode }> = ({
  extraComponents = <></>,
}) => {
  const { register, login, user } = useContext(UserContext);
  return (
    <header className="flex justify-center items-center gap-2 ">
      {extraComponents}

      {!user ? (
        <>
          <HeaderButton
            onClick={() => {
              register("luis10barbo", "teste");
            }}
          >
            registrar
          </HeaderButton>
          <HeaderButton
            onClick={() => {
              login("luis10barbo", "teste");
            }}
          >
            login
          </HeaderButton>
        </>
      ) : (
        <>
          <HeaderButton
            onClick={() => {
              logoutServer();
            }}
          >
            logout
          </HeaderButton>
          {/* <p>{user.nicknameUser}</p> */}

          {/* <p>R${user.balanceUser}</p> */}
        </>
      )}
    </header>
  );
};
export default Header;
