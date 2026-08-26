type SelectChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function SelectChip({ label, selected, onClick }: SelectChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-[70px] items-center justify-center rounded-2xl border-[1.5px] border-powder-blue-shade p-3 text-center font-display text-lg leading-tight break-words text-arctis-white transition-[filter,transform,background-color,border-color] duration-100 focus-visible:border-powder-blue focus-visible:outline-none active:brightness-[0.84] active:scale-[0.98] sm:text-2xl ${
        selected ? "bg-lake-blue" : "bg-transparent"
      }`}
    >
      {label}
    </button>
  );
}
