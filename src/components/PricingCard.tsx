type PricingCardProps = {
  title: string;
  price: string;
  highlighted?: boolean;
};

export default function PricingCard({ title, price, highlighted = false }: PricingCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-6 rounded-sm px-6 py-12 text-center ${
        highlighted ? "bg-brand-yellow" : "bg-brand-mist"
      }`}
    >
      <div className="flex flex-col items-center font-display text-brand-blue">
        <p className="text-3xl font-bold sm:text-4xl">{title}</p>
        <p className="mt-1 text-2xl sm:text-3xl">{price}</p>
      </div>
      <button
        type="button"
        className="rounded-sm bg-brand-mist px-6 py-3 font-display text-lg text-brand-blue shadow-[0_14px_12px_rgba(0,0,0,0.05),0_0_2px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        Stellplatz buchen →
      </button>
    </div>
  );
}
