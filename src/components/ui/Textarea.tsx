import { forwardRef, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, id, className = "", ...rest },
  ref,
) {
  const textareaId = id ?? label.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase();
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={textareaId} className="font-display text-lg text-arctis-white">
        {label}
      </label>
      <textarea
        ref={ref}
        id={textareaId}
        rows={4}
        className={`w-full resize-none rounded-2xl border-[1.5px] border-powder-blue-shade bg-transparent p-4 font-display text-lg text-arctis-white outline-none placeholder:text-arctis-white/50 transition-colors focus:border-powder-blue sm:text-2xl ${className}`}
        {...rest}
      />
    </div>
  );
});

export default Textarea;
