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

      <section className="surface-card mt-6 p-6 lg:p-8">
        <span className="label-eyebrow">Facial &amp; Body Treatments Consultation</span>
        <h2 className="mt-2 text-2xl">Client Consultation &amp; Waiver Form</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Please complete this form before your first treatment and whenever your health or
          medication changes. All information is kept confidential and helps your therapist choose
          safe, effective treatments.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className="block text-sm">
            Full Name
            <input className={fieldClass} placeholder="Name and surname" />
          </label>
          <label className="block text-sm">
            Date of Birth
            <input type="date" className={fieldClass} />
          </label>
          <label className="block text-sm">
            Contact Number
            <input className={fieldClass} placeholder="+27 ..." />
          </label>
          <label className="block text-sm">
            Email Address
            <input type="email" className={fieldClass} placeholder="you@email.co.za" />
          </label>
          <label className="block text-sm">
            Emergency Contact
            <input className={fieldClass} placeholder="Name &amp; number" />
          </label>
          <label className="block text-sm">
            Treatment Requested
            <input className={fieldClass} placeholder="e.g. Anti-Aging Facial, Body Contouring" />
          </label>
          <label className="block text-sm md:col-span-2 xl:col-span-3">
            Current Medication, Supplements &amp; Allergies
            <textarea rows={3} className={fieldClass} placeholder="List all, or write None" />
          </label>
          <label className="block text-sm md:col-span-2 xl:col-span-3">
            Skin / Body Concerns &amp; Treatment Goals
            <textarea rows={3} className={fieldClass} placeholder="What would you like to improve?" />
          </label>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-muted/60 p-5">
            <h3 className="text-lg">Facial Treatment Contraindications</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Tick any that apply to you now or recently.
            </p>
            <ul className="mt-4 space-y-3">
              {facialContraindications.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={!!facial[c]}
                      onChange={(e) => setFacial((p) => ({ ...p, [c]: e.target.checked }))}
                      className="mt-1 size-4 shrink-0 accent-rosegold"
                    />
                    <span>{c}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-muted/60 p-5">
            <h3 className="text-lg">Body Treatment &amp; Slimming Contraindications</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Tick any that apply to you now or recently.
            </p>
            <ul className="mt-4 space-y-3">
              {bodyContraindications.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={!!body[c]}
                      onChange={(e) => setBody((p) => ({ ...p, [c]: e.target.checked }))}
                      className="mt-1 size-4 shrink-0 accent-rosegold"
                    />
                    <span>{c}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {flagged.length > 0 && (
          <div className="mt-6 rounded-2xl border border-rosegold/40 bg-blush p-5 text-sm">
            <span className="label-eyebrow">Therapist Review Required</span>
            <p className="mt-2 text-muted-foreground">
              You have flagged {flagged.length} item(s). Your therapist will discuss these with you
              and may adapt, postpone or decline the treatment, or request a doctor&apos;s note.
            </p>
          </div>
        )}

        <div className="mt-10 rounded-2xl border border-border p-5 lg:p-6">
          <span className="label-eyebrow">Waiver, Consent &amp; Indemnity</span>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              I confirm that the information provided above is true and complete, and I will inform
              Azzuro Body &amp; Skin of any change to my health, medication or pregnancy status
              before further treatments.
            </p>
            <p>
              I understand that facial and body treatments are beauty and wellness services, not
              medical procedures, and that they do not diagnose, treat or cure any medical
              condition.
            </p>
            <p>
              I accept that normal reactions may include redness, warmth, mild swelling, tingling,
              temporary bruising, breakouts or skin flaking, and that results vary per individual
              and are not guaranteed.
            </p>
            <p>
              I consent to the treatment discussed, including patch testing where recommended, and I
              indemnify Azzuro Body &amp; Skin, its owners and therapists against any loss or injury
              arising from information I have withheld or misrepresented.
            </p>
            <p>
              I have read and accept the salon booking, cancellation, product and privacy policy.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              Signature — type your full name
              <input
                className={fieldClass}
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                maxLength={100}
                placeholder="Full name"
              />
            </label>
            <label className="block text-sm">
              Date
              <input type="date" className={fieldClass} />
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 size-4 shrink-0 accent-rosegold"
            />
            <span>
              I have read, understood and agree to the consultation declaration, waiver and
              indemnity above.
            </span>
          </label>

          <button
            onClick={submit}
            className="mt-6 rounded-full bg-rosegold px-6 py-3 font-nav text-xs uppercase tracking-[0.16em] text-rosegold-foreground"
          >
            Submit Consultation &amp; Waiver
          </button>
        </div>
      </section>
    </AppLayout>

  );
}
