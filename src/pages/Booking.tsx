import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, CheckCircle2 } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import SelectChip from "../components/ui/SelectChip";
import { priceFeatures } from "../data/priceFeatures";

const vehicleTypes = [
  "Wohnmobil",
  "Wohnwagen",
  "Anhänger",
  "Bootsanhänger",
  "Motorrad",
  "Oldtimer",
  "Transporter",
  "Sonstiges",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Lang genug, um die Bestätigung lesen zu können, aber kurz genug, um nicht
// unnötig auf der Erfolgsseite hängen zu bleiben.
const SUCCESS_REDIRECT_DELAY_MS = 3000;

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

// Eigener, schlanker Header statt der globalen NavBar -- entspricht dem
// Figma-Prototyp, der auf dem Formular-Screen nur Zurück-Pfeil + Titel zeigt,
// kein Logo/CTA.
function BookingHeader() {
  return (
    <header className="sticky top-0 z-20 bg-royal-blue/90 py-4 backdrop-blur sm:py-6">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-3 sm:px-10">
        <Link
          to="/"
          aria-label="Zurück zur Startseite"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[1.5px] border-powder-blue-shade text-arctis-white transition-[filter,transform] duration-100 active:brightness-[0.84] active:scale-[0.98] sm:h-16 sm:w-16"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
        </Link>
        <span className="font-display text-body-lg text-arctis-white">
          Stellplatz anfragen
        </span>
      </div>
    </header>
  );
}

export default function Booking() {
  const navigate = useNavigate();
  const [infoOpen, setInfoOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailToast, setEmailToast] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validateEmail(value: string) {
    const valid = EMAIL_PATTERN.test(value);
    if (!valid) {
      setEmailError("Bitte gib eine gültige E-Mail-Adresse ein.");
      setEmailToast(true);
      window.setTimeout(() => setEmailToast(false), 3000);
    } else {
      setEmailError(null);
    }
    return valid;
  }

  function validateDate(value: string) {
    if (!value) {
      setDateError("Bitte wähle ein Mietbeginn-Datum.");
      return false;
    }
    if (value < todayIso()) {
      setDateError("Der Mietbeginn kann nicht in der Vergangenheit liegen.");
      return false;
    }
    setDateError(null);
    return true;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const emailValid = validateEmail(email);
    const dateValid = validateDate(moveInDate);
    if (!emailValid || !dateValid || !vehicleType || !name) return;

    setStatus("sending");
    setSubmitError(null);
    try {
      const { sendBookingRequest } = await import("../lib/email");
      await sendBookingRequest({
        vehicleType,
        length,
        width,
        moveInDate,
        message,
        name,
        email,
        phone,
      });
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setSubmitError(error instanceof Error ? error.message : "Anfrage konnte nicht gesendet werden.");
    }
  }

  useEffect(() => {
    if (status !== "sent") return;
    const timer = window.setTimeout(() => navigate("/"), SUCCESS_REDIRECT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [status, navigate]);

  if (status === "sent") {
    return (
      <div className="flex min-h-screen flex-col bg-royal-blue">
        <NavBar showCta={false} />
        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-3 py-24 text-center">
          <CheckCircle2 className="h-14 w-14 text-lake-blue sm:h-16 sm:w-16" aria-hidden="true" />
          <h1 className="font-display text-h1 text-arctis-white">
            Anfrage gesendet.
          </h1>
          <p className="font-display text-body-lg text-arctis-white">
            Wir melden uns bald bei Ihnen.
          </p>
          <p className="font-display text-body-sm text-arctis-white/60">
            Du wirst gleich automatisch zur Startseite weitergeleitet.
          </p>
          <Link
            to="/"
            className="font-display text-body-sm text-lake-blue underline underline-offset-2"
          >
            Zur Startseite
          </Link>
        </main>
        <Footer variant="dark" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-royal-blue">
      <BookingHeader />

      <main className="mx-auto w-full max-w-md px-3 py-8 sm:px-10 lg:max-w-5xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 lg:flex-row lg:items-start" noValidate>
          <div className="flex flex-col gap-6 pb-8 lg:w-[400px] lg:shrink-0 lg:fixed lg:top-36 lg:left-[calc(50%-32rem+2.5rem)] lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pb-0">
            <h1 className="font-display text-h1 text-arctis-white">
              Interesse an einem Stellplatz?
            </h1>

            <div className="flex flex-col gap-6 rounded-[32px] bg-arctis-white px-4 pt-6 pb-4 sm:px-6 sm:pt-8">
              <div className="flex flex-col text-royal-blue">
                <div className="flex items-baseline justify-between gap-2 text-[32px] leading-[1.1] sm:text-[44px] sm:leading-[50px]">
                  <p className="font-display">Stellplatz</p>
                  <p className="font-display font-medium whitespace-nowrap">85 €</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-base text-royal-blue/60 sm:text-lg">pro Monat</p>
                  <span className="rounded-[4px] bg-lake-blue px-2 py-0.5 font-display text-xs font-medium text-arctis-white sm:text-sm">
                    inkl. Mwst.
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setInfoOpen((prev) => !prev)}
                  aria-expanded={infoOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 font-display text-lg text-lake-blue sm:text-xl"
                >
                  <span className="text-left">
                    {infoOpen ? "Weniger Infos anzeigen" : "Alle Infos einblenden"}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-6 sm:w-6 ${
                      infoOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: infoOpen ? "1fr" : "0fr" }}
                >
                  <ul className="flex flex-col gap-4 overflow-hidden pt-4">
                    {priceFeatures.map(({ icon: Icon, label }) => (
                      <li key={label} className="flex items-start gap-2.5">
                        <Icon className="mt-0.5 h-6 w-6 shrink-0 text-royal-blue" aria-hidden="true" />
                        <span className="font-display text-lg text-royal-blue sm:text-xl">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 lg:max-w-[560px] lg:ml-[464px]">
            <div className="flex flex-col gap-3 py-8 lg:pt-0">
              <p className="font-display text-body-lg text-arctis-white">
                Welches Fahrzeug möchten Sie abstellen?*
              </p>
              <div className="grid grid-cols-2 gap-4">
                {vehicleTypes.map((type) => (
                  <SelectChip
                    key={type}
                    label={type}
                    selected={vehicleType === type}
                    onClick={() => setVehicleType(type)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 py-8">
              <p className="font-display text-body-lg text-arctis-white">
                Wie groß ist ihr Fahrzeug?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Länge"
                  type="number"
                  min={0}
                  step="0.1"
                  placeholder="0m"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <Input
                  label="Breite"
                  type="number"
                  min={0}
                  step="0.1"
                  placeholder="0m"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 py-8">
              <Input
                label="Ab wann möchten sie mieten?*"
                type="date"
                icon={<Calendar className="h-6 w-6" aria-hidden="true" />}
                className="[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                min={todayIso()}
                value={moveInDate}
                onChange={(e) => {
                  setMoveInDate(e.target.value);
                  if (dateError) validateDate(e.target.value);
                }}
                onBlur={(e) => validateDate(e.target.value)}
                error={dateError ?? undefined}
                required
              />
              <p className="font-display text-body-sm text-lake-blue">
                Neueröffnung: Ab dem 01.12.2026 können Sie ihr Fahrzeug bei uns abstellen.
              </p>
            </div>

            <div className="py-8">
              <Textarea
                label="Möchten Sie uns noch etwas sagen?"
                placeholder="Nachricht hinterlassen"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-6 py-8">
              <Input
                label="Name*"
                placeholder="Vor- und Nachname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="E-Mail Adresse*"
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                error={emailError ?? undefined}
                required
              />
              <Input
                label="Telefonnummer"
                type="tel"
                placeholder="Telefonnummer"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="font-display text-body-lg text-arctis-white">
                Senden Sie uns einfach eine unverbindliche Anfrage.
                <br />
                <br />
                Wir melden uns anschließend persönlich bei Ihnen zurück.
              </p>
            </div>

            {submitError && (
              <p className="mb-4 font-display text-body text-red-300">{submitError}</p>
            )}

            <Button
              type="submit"
              variant="light"
              fullWidth
              disabled={status === "sending"}
              className="!text-lg sm:!text-xl"
              icon={<ArrowRight className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />}
            >
              {status === "sending" ? "Wird gesendet…" : "Stellplatz anfragen"}
            </Button>
          </div>
        </form>
      </main>

      <Footer variant="dark" />

      {emailToast && (
        <div
          role="alert"
          className="fixed inset-x-0 bottom-6 z-30 mx-auto w-fit rounded-full bg-royal-blue px-6 py-3 font-display text-body-sm text-arctis-white shadow-lg"
        >
          Bitte gib eine gültige E-Mail-Adresse ein.
        </div>
      )}
    </div>
  );
}
