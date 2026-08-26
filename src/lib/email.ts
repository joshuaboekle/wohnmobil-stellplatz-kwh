export type BookingRequest = {
  vehicleType: string;
  length: string;
  width: string;
  moveInDate: string;
  message: string;
  name: string;
  email: string;
  phone: string;
};

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

// Testadresse während der Entwicklung -- Anfragen laufen hier auf,
// bis die echte Kontaktadresse feststeht.
export const BOOKING_TEST_RECIPIENT = "post@joshuaboekle.de";

export const isEmailConfigured = Boolean(ACCESS_KEY);

export async function sendBookingRequest(data: BookingRequest) {
  if (!isEmailConfigured) {
    throw new Error(
      "E-Mail-Versand ist noch nicht konfiguriert (VITE_WEB3FORMS_ACCESS_KEY fehlt in .env). Siehe .env.example.",
    );
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      to_email: BOOKING_TEST_RECIPIENT,
      subject: "Neue Stellplatz-Anfrage",
      vehicle_type: data.vehicleType,
      vehicle_length: data.length,
      vehicle_width: data.width,
      move_in_date: data.moveInDate,
      message: data.message,
      name: data.name,
      email: data.email,
      phone: data.phone,
    }),
  });

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.message ?? "Versand fehlgeschlagen.");
  }
}
