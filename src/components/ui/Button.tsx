import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClassName, type ButtonVariant } from "./buttonStyles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
};

export default function Button({
  variant = "primary",
  icon,
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type="button" className={buttonClassName(variant, fullWidth, className)} {...rest}>
      {children}
      {icon}
    </button>
  );
}
