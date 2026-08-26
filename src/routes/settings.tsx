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
          "Manage salon details, trading hours, spa policy, and the facial & body treatment consultation and waiver form for Azzuro Body & Skin.",
      },
      { property: "og:title", content: "Settings — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Salon profile, policy, and treatment consultation & waiver form.",
      },
    ],
  }),
  component: Settings,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-rosegold focus:ring-2 focus:ring-rosegold/25";

const facialContraindications = [
  "Active cold sores, herpes simplex or open skin lesions",
  "Recent chemical peel, laser or microneedling (within 4 weeks)",
  "Roaccutane / isotretinoin use in the last 6 months",
  "Active acne rosacea flare-up or severe inflamed acne",
  "Sunburn, windburn or recent excessive sun exposure",
  "Eczema, psoriasis or dermatitis in the treatment area",
  "Known allergy to fragrance, essential oils, AHAs or actives",
  "Botox or dermal fillers within the last 2 weeks",
  "Eye infections (conjunctivitis, styes) for eye-area work",
];

const bodyContraindications = [
  "Pregnancy or breastfeeding",
  "Heart conditions, pacemaker or metal implants in the area",
  "High or uncontrolled blood pressure",
  "Deep vein thrombosis, varicose veins or clotting disorders",
  "Diabetes with impaired sensation or healing",
  "Epilepsy or seizure disorders",
  "Cancer, current or recent chemotherapy / radiotherapy",
  "Kidney or liver disease",
  "Recent surgery, fractures or hernia in the treatment area",
  "Skin infections, fungal infections or open wounds",
  "Undiagnosed lumps, swelling or severe bruising",
  "Blood-thinning medication or immune-suppressant therapy",
  "Under 18 without written guardian consent",
];

type Answers = Record<string, boolean>;

function Settings() {
  const [facial, setFacial] = useState<Answers>({});
  const [body, setBody] = useState<Answers>({});
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState("");

  const flagged = [
    ...facialContraindications.filter((c) => facial[c]),
    ...bodyContraindications.filter((c) => body[c]),
  ];

  const submit = () => {
    if (!signature.trim()) {
      toast.error("Please type your full name as a signature");
      return;
    }
    if (!agreed) {
      toast.error("Please accept the waiver and indemnity to continue");
      return;
    }
    toast.success(
      flagged.length
        ? `Consultation submitted — ${flagged.length} item(s) flagged for therapist review`
        : "Consultation form and waiver submitted",
    );
  };

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
