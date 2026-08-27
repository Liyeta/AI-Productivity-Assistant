import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { AiNotice, AppLayout } from "@/components/AppLayout";
import { bookingServices } from "@/data/salon";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Client Profile & Consultation — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Complete the facial and body treatment consultation form, review all contraindications and sign the treatment waiver and indemnity.",
      },
      { property: "og:title", content: "Client Profile & Consultation — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Consultation, contraindication screening and waiver for facial and body treatments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

const fieldClass =
  "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-rosegold focus:ring-2 focus:ring-rosegold/25";

const facialContraindications = [
  "Active acne breakout, open lesions or broken skin",
  "Active cold sores, herpes simplex or viral infection",
  "Bacterial or fungal skin infection (e.g. impetigo, ringworm)",
  "Roaccutane / isotretinoin use in the last 6 months",
  "Recent chemical peel, laser, microneedling or IPL (within 4 weeks)",
  "Recent facial surgery, fillers or Botox (within 2 weeks)",
  "Eczema, psoriasis, rosacea or dermatitis on the treatment area",
  "Sunburn, windburn or recent excessive sun exposure",
  "Known allergies to essential oils, fragrance, latex or actives",
  "Hyperpigmentation disorders or melasma under treatment",
  "Retinol, AHA/BHA or prescription actives used in the last 3 days",
  "Undiagnosed lumps, moles or skin changes",
];

const bodyContraindications = [
  "Pregnancy or breastfeeding",
  "Heart condition, pacemaker or metal implants",
  "High or low blood pressure (uncontrolled)",
  "Diabetes (type 1 or type 2)",
  "Epilepsy or seizure disorder",
  "Cancer, current or in remission (within 5 years)",
  "Deep vein thrombosis, thrombosis history or varicose veins",
  "Kidney, liver or thyroid disorder",
  "Blood-thinning or immunosuppressant medication",
  "Recent surgery, fracture or injury (within 3 months)",
  "Hernia in or near the treatment area",
  "Active infection, fever or acute inflammation",
  "Autoimmune condition or lymphatic disorder",
  "Numbness or loss of skin sensation in the treatment area",
];

function Checklist({
  title,
  items,
  checked,
  onToggle,
}: {
  title: string;
  items: string[];
  checked: Record<string, boolean>;
  onToggle: (item: string) => void;
}) {
  return (
    <div className="surface-card p-6 lg:p-8">
      <span className="label-eyebrow">Contraindications</span>
      <h3 className="mt-1 text-lg">{title}</h3>
      <div className="mt-4 space-y-2.5">
        {items.map((item) => (
          <label key={item} className="flex items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={!!checked[item]}
              onChange={() => onToggle(item)}
              className="mt-0.5 size-4 shrink-0 rounded border-input accent-rosegold"
            />
            <span className="text-muted-foreground">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ProfilePage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    emergency: "",
    treatment: bookingServices[0]!,
    medication: "",
    concerns: "",
    signature: "",
  });
  const [agreed, setAgreed] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggle = (item: string) =>
    setChecked((c) => ({ ...c, [item]: !c[item] }));

  const flagged = Object.entries(checked)
    .filter(([, v]) => v)
    .map(([k]) => k);

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Please complete name, phone and email.");
      return;
    }
    if (!agreed || !form.signature.trim()) {
      toast.error("Please sign and accept the waiver and indemnity.");
      return;
    }
    toast.success(
      flagged.length
        ? "Consultation submitted — flagged for therapist review before treatment."
        : "Consultation and waiver submitted successfully.",
    );
  };

  return (
    <AppLayout eyebrow="Client Profile" title="Facial & Body Treatments Consultation">
      <div className="space-y-6">
        <div className="surface-card p-6 lg:p-8">
          <span className="label-eyebrow">Step 1</span>
          <h3 className="mt-1 text-lg">Client Information</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              Full name
              <input
                className={fieldClass}
                maxLength={100}
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
                placeholder="Full name"
              />
            </label>
            <label className="block text-sm">
              Date of birth
              <input
                type="date"
                className={fieldClass}
                value={form.dob}
                onChange={(e) => set("dob")(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              Phone
              <input
                className={fieldClass}
                maxLength={30}
                value={form.phone}
                onChange={(e) => set("phone")(e.target.value)}
                placeholder="+27 82 000 0000"
              />
            </label>
            <label className="block text-sm">
              Email
              <input
                type="email"
                className={fieldClass}
                maxLength={255}
                value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="you@email.co.za"
              />
            </label>
            <label className="block text-sm">
              Emergency contact
              <input
                className={fieldClass}
                maxLength={120}
                value={form.emergency}
                onChange={(e) => set("emergency")(e.target.value)}
                placeholder="Name and number"
              />
            </label>
            <label className="block text-sm">
              Requested treatment
              <select
                className={fieldClass}
                value={form.treatment}
                onChange={(e) => set("treatment")(e.target.value)}
              >
                {bookingServices.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm sm:col-span-2">
              Current medication or supplements
              <textarea
                rows={2}
                maxLength={500}
                className={fieldClass}
                value={form.medication}
                onChange={(e) => set("medication")(e.target.value)}
                placeholder="List anything the therapist should know"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              Skin or body concerns and goals
              <textarea
                rows={3}
                maxLength={1000}
                className={fieldClass}
                value={form.concerns}
                onChange={(e) => set("concerns")(e.target.value)}
                placeholder="Sensitivity, pigmentation, tension, contouring goals…"
              />
            </label>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Checklist
            title="Facial Treatment Contraindications"
            items={facialContraindications}
            checked={checked}
            onToggle={toggle}
          />
          <Checklist
            title="Body & Slimming Contraindications"
            items={bodyContraindications}
            checked={checked}
            onToggle={toggle}
          />
        </div>

        {flagged.length > 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-rosegold/40 bg-blush/60 px-5 py-4 text-sm text-blush-foreground">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <div>
              <p className="font-nav text-[12px] uppercase tracking-[0.18em]">
                Therapist review required
              </p>
              <p className="mt-2 leading-relaxed">
                {flagged.length} contraindication{flagged.length > 1 ? "s" : ""} selected. A
                qualified therapist must confirm treatment suitability, and a patch test or medical
                clearance may be required before any service is performed.
              </p>
            </div>
          </div>
        )}

        <div className="surface-card p-6 lg:p-8">
          <span className="label-eyebrow">Step 3</span>
          <h3 className="mt-1 text-lg">Waiver, Consent & Indemnity</h3>
          <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-muted-foreground">
            <p>
              I confirm that the information provided above is complete and accurate to the best of
              my knowledge, and I will inform my therapist of any change to my health, medication or
              skin condition before each treatment.
            </p>
            <p>
              I understand that facial and body treatments offered at Azzuro Body & Skin are
              cosmetic and wellness services, not medical treatments, and that no diagnosis,
              prescription or guarantee of results is provided.
            </p>
            <p>
              I accept that normal reactions may include redness, warmth, mild swelling, tingling,
              temporary breakouts, tenderness or bruising, and that individual results vary.
            </p>
            <p>
              I consent to a patch test where recommended, and I accept responsibility for
              withholding relevant health information. I indemnify Azzuro Body & Skin, its owners
              and therapists against any loss, injury or reaction arising from undisclosed
              conditions or failure to follow aftercare instructions.
            </p>
            <p>
              I consent to my personal and treatment information being stored securely and used only
              for treatment planning and salon communication, in line with applicable privacy and
              data protection regulations.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              Signature (type full name)
              <input
                className={fieldClass}
                maxLength={100}
                value={form.signature}
                onChange={(e) => set("signature")(e.target.value)}
                placeholder="Type your full name"
              />
            </label>
            <div className="text-sm">
              Date
              <p className={`${fieldClass} text-muted-foreground`}>
                {new Date().toLocaleDateString("en-ZA", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-input accent-rosegold"
            />
            <span className="text-muted-foreground">
              I have read, understood and agree to the consultation declaration, waiver and
              indemnity above.
            </span>
          </label>

          <button
            onClick={submit}
            className="mt-6 w-full rounded-xl bg-rosegold px-5 py-3 font-nav text-[13px] uppercase tracking-[0.18em] text-blush-foreground shadow-soft transition-opacity hover:opacity-90 sm:w-auto"
          >
            Submit consultation & waiver
          </button>
        </div>

        <AiNotice />
      </div>
    </AppLayout>
  );
}
