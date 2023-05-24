import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const EditableText: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    isEditing: boolean;
    textValue: string;
  }
> = (params) => {
  return (
    <>
      {params.isEditing ? (
        <div
          {...params}
          contentEditable={true}
          className={`cursor-pointer outline-none bg-neutral-300/20 hover:bg-neutral-300/30 focus:border-neutral-400 border border-transparent duration-75 rounded-md outline-2 p-1 ${params.className}`}
        >
          {params.textValue}
        </div>
      ) : (
        <p className="" {...params}>
          {params.textValue}
        </p>
      )}
    </>
  );
};
