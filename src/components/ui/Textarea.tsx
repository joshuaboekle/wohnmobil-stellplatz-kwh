import { forwardRef, useEffect, useRef, type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

function resize(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, id, className = "", value, onChange, ...rest },
  ref,
) {
  const textareaId = id ?? label.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase();
  const innerRef = useRef<HTMLTextAreaElement | null>(null);

  // Wächst mit dem Inhalt mit, statt eine feste Höhe mit Scrollbalken zu
  // haben -- auch nötig, wenn sich der Wert von außen ändert (z. B. Reset).
  useEffect(() => {
    resize(innerRef.current);
  }, [value]);

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={textareaId} className="font-display text-lg text-arctis-white">
        {label}
      </label>
      <textarea
        ref={(node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        id={textareaId}
        rows={4}
        className={`w-full resize-none overflow-hidden rounded-2xl border-[1.5px] border-powder-blue-shade bg-transparent p-4 font-display text-lg text-arctis-white outline-none placeholder:text-arctis-white/50 transition-colors focus:border-powder-blue sm:text-2xl ${className}`}
        value={value}
        onChange={(e) => {
          resize(e.currentTarget);
          onChange?.(e);
        }}
        {...rest}
      />
    </div>
  );
});

export default Textarea;
