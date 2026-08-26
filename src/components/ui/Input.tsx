import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  icon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, icon, id, className = "", ...rest },
  ref,
) {
  const inputId = id ?? label.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase();
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={inputId} className="font-display text-lg text-arctis-white">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-arctis-white/70">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`h-[70px] w-full rounded-2xl border-[1.5px] bg-transparent p-4 font-display text-lg text-arctis-white outline-none placeholder:text-arctis-white/50 transition-colors focus:border-powder-blue sm:text-2xl ${
            icon ? "pl-12" : ""
          } ${error ? "border-red-400" : "border-powder-blue-shade"} ${className}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
