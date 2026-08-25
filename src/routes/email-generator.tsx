import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AiNotice, AppLayout } from "@/components/AppLayout";
import { generateEmail } from "@/lib/ai";

export const Route = createFileRoute("/email-generator")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Generate luxury client emails for confirmations, reminders, follow-ups, promotions and birthday offers in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "On-brand client communication drafted for you, ready to review and send.",
      },
    ],
  }),
  component: EmailGenerator,
});

const purposes = [
  "Appointment Confirmation",
  "Appointment Reminder",
  "Follow-Up",
  "Product Promotion",
  "Customer Appreciation",
  "Birthday Offer",
];
const tones = ["Professional", "Luxury", "Friendly", "Promotional"];

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-rosegold focus:ring-2 focus:ring-rosegold/25";

function EmailGenerator() {
  const [purpose, setPurpose] = useState(purposes[0]!);
  const [tone, setTone] = useState(tones[1]!);
  const [details, setDetails] = useState(
    "Sarah Williams — Hydrating Facial on 12 September at 14:00 with Sarah P.",
  );
  const [output, setOutput] = useState("");

  const generate = () => setOutput(generateEmail({ purpose, tone, details }));

  return (
    <AppLayout eyebrow="AI Assistance" title="Smart Email Generator">
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="surface-card space-y-5 p-6 lg:p-8">
          <label className="block text-sm">
            Purpose
            <select className={fieldClass} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
              {purposes.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>

          <div className="text-sm">
            Tone
            <div className="mt-2 flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-full px-4 py-2 font-nav text-xs tracking-wide transition-colors ${
                    tone === t
                      ? "bg-rosegold text-rosegold-foreground"
                      : "border border-border text-muted-foreground hover:bg-blush"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="block text-sm">
            Key Information
            <textarea
              rows={6}
              className={fieldClass}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Client name, treatment, date, time, offer details…"
            />
          </label>

          <button
            onClick={generate}
            className="w-full rounded-full bg-rosegold px-6 py-3.5 font-nav text-xs uppercase tracking-[0.18em] text-rosegold-foreground transition-opacity hover:opacity-90"
          >
            Generate Email
          </button>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6 lg:p-8">
            <span className="label-eyebrow">Generated Email</span>
            <pre className="mt-4 min-h-72 whitespace-pre-wrap rounded-2xl bg-muted/70 p-5 font-sans text-sm leading-relaxed">
              {output || "Choose a purpose and tone, then generate a draft to review."}
            </pre>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                disabled={!output}
                onClick={() => {
                  navigator.clipboard?.writeText(output);
                  toast.success("Email copied to clipboard");
                }}
                className="rounded-full border border-rosegold px-5 py-2.5 font-nav text-[11px] uppercase tracking-[0.14em] text-rosegold disabled:opacity-40"
              >
                Copy Email
              </button>
              <button
                onClick={generate}
                className="rounded-full border border-border px-5 py-2.5 font-nav text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                Regenerate
              </button>
              <button
                disabled={!output}
                onClick={() => toast.success("Email queued for sending")}
                className="rounded-full bg-rosegold px-5 py-2.5 font-nav text-[11px] uppercase tracking-[0.14em] text-rosegold-foreground disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
          <AiNotice />
        </div>
      </div>
    </AppLayout>
  );
}
