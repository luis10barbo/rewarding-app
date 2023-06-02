"use client";

import { loginServer, registerServer } from "@/server/session/user";
import { createError } from "@/server/templates/callTemplates";
import { useRouter } from "next/navigation";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";

const Login: React.FC = () => {
  const [isRegistering, setRegistering] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<ReturnType<typeof createError>>();

  const navRouter = useRouter();

  return (
    <>
      {isRegistering ? (
        <div className="flex w-full min-h-screen justify-center items-center ">
          <div className="flex flex-col gap-2 bg-neutral-500/20 p-6 rounded-xl items-center">
            <p className="text-red-400">Error: {error?.message}.</p>
            <Input
              placeholder="Type your nickname"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
            <Input
              placeholder="Type your password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              className="p-2 border border-neutral-500 rounded-md hover:border-neutral-400 duration-75 w-full"
              onClick={async () => {
                const result = await registerServer(nickname, password);
                if (!result.error) return void navRouter.push("/me");
                setError(result);
              }}
            >
              Register
            </button>

            <p
              className="text-white cursor-pointer w-fit"
              onClick={() => {
                setRegistering(false);
              }}
            >
              Login into an existing account
            </p>
          </div>
        </div>
      ) : (
        <div className="flex w-full min-h-screen justify-center items-center">
          <div className="flex flex-col gap-2 bg-neutral-500/20 p-6 rounded-xl">
            <Input
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              placeholder="Type your nickname"
            />
            <Input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Type your password"
              type="password"
            />
            <button
              onClick={async () => {
                const result = await loginServer(nickname, password);
                if (result) void navRouter.push("/me");
              }}
              className="p-2 border border-neutral-500 rounded-md hover:border-neutral-400 duration-75"
            >
              Login
            </button>
            <p className="text-neutral-400">
              Doesnt have an account?{" "}
              <span
                className="text-white cursor-pointer"
                onClick={() => {
                  setRegistering(true);
                }}
              >
                register here
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return (
    <input
      type="text"
      {...props}
      className="bg-transparent border border-neutral-500 p-2 rounded-md hover:border-neutral-400 duration-75 outline-none"
    />
  );
};
