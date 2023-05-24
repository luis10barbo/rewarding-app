import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const HeaderButton: React.FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { children: React.ReactNode }
> = (params) => {
  return (
    <button
      {...params}
      className="h-full w-fit py-2 px-4 rounded-md bg-neutral-500/20 hover:bg-neutral-500/30 duration-75 border border-transparent
      active:border-neutral-500/40 capitalize"
    >
      {params.children}
    </button>
  );
};

export default HeaderButton;
