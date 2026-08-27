import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Menu,
  X,
  Home,
  CalendarDays,
  Sparkles,
  ShoppingBag,
  Mail,
  Bot,
  type LucideIcon,
} from "lucide-react";

const nav: { to: any; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/services", label: "Services", icon: Sparkles },
  { to: "/store", label: "Retail Store", icon: ShoppingBag },
  { to: "/email-generator", label: "Smart Email Generator", icon: Mail },
  { to: "/chat", label: "AI Beauty Chat", icon: Bot },
] as const;

const bottomNav: { to: any; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/bookings", label: "Bookings", icon: CalendarDays },
  { to: "/store", label: "Store", icon: ShoppingBag },
  { to: "/services", label: "Services", icon: Sparkles },
  { to: "/chat", label: "AI Chat", icon: Bot },
] as const;

function Brand() {
  return (
    <Link to="/" className="block px-6 py-7">
      <span className="label-eyebrow">Azzuro</span>
      <h2 className="mt-1 text-2xl leading-tight text-foreground">
        Body <span className="text-rosegold">&</span> Skin
      </h2>
      <p className="mt-1 font-nav text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        Beauty Management
      </p>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex-1 space-y-1 px-3 pb-8">
      {nav.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 font-nav text-[13px] tracking-wide transition-colors ${
              active
                ? "bg-blush text-blush-foreground shadow-soft"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppLayout({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:flex">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <Brand />
        <NavList />
        <p className="px-6 pb-6 text-[11px] leading-relaxed text-muted-foreground">
          AI features assist with recommendations and communication only.
        </p>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/30"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex h-full w-72 flex-col bg-card">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground"
            >
              <X className="size-5" />
            </button>
            <Brand />
            <div className="overflow-y-auto">
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-4 backdrop-blur lg:px-10">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-border p-2 text-foreground lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0">
            {eyebrow && <span className="label-eyebrow">{eyebrow}</span>}
            <h1 className="truncate text-xl lg:text-2xl">{title}</h1>
          </div>
          <div className="ml-auto hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="font-nav text-xs tracking-wide text-foreground">Lee Nkosi</p>
              <p className="text-[11px] text-muted-foreground">Salon Manager</p>
            </div>
            <div className="grid size-10 place-items-center rounded-full gradient-luxe font-nav text-xs text-foreground">
              LN
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pb-28 pt-6 lg:px-10 lg:pb-14">{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-card/95 backdrop-blur lg:hidden">
          {bottomNav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-1 py-3 font-nav text-[10px] uppercase tracking-wider text-muted-foreground [&.active]:text-rosegold"
              activeProps={{ className: "active" }}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function AiNotice() {
  return (
    <div className="rounded-2xl border border-border bg-muted/60 px-5 py-4 text-[12px] leading-relaxed text-muted-foreground">
      <span className="label-eyebrow">Responsible AI Notice</span>
      <p className="mt-2">
        The AI features within Azzuro Body & Skin assist with beauty recommendations, customer
        communication, research and appointment support. AI-generated suggestions should not be
        considered medical advice. Treatment suitability must be confirmed by qualified beauty
        professionals before services are performed. Personal information is handled according to
        privacy and data protection regulations.
      </p>
    </div>
  );
}
