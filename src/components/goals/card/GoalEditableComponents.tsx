import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react";

export const EditableText: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    isEditing: boolean;
    textValue: string;
  }
> = (params) => {
  const { textValue, isEditing, ...htmlParams } = params;
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const editedText = useRef(textValue);

  useEffect(() => {
    editedText.current = textValue;
  }, [isEditing]);

  useEffect(() => {
    const paragraph = paragraphRef.current;
    if (!paragraph) return;

    // paragraph.addEventListener("")
  }, [paragraphRef]);

  return (
    <>
      {isEditing ? (
        <p
          {...htmlParams}
          contentEditable={true}
          className={`cursor-pointer outline-none bg-neutral-300/20 hover:bg-neutral-300/30 focus:border-neutral-400 border-transparent border  duration-75 rounded-md outline-2 p-1 ${params.className}`}
          suppressContentEditableWarning={true}
          ref={paragraphRef}
          onInput={(e) => {
            editedText.current =
              (e.target as HTMLParagraphElement).textContent || "";
          }}
        >
          {editedText.current}
        </p>
      ) : (
        <p
          {...htmlParams}
          className={`border-transparent border  ${htmlParams.className}`}
        >
          {params.textValue}
        </p>
      )}
    </>
  );
};
