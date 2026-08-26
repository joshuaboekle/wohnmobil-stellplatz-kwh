type MapEmbedProps = {
  lat: number;
  lng: number;
  label: string;
  className?: string;
};

// Beispiel-Location (Kornwestheim) bis der echte Google-Maps-Eintrag für den
// Stellplatz existiert -- Koordinaten dann hier bzw. beim Aufruf ersetzen.
export default function MapEmbed({ lat, lng, label, className = "" }: MapEmbedProps) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  return (
    <iframe
      title={label}
      src={src}
      className={`h-[268px] w-full rounded-[32px] border-0 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
