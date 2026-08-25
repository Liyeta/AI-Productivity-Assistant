import { createFileRoute, Link } from "@tanstack/react-router";
import { AiNotice, AppLayout } from "@/components/AppLayout";
import { todaysBookings, zar } from "@/data/salon";
import heroImage from "@/assets/spa-hero.jpg";
import { CalendarPlus, UserPlus, Mail, Gift, Bot } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Azzuro Body & Skin — Luxury Spa Dashboard" },
      {
        name: "description",
        content:
          "Manage bookings, retail sales, clients and AI beauty tools for Azzuro Body & Skin from one luxury dashboard.",
      },
      { property: "og:title", content: "Azzuro Body & Skin — Luxury Spa Dashboard" },
      {
        property: "og:description",
        content:
          "Bookings, retail, client insights and AI beauty assistance for Azzuro Body & Skin.",
      },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Today's Bookings", value: "24", note: "6 still to arrive" },
  { label: "Monthly Revenue", value: zar(48500), note: "+4.7% vs July" },
  { label: "Products Sold", value: "182", note: "Retail attach 41%" },
  { label: "Returning Clients", value: "78%", note: "Retention holding" },
];

const quickActions = [
  { label: "New Booking", to: "/bookings", icon: CalendarPlus },
  { label: "Add Customer", to: "/customers", icon: UserPlus },
  { label: "Generate Email", to: "/email-generator", icon: Mail },
  { label: "Create Promotion", to: "/email-generator", icon: Gift },
  { label: "AI Consultation", to: "/chat", icon: Bot },
] as const;

function Dashboard() {
  return (
    <AppLayout eyebrow="Overview" title="Dashboard">
      <div className="space-y-8">
        <section className="surface-card overflow-hidden lg:grid lg:grid-cols-[1.15fr_1fr]">
          <div className="p-8 lg:p-10">
            <span className="label-eyebrow">Welcome back, Lee</span>
            <h2 className="mt-3 text-3xl leading-tight lg:text-4xl">
              Luxury treatments designed to restore confidence, wellness and beauty.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Your salon day at a glance — bookings, therapist load, retail movement and AI-assisted
              client communication, all in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/bookings"
                className="rounded-full bg-rosegold px-6 py-3 font-nav text-xs uppercase tracking-[0.16em] text-rosegold-foreground transition-opacity hover:opacity-90"
              >
                New Booking
              </Link>
              <Link
                to="/reports"
                className="rounded-full border border-rosegold px-6 py-3 font-nav text-xs uppercase tracking-[0.16em] text-rosegold transition-colors hover:bg-blush"
              >
                View Reports
              </Link>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Azzuro Body & Skin treatment room with soft pink and beige styling"
            className="h-56 w-full object-cover lg:h-full"
            loading="lazy"
          />
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="surface-card p-6">
              <span className="label-eyebrow">{kpi.label}</span>
              <p className="mt-3 text-3xl text-foreground">{kpi.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.note}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-xl">Quick Actions</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="surface-card flex items-center gap-3 p-4 transition-shadow hover:shadow-lift"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blush">
                  <action.icon className="size-4" />
                </span>
                <span className="font-nav text-[13px] tracking-wide">{action.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="surface-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-6 py-5">
            <h3 className="text-xl">Today's Schedule</h3>
            <Link to="/bookings" className="font-nav text-xs uppercase tracking-[0.16em] text-rosegold">
              Manage bookings
            </Link>
          </div>
          <div className="divide-y divide-border">
            {todaysBookings.map((booking) => (
              <div
                key={booking.time + booking.client}
                className="flex flex-wrap items-center gap-x-6 gap-y-1 px-6 py-4 text-sm"
              >
                <span className="font-nav w-16 text-rosegold">{booking.time}</span>
                <span className="min-w-40 font-medium">{booking.client}</span>
                <span className="text-muted-foreground">{booking.service}</span>
                <span className="text-muted-foreground">{booking.therapist}</span>
                <span className="ml-auto rounded-full bg-muted px-3 py-1 font-nav text-[10px] uppercase tracking-[0.14em]">
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        <AiNotice />
      </div>
    </AppLayout>
  );
}
