import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AiNotice, AppLayout } from "@/components/AppLayout";
import { bookingServices, therapists, timeSlots, todaysBookings } from "@/data/salon";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "Online Booking — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Book massages, facials, nails, waxing and body slimming treatments at Azzuro Body & Skin with instant confirmation.",
      },
      { property: "og:title", content: "Online Booking — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Choose your treatment, therapist and time slot in a few taps.",
      },
    ],
  }),
  component: Bookings,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-shadow focus:border-rosegold focus:ring-2 focus:ring-rosegold/25";

function Bookings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: bookingServices[0]!,
    therapist: therapists[0]!,
    date: "2026-09-12",
    time: "14:00",
    notes: "",
  });
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const date = new Date(form.date + "T00:00:00").toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setConfirmation(
      [
        "Booking Confirmed",
        "",
        `Client: ${form.name || "Guest"}`,
        `Service: ${form.service}`,
        `Therapist: ${form.therapist.split(" — ")[0]}`,
        `Date: ${date}`,
        `Time: ${form.time}`,
        form.notes.trim() ? `Notes: ${form.notes.trim()}` : "",
        "",
        `A confirmation email has been sent${form.email ? ` to ${form.email}` : ""}.`,
      ]
        .filter((line, i, arr) => !(line === "" && arr[i - 1] === ""))
        .join("\n"),
    );
  };

  return (
    <AppLayout eyebrow="Online Booking System" title="Bookings">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <form onSubmit={submit} className="surface-card space-y-6 p-6 lg:p-8">
          <div>
            <span className="label-eyebrow">Customer Details</span>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                Full Name
                <input
                  required
                  className={fieldClass}
                  value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  placeholder="Sarah Williams"
                />
              </label>
              <label className="block text-sm">
                Email Address
                <input
                  required
                  type="email"
                  className={fieldClass}
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                  placeholder="sarah@email.co.za"
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                Contact Number
                <input
                  required
                  className={fieldClass}
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                  placeholder="+27 82 000 0000"
                />
              </label>
            </div>
          </div>

          <div>
            <span className="label-eyebrow">Treatment</span>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                Select Service
                <select
                  className={fieldClass}
                  value={form.service}
                  onChange={(e) => set("service")(e.target.value)}
                >
                  {bookingServices.map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Select Therapist
                <select
                  className={fieldClass}
                  value={form.therapist}
                  onChange={(e) => set("therapist")(e.target.value)}
                >
                  {therapists.map((therapist) => (
                    <option key={therapist}>{therapist}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                Date
                <input
                  type="date"
                  className={fieldClass}
                  value={form.date}
                  onChange={(e) => set("date")(e.target.value)}
                />
              </label>
              <div className="text-sm">
                Time Slot
                <div className="mt-2 flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => set("time")(slot)}
                      className={`rounded-full px-4 py-2 font-nav text-xs tracking-wide transition-colors ${
                        form.time === slot
                          ? "bg-rosegold text-rosegold-foreground"
                          : "border border-border bg-card text-muted-foreground hover:bg-blush"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <label className="block text-sm">
            Notes — special requests
            <textarea
              rows={3}
              className={fieldClass}
              value={form.notes}
              onChange={(e) => set("notes")(e.target.value)}
              placeholder="Pressure preference, allergies, room preference…"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-rosegold px-6 py-3.5 font-nav text-xs uppercase tracking-[0.18em] text-rosegold-foreground transition-opacity hover:opacity-90"
          >
            Book Appointment
          </button>
        </form>

        <div className="space-y-6">
          <div className="surface-card p-6 lg:p-8">
            <span className="label-eyebrow">Booking Confirmation</span>
            <pre className="mt-4 min-h-56 whitespace-pre-wrap rounded-2xl bg-muted/70 p-5 font-sans text-sm leading-relaxed">
              {confirmation ??
                "Complete the form to generate a confirmation for the client and send it by email."}
            </pre>
          </div>

          <div className="surface-card overflow-hidden">
            <h3 className="border-b border-border px-6 py-5 text-lg">Today's Slots</h3>
            <ul className="divide-y divide-border text-sm">
              {todaysBookings.map((booking) => (
                <li key={booking.time} className="flex items-center gap-3 px-6 py-3">
                  <span className="font-nav w-14 text-rosegold">{booking.time}</span>
                  <span className="truncate">{booking.service}</span>
                  <span className="ml-auto truncate text-muted-foreground">{booking.status}</span>
                </li>
              ))}
            </ul>
          </div>

          <AiNotice />
        </div>
      </div>
    </AppLayout>
  );
}
