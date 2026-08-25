// Local assistant generators. These compose deterministic, on-brand copy for
// the demo experience — no external model calls.

export const AI_DISCLAIMER =
  "AI-generated suggestions are not medical advice. Treatment suitability must be confirmed by a qualified beauty professional.";

const toneOpeners: Record<string, string> = {
  Professional: "Thank you for choosing Azzuro Body & Skin.",
  Luxury: "It is our pleasure to welcome you into the Azzuro sanctuary.",
  Friendly: "We are so happy to hear from you!",
  Promotional: "Something beautiful is waiting for you at Azzuro Body & Skin.",
};

const purposeSubjects: Record<string, string> = {
  "Appointment Confirmation": "Your Azzuro Appointment Is Confirmed",
  "Appointment Reminder": "A Gentle Reminder About Your Treatment",
  "Follow-Up": "How Is Your Skin Feeling After Your Treatment?",
  "Product Promotion": "Your Luxury Skincare Ritual, Now 15% Off",
  "Customer Appreciation": "A Thank You From Azzuro Body & Skin",
  "Birthday Offer": "Happy Birthday — A Gift From Azzuro",
};

const purposeBodies: Record<string, string> = {
  "Appointment Confirmation":
    "We are delighted to confirm your booking. Please arrive 10 minutes early so we can prepare your treatment room and complete a short wellness check.",
  "Appointment Reminder":
    "This is a gentle reminder of your upcoming appointment. If you need to move your time, simply reply to this email and our team will assist.",
  "Follow-Up":
    "We hope you are still glowing after your recent visit. Your therapist has noted a few aftercare steps to help your results last longer.",
  "Product Promotion":
    "Our most-loved retail range is available in salon and online this month, hand-selected by our therapists to extend your in-salon results at home.",
  "Customer Appreciation":
    "Your loyalty means a great deal to us. As a thank you, your next visit includes a complimentary hand and arm ritual.",
  "Birthday Offer":
    "To celebrate your birthday, enjoy 20% off any treatment of your choice during your birthday month, along with a small gift on arrival.",
};

export function generateEmail(input: {
  purpose: string;
  tone: string;
  details: string;
}) {
  const subject = purposeSubjects[input.purpose] ?? "A Note From Azzuro Body & Skin";
  const opener = toneOpeners[input.tone] ?? toneOpeners["Professional"];
  const detail = input.details.trim();

  return [
    `Subject: ${subject}`,
    "",
    "Dear Valued Client,",
    "",
    opener,
    "",
    purposeBodies[input.purpose] ?? purposeBodies["Follow-Up"],
    detail ? `\n${detail}` : "",
    "",
    input.tone === "Promotional"
      ? "Reply to this email or book online to secure your place."
      : "We look forward to welcoming you.",
    "",
    "Warm regards,",
    "Azzuro Body & Skin",
    "Luxury treatments designed to restore confidence, wellness and beauty.",
  ]
    .filter((line) => line !== "")
    .join("\n")
    .replace(/\n(?=(Dear|Warm|Subject))/g, "\n\n");
}

export type ResearchReport = {
  summary: string;
  trends: { title: string; detail: string }[];
  opportunities: string[];
  products: string[];
};

export function generateResearch(topic: string, depth: string): ResearchReport {
  const subject = topic.trim() || "Beauty industry outlook";
  const depthNote =
    depth === "Quick Summary"
      ? "High-level scan of current signals."
      : depth === "Deep Analysis"
        ? "Extended analysis covering demand signals, pricing posture and retail attachment."
        : "Balanced report covering demand, positioning and retail impact.";

  return {
    summary: `${subject}: the market is moving from single treatments toward outcome-led programmes. ${depthNote} Clients increasingly research treatments before booking and expect measurable, gradual results supported by home-care products.`,
    trends: [
      {
        title: "Wellness Beauty",
        detail:
          "Treatments framed around stress relief and recovery outperform purely cosmetic framing, especially for massage bookings.",
      },
      {
        title: "Skin Longevity",
        detail:
          "Prevention-led facials and consistent protocols are replacing one-off anti-ageing appointments.",
      },
      {
        title: "Body Sculpting",
        detail:
          "Non-invasive contouring continues to grow, with packages preferred over single sessions.",
      },
      {
        title: "AI Consultations",
        detail:
          "Guided pre-booking questionnaires improve treatment matching and reduce no-shows.",
      },
    ],
    opportunities: [
      "Bundle facials into 3-session skin longevity programmes with a fixed monthly price.",
      "Promote massage as a stress-recovery service in weekday off-peak hours.",
      "Introduce a pre-booking consultation flow that recommends therapist and treatment.",
      "Convert slimming consultations into packages with progress tracking at each visit.",
    ],
    products: [
      "Hydrating Facial Serum — pairs with every facial protocol",
      "Slim Sculpt Cream — home maintenance for contouring clients",
      "Anti Cellulite Cream — attach to cellulite treatment series",
      "Massage Oil Collection — strong gifting and retail margin",
    ],
  };
}

const chatRules: { match: RegExp; reply: string }[] = [
  {
    match: /acne|breakout|pimple|congest/i,
    reply:
      "For active breakouts and congestion, our Acne Treatment Facial is the best starting point. It combines deep cleansing with a calming mask to reduce inflammation. Between visits, a lightweight hydrating serum helps keep the barrier balanced.",
  },
  {
    match: /stress|anxious|tense|relax|sleep/i,
    reply:
      "For stress and tension we recommend the Aromatherapy Massage for full-body calm, or the Hot Stone Massage if you carry tightness in the shoulders and back. Many clients book a 60-minute session every three to four weeks.",
  },
  {
    match: /slim|cellulite|contour|weight|tummy|fat/i,
    reply:
      "Start with a Fat Reduction Consultation so a therapist can assess suitability and build a plan. Body Contouring and Cellulite Treatment work best as a package, supported at home by Slim Sculpt Cream or Anti Cellulite Cream.",
  },
  {
    match: /dry|dull|glow|dehydrat|pigment|bright/i,
    reply:
      "A Hydrating Facial restores moisture immediately, while the Brightening Facial targets dullness and uneven tone over a short series. Our Hydrating Facial Serum extends those results between appointments.",
  },
  {
    match: /wrinkle|aging|ageing|fine line|mature/i,
    reply:
      "The Anti-Aging Facial focuses on firmness and fine lines using targeted actives and facial massage. A monthly rhythm gives the most visible change, paired with daily serum use.",
  },
  {
    match: /wax|hair removal/i,
    reply:
      "We offer face, underarm, leg and full body waxing with a soothing post-wax treatment. Please avoid retinoids and strong exfoliants for 48 hours before your appointment.",
  },
  {
    match: /nail|manicure|pedicure|gel/i,
    reply:
      "Our Gel Manicure lasts around two to three weeks, and the Luxury Spa Manicure adds an exfoliation and massage ritual. For feet, the Luxury Spa Pedicure is our most restorative option.",
  },
  {
    match: /price|cost|how much/i,
    reply:
      "Treatments range from R160 for waxing to R950 for body contouring, and our slimming packages start at R4,200 for six sessions. The Services page lists every treatment with duration and price.",
  },
  {
    match: /pregnan|medical|condition|medication/i,
    reply:
      "Thank you for sharing that. Some treatments need to be adapted, so a therapist consultation is required before booking. Please mention it in your booking notes and we will plan a safe alternative.",
  },
];

export function beautyChatReply(question: string) {
  const rule = chatRules.find((r) => r.match.test(question));
  const body =
    rule?.reply ??
    "Thank you for your question. Based on what you have shared, a personalised consultation is the best next step — our therapists will assess your skin or body concern and recommend a treatment plan, along with any products that support it at home.";
  return `${body}\n\nA consultation with one of our therapists is recommended before treatment.`;
}
