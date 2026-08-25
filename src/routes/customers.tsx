import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AiNotice, AppLayout } from "@/components/AppLayout";
import { customers, zar } from "@/data/salon";

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customer Management — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Client profiles, booking history, purchases and AI-assisted rebooking and upsell insights for Azzuro Body & Skin.",
      },
      { property: "og:title", content: "Customer Management — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Know every client's history, preferences and next best treatment.",
      },
    ],
  }),
  component: Customers,
});

function Customers() {
  const [selectedId, setSelectedId] = useState(customers[0]!.id);
  const client = customers.find((c) => c.id === selectedId)!;

  return (
    <AppLayout eyebrow="Customer Management" title="Customers">
      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
        <div className="surface-card overflow-hidden">
          <h3 className="border-b border-border px-5 py-4 text-lg">Client List</h3>
          <ul className="divide-y divide-border">
            {customers.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setSelectedId(c.id)}
                  className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors ${
                    c.id === selectedId ? "bg-blush" : "hover:bg-muted"
                  }`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full gradient-luxe font-nav text-xs">
                    {c.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{c.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {c.visits} visits · {zar(c.spend)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="grid size-16 place-items-center rounded-full gradient-luxe font-display text-xl">
                {client.initials}
              </span>
              <div>
                <h2 className="text-2xl">{client.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {client.email} · {client.phone}
                </p>
              </div>
              <div className="ml-auto text-right">
                <span className="label-eyebrow">Lifetime Value</span>
                <p className="text-2xl text-rosegold">{zar(client.spend)}</p>
                <p className="text-xs text-muted-foreground">Last visit {client.lastVisit}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div>
                <span className="label-eyebrow">Booking History</span>
                <ul className="mt-3 space-y-2 text-sm">
                  {client.bookings.map((b) => (
                    <li key={b.date + b.service}>
                      {b.service}
                      <span className="block text-xs text-muted-foreground">{b.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label-eyebrow">Products Purchased</span>
                <ul className="mt-3 space-y-2 text-sm">
                  {client.purchases.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="label-eyebrow">Notes</span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{client.notes}</p>
              </div>
            </div>
          </div>

          <div className="surface-card p-6 lg:p-8">
            <span className="label-eyebrow">AI Customer Insights</span>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-muted/60 p-5">
                <h4 className="text-base">Suggested Treatments</h4>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {client.insights.treatments.map((t) => (
                    <li key={t}>• {t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-muted/60 p-5">
                <h4 className="text-base">Rebooking Reminder</h4>
                <p className="mt-2 text-sm text-muted-foreground">{client.insights.rebook}</p>
              </div>
              <div className="rounded-2xl bg-muted/60 p-5">
                <h4 className="text-base">Upsell Opportunity</h4>
                <p className="mt-2 text-sm text-muted-foreground">{client.insights.upsell}</p>
              </div>
            </div>
          </div>

          <AiNotice />
        </div>
      </div>
    </AppLayout>
  );
}
