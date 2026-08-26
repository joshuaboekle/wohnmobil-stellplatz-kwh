export type ButtonVariant = "primary" | "accent" | "light";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-royal-blue text-arctis-white",
  accent: "bg-lake-blue text-arctis-white",
  light: "bg-arctis-white text-royal-blue",
};

// Tap state: 16% dunklerer Farbton beim Drücken + leichtes "Reindrücken".
const tapClasses =
  "transition-[filter,transform] duration-100 active:brightness-[0.84] active:scale-[0.98]";

export function buttonClassName(
  variant: ButtonVariant = "primary",
  fullWidth = false,
  className = "",
) {
  return `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-display text-base sm:px-6 sm:py-4 sm:text-lg ${variantClasses[variant]} ${tapClasses} ${fullWidth ? "w-full" : ""} ${className}`;
}
