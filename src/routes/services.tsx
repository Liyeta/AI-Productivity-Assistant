import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { serviceCategories, zar } from "@/data/salon";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Treatments & Services — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Massage, facial, manicure, pedicure, waxing and body slimming treatments with durations and pricing at Azzuro Body & Skin.",
      },
      { property: "og:title", content: "Treatments & Services — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "The full Azzuro treatment menu, from Swedish massage to body contouring.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <AppLayout eyebrow="Treatment Menu" title="Services">
      <div className="space-y-6">
        {serviceCategories.map((category) => (
          <section key={category.name} className="surface-card overflow-hidden">
            <div className="flex flex-wrap items-center gap-4 border-b border-border bg-muted/50 px-6 py-5">
              <span aria-hidden className="grid size-11 place-items-center rounded-full bg-card text-lg">
                {category.icon}
              </span>
              <div>
                <h2 className="text-xl">{category.name}</h2>
                <p className="text-xs text-muted-foreground">{category.blurb}</p>
              </div>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
              {category.items.map((item) => (
                <div key={item.name} className="bg-card p-5">
                  <h3 className="text-base">{item.name}</h3>
                  <p className="mt-1 font-nav text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {item.duration}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg text-rosegold">{zar(item.price)}</span>
                    <Link
                      to="/bookings"
                      className="rounded-full border border-rosegold px-4 py-1.5 font-nav text-[10px] uppercase tracking-[0.14em] text-rosegold transition-colors hover:bg-blush"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppLayout>
  );
}
