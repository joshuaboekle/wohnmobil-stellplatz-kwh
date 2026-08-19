type VanIconProps = {
  className?: string;
};

// Platzhalter-Icon im Stil des Prototyps (blaues Wohnmobil).
// Sobald das echte CI-Icon vorliegt, hier einfach austauschen.
export default function VanIcon({ className = "" }: VanIconProps) {
  return (
    <svg
      viewBox="0 0 153 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="24" width="110" height="50" rx="10" fill="currentColor" />
      <path
        d="M111 40h20a10 10 0 0 1 9 5.6l7 14A10 10 0 0 1 152 68v6a4 4 0 0 1-4 4h-9"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="118" y="48" width="18" height="14" rx="2" fill="white" fillOpacity="0.35" />
      <circle cx="38" cy="80" r="12" fill="currentColor" />
      <circle cx="38" cy="80" r="4.5" fill="white" fillOpacity="0.6" />
      <circle cx="120" cy="80" r="12" fill="currentColor" />
      <circle cx="120" cy="80" r="4.5" fill="white" fillOpacity="0.6" />
      <rect x="14" y="34" width="26" height="20" rx="3" fill="white" fillOpacity="0.35" />
    </svg>
  );
}
