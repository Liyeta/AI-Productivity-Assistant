import slimSculptCream from "@/assets/product-slim-sculpt-cream.jpg";
import bodyContourGel from "@/assets/product-body-contour-gel.jpg";
import hydratingFacialSerum from "@/assets/product-hydrating-facial-serum.jpg";
import spaBodyOil from "@/assets/product-spa-body-oil.jpg";
import massageOilCollection from "@/assets/product-massage-oil-collection.jpg";
import antiCelluliteCream from "@/assets/product-anti-cellulite-cream.jpg";

export type ServiceCategory = {
  name: string;
  icon: string;
  blurb: string;
  items: { name: string; duration: string; price: number }[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Massage Services",
    icon: "💆",
    blurb: "Restorative bodywork tailored to tension, circulation and calm.",
    items: [
      { name: "Swedish Massage", duration: "60 min", price: 620 },
      { name: "Deep Tissue Massage", duration: "75 min", price: 780 },
      { name: "Hot Stone Massage", duration: "90 min", price: 890 },
      { name: "Aromatherapy Massage", duration: "60 min", price: 700 },
    ],
  },
  {
    name: "Facial Treatments",
    icon: "✨",
    blurb: "Clinical-grade facials for glow, clarity and skin longevity.",
    items: [
      { name: "Hydrating Facial", duration: "60 min", price: 650 },
      { name: "Anti-Aging Facial", duration: "75 min", price: 850 },
      { name: "Acne Treatment Facial", duration: "60 min", price: 690 },
      { name: "Brightening Facial", duration: "60 min", price: 720 },
    ],
  },
  {
    name: "Manicure Services",
    icon: "💅",
    blurb: "Precision nail care finished with luxury hand rituals.",
    items: [
      { name: "Classic Manicure", duration: "45 min", price: 280 },
      { name: "Gel Manicure", duration: "60 min", price: 380 },
      { name: "Luxury Spa Manicure", duration: "75 min", price: 480 },
    ],
  },
  {
    name: "Pedicure Services",
    icon: "🦶",
    blurb: "Soothing foot therapy from express polish to full spa ritual.",
    items: [
      { name: "Express Pedicure", duration: "30 min", price: 260 },
      { name: "Gel Pedicure", duration: "60 min", price: 420 },
      { name: "Luxury Spa Pedicure", duration: "80 min", price: 540 },
    ],
  },
  {
    name: "Waxing Services",
    icon: "🌿",
    blurb: "Gentle warm-wax hair removal with calming aftercare.",
    items: [
      { name: "Face Wax", duration: "20 min", price: 180 },
      { name: "Underarm Wax", duration: "20 min", price: 160 },
      { name: "Leg Wax", duration: "45 min", price: 340 },
      { name: "Full Body Wax", duration: "120 min", price: 980 },
    ],
  },
  {
    name: "Body Slimming",
    icon: "🌸",
    blurb: "Non-invasive contouring programmes with therapist guidance.",
    items: [
      { name: "Fat Reduction Consultation", duration: "30 min", price: 250 },
      { name: "Body Contouring", duration: "60 min", price: 950 },
      { name: "Cellulite Treatment", duration: "60 min", price: 780 },
      { name: "Slimming Packages", duration: "6 sessions", price: 4200 },
    ],
  },
];

export const bookingServices = [
  "Massage",
  "Facial",
  "Manicure",
  "Pedicure",
  "Waxing",
  "Body Slimming Consultation",
];

export const therapists = [
  "Naledi M. — Senior Body Therapist",
  "Sarah P. — Skin Specialist",
  "Chantelle R. — Nail Artist",
  "Zanele K. — Slimming Consultant",
  "Marié du T. — Massage Therapist",
];

export const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  tone: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "slim-sculpt-cream",
    image: slimSculptCream,
    name: "Slim Sculpt Cream",
    price: 399,
    description: "Firming daily cream with caffeine and marine botanicals.",
    tone: "from-blush to-beige",
  },
  {
    id: "body-contour-gel",
    image: bodyContourGel,
    name: "Body Contour Gel",
    price: 349,
    description: "Cooling gel that targets stubborn areas after treatment.",
    tone: "from-beige to-blush",
  },
  {
    id: "hydrating-facial-serum",
    image: hydratingFacialSerum,
    name: "Hydrating Facial Serum",
    price: 450,
    description: "Hyaluronic serum for plump, dewy, restored skin.",
    tone: "from-muted to-blush",
  },
  {
    id: "spa-body-oil",
    image: spaBodyOil,
    name: "Spa Body Oil",
    price: 299,
    description: "Silk-finish oil blended with rose and sweet almond.",
    tone: "from-beige to-muted",
  },
  {
    id: "massage-oil-collection",
    image: massageOilCollection,
    name: "Massage Oil Collection",
    price: 550,
    description: "Trio of therapeutic oils: relax, revive and recover.",
    tone: "from-blush to-muted",
  },
  {
    id: "anti-cellulite-cream",
    image: antiCelluliteCream,
    name: "Anti Cellulite Cream",
    price: 499,
    description: "Concentrated smoothing cream for visible texture change.",
    tone: "from-muted to-beige",
  },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  initials: string;
  lastVisit: string;
  spend: number;
  visits: number;
  bookings: { service: string; date: string }[];
  purchases: string[];
  notes: string;
  insights: { treatments: string[]; rebook: string; upsell: string };
};

export const customers: Customer[] = [
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    email: "sarah.williams@email.co.za",
    phone: "+27 82 445 1190",
    initials: "SW",
    lastVisit: "12 Aug 2026",
    spend: 8420,
    visits: 14,
    bookings: [
      { service: "Deep Tissue Massage", date: "12 Aug 2026" },
      { service: "Hydrating Facial", date: "28 Jul 2026" },
      { service: "Gel Manicure", date: "05 Jul 2026" },
    ],
    purchases: ["Hydrating Facial Serum", "Spa Body Oil"],
    notes: "Prefers low lighting and unscented products. Sensitive shoulders.",
    insights: {
      treatments: ["Aromatherapy Massage", "Brightening Facial"],
      rebook: "Due for a facial in 9 days — send reminder Friday.",
      upsell: "Serum refill likely finished; pair with Spa Body Oil bundle.",
    },
  },
  {
    id: "lerato-mokoena",
    name: "Lerato Mokoena",
    email: "lerato.m@email.co.za",
    phone: "+27 71 220 8834",
    initials: "LM",
    lastVisit: "18 Aug 2026",
    spend: 15600,
    visits: 22,
    bookings: [
      { service: "Body Contouring", date: "18 Aug 2026" },
      { service: "Cellulite Treatment", date: "04 Aug 2026" },
      { service: "Luxury Spa Pedicure", date: "21 Jul 2026" },
    ],
    purchases: ["Slim Sculpt Cream", "Anti Cellulite Cream"],
    notes: "On a 6-session slimming package, session 4 of 6 completed.",
    insights: {
      treatments: ["Slimming Packages", "Fat Reduction Consultation"],
      rebook: "Next package session should be booked within 10 days.",
      upsell: "Body Contour Gel supports at-home maintenance.",
    },
  },
  {
    id: "anika-patel",
    name: "Anika Patel",
    email: "anika.patel@email.co.za",
    phone: "+27 83 907 4412",
    initials: "AP",
    lastVisit: "02 Aug 2026",
    spend: 4980,
    visits: 7,
    bookings: [
      { service: "Acne Treatment Facial", date: "02 Aug 2026" },
      { service: "Face Wax", date: "02 Aug 2026" },
    ],
    purchases: ["Hydrating Facial Serum"],
    notes: "Reactive skin — patch test all new actives before treatment.",
    insights: {
      treatments: ["Brightening Facial", "Hydrating Facial"],
      rebook: "4-week acne protocol interval — reminder overdue.",
      upsell: "Recommend gentle serum top-up at next visit.",
    },
  },
  {
    id: "chloe-van-wyk",
    name: "Chloé van Wyk",
    email: "chloe.vw@email.co.za",
    phone: "+27 84 118 6602",
    initials: "CV",
    lastVisit: "20 Aug 2026",
    spend: 11250,
    visits: 18,
    bookings: [
      { service: "Hot Stone Massage", date: "20 Aug 2026" },
      { service: "Anti-Aging Facial", date: "06 Aug 2026" },
    ],
    purchases: ["Massage Oil Collection", "Spa Body Oil"],
    notes: "Books monthly on Saturday mornings. Gift-card purchaser.",
    insights: {
      treatments: ["Aromatherapy Massage", "Luxury Spa Manicure"],
      rebook: "Saturday 09:00 slot preferred — hold for September.",
      upsell: "Loyalty tier reached; offer 3-treatment wellness bundle.",
    },
  },
];

export const todaysBookings = [
  { time: "09:00", client: "Sarah Williams", service: "Deep Tissue Massage", therapist: "Naledi M.", status: "Confirmed" },
  { time: "10:30", client: "Anika Patel", service: "Acne Treatment Facial", therapist: "Sarah P.", status: "Confirmed" },
  { time: "12:00", client: "Chloé van Wyk", service: "Hot Stone Massage", therapist: "Marié du T.", status: "In treatment" },
  { time: "14:00", client: "Lerato Mokoena", service: "Body Contouring", therapist: "Zanele K.", status: "Pending" },
  { time: "15:30", client: "Thandi N.", service: "Gel Manicure", therapist: "Chantelle R.", status: "Confirmed" },
  { time: "16:30", client: "Beth Coetzee", service: "Brightening Facial", therapist: "Sarah P.", status: "Confirmed" },
];

export const monthlyBookings = [
  { month: "Mar", bookings: 218, revenue: 39200 },
  { month: "Apr", bookings: 241, revenue: 41800 },
  { month: "May", bookings: 236, revenue: 40950 },
  { month: "Jun", bookings: 268, revenue: 44600 },
  { month: "Jul", bookings: 279, revenue: 46300 },
  { month: "Aug", bookings: 296, revenue: 48500 },
];

export const serviceDemand = [
  { name: "Massage", share: 32 },
  { name: "Facials", share: 26 },
  { name: "Body Slimming", share: 18 },
  { name: "Nails", share: 15 },
  { name: "Waxing", share: 9 },
];

export const therapistPerformance = [
  { name: "Naledi M.", bookings: 78, rating: 4.9 },
  { name: "Sarah P.", bookings: 71, rating: 4.8 },
  { name: "Zanele K.", bookings: 64, rating: 4.9 },
  { name: "Chantelle R.", bookings: 58, rating: 4.7 },
  { name: "Marié du T.", bookings: 51, rating: 4.8 },
];

export const zar = (value: number) =>
  `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
