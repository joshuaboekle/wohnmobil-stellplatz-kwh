import { ImageIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

type PlaceholderBoxProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  children?: ReactNode;
};

export default function PlaceholderBox({
  label,
  className = "",
  children,
  ...rest
}: PlaceholderBoxProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[32px] bg-[#d9d9d9] text-royal-blue/50 ${className}`}
      {...rest}
    >
      {children ?? (
        <>
          <ImageIcon className="h-8 w-8" aria-hidden="true" />
          {label && <p className="font-display text-sm">{label}</p>}
        </>
      )}
      {children && label && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-xs text-royal-blue/50">
          {label}
        </p>
      )}
    </div>
  );
}
