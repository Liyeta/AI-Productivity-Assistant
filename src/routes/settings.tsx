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
            <span className="label-eyebrow">Spa Disclaimer &amp; Policy</span>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                All treatments at Azzuro Body &amp; Skin are wellness and beauty services. They are
                not medical procedures and do not diagnose, treat or cure any medical condition.
                Clients with medical conditions, allergies, skin sensitivities or who are pregnant
                must disclose this before treatment.
              </p>
              <p>
                <span className="font-medium text-foreground">Bookings &amp; cancellations:</span>{" "}
                please arrive 10 minutes early. Cancellations within 24 hours of the appointment, or
                no-shows, may be charged at 50% of the treatment value. Late arrivals may have their
                treatment time shortened.
              </p>
              <p>
                <span className="font-medium text-foreground">Results &amp; products:</span> results
                vary per individual and are not guaranteed. Retail products are non-refundable once
                opened. Patch tests are recommended for reactive skin.
              </p>
              <p>
                <span className="font-medium text-foreground">Privacy:</span> client details and
                treatment notes are kept confidential and used only for care, reminders and
                communication you have consented to.
              </p>
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
