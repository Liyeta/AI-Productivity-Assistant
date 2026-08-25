import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AiNotice, AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Manage salon details, trading hours, notification preferences and responsible AI settings for Azzuro Body & Skin.",
      },
      { property: "og:title", content: "Settings — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Salon profile, hours, notifications and AI preferences.",
      },
    ],
  }),
  component: Settings,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-rosegold focus:ring-2 focus:ring-rosegold/25";

function Settings() {
  const [toggles, setToggles] = useState({
    reminders: true,
    marketing: true,
    aiSuggestions: true,
  });

  return (
    <AppLayout eyebrow="Configuration" title="Settings">
      <div className="grid gap-6 xl:grid-cols-2">
        <section className="surface-card p-6 lg:p-8">
          <span className="label-eyebrow">Salon Profile</span>
          <div className="mt-4 space-y-4">
            <label className="block text-sm">
              Business Name
              <input className={fieldClass} defaultValue="Azzuro Body & Skin" />
            </label>
            <label className="block text-sm">
              Contact Email
              <input className={fieldClass} defaultValue="hello@azzurobodyandskin.co.za" />
            </label>
            <label className="block text-sm">
              Contact Number
              <input className={fieldClass} defaultValue="+27 11 555 0198" />
            </label>
            <label className="block text-sm">
              Trading Hours
              <input className={fieldClass} defaultValue="Mon–Sat 09:00 – 18:00" />
            </label>
          </div>
          <button
            onClick={() => toast.success("Salon profile saved")}
            className="mt-6 rounded-full bg-rosegold px-6 py-3 font-nav text-xs uppercase tracking-[0.16em] text-rosegold-foreground"
          >
            Save Changes
          </button>
        </section>

        <div className="space-y-6">
          <section className="surface-card p-6 lg:p-8">
            <span className="label-eyebrow">Notifications & AI</span>
            <div className="mt-4 space-y-3">
              {(
                [
                  ["reminders", "Automatic appointment reminders"],
                  ["marketing", "Promotional email campaigns"],
                  ["aiSuggestions", "AI treatment suggestions in client profiles"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setToggles((prev) => ({ ...prev, [key]: !prev[key] }))}
                  className="flex w-full items-center justify-between rounded-xl bg-muted/60 px-4 py-3 text-left text-sm"
                >
                  {label}
                  <span
                    className={`ml-4 flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors ${
                      toggles[key] ? "bg-rosegold" : "bg-border"
                    }`}
                  >
                    <span
                      className={`size-4 rounded-full bg-card transition-transform ${
                        toggles[key] ? "translate-x-5" : ""
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="surface-card p-6 lg:p-8">
            <span className="label-eyebrow">Payments</span>
            <p className="mt-3 text-sm text-muted-foreground">
              Card, EFT, PayFast and Ozow are enabled for in-salon and online retail checkout.
            </p>
          </section>

          <AiNotice />
        </div>
      </div>
    </AppLayout>
  );
}
