import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { buttonClassName, type ButtonVariant } from "./buttonStyles";

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  fullWidth?: boolean;
};

export default function ButtonLink({
  variant = "primary",
  icon,
  fullWidth = false,
  className = "",
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, fullWidth, className)} {...rest}>
      {children}
      {icon}
    </Link>
  );
}
