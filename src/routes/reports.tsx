import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { monthlyBookings, serviceDemand, therapistPerformance, zar } from "@/data/salon";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Booking, revenue and customer analytics for Azzuro Body & Skin, including therapist performance and retention.",
      },
      { property: "og:title", content: "Reports & Analytics — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Track demand, revenue mix and client retention month by month.",
      },
    ],
  }),
  component: Reports;
});

const maxBookings = Math.max(...monthlyBookings.map((m) => m.bookings));

function Reports() {
  const serviceIncome = 34800;
  const retailSales = 13700;

  return (
    <AppLayout eyebrow="Reports & Analytics" title="Performance">
      <div className="space-y-6">
        <section className="surface-card p-6 lg:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl">Monthly Bookings</h2>
            <span className="text-xs text-muted-foreground">Last six months</span>
          </div>
          <div className="mt-6 flex h-52 items-end gap-4">
            {monthlyBookings.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-nav text-[11px] text-muted-foreground">{m.bookings}</span>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-beige to-rosegold"
                  style={{ height: `${(m.bookings / maxBookings) * 100}%` }}
                />
                <span className="font-nav text-[11px] uppercase tracking-widest text-muted-foreground">
                  {m.month}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="surface-card p-6 lg:p-8">
            <h2 className="text-xl">Service Demand</h2>
            <ul className="mt-5 space-y-4">
              {serviceDemand.map((s) => (
                <li key={s.name}>
                  <div className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-muted-foreground">{s.share}%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-rosegold"
                      style={{ width: `${s.share * 3}%`, maxWidth: "100%" }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-card p-6 lg:p-8">
            <h2 className="text-xl">Therapist Performance</h2>
            <table className="mt-5 w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="label-eyebrow pb-3 font-normal">Therapist</th>
                  <th className="label-eyebrow pb-3 font-normal">Bookings</th>
                  <th className="label-eyebrow pb-3 font-normal">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {therapistPerformance.map((t) => (
                  <tr key={t.name}>
                    <td className="py-3">{t.name}</td>
                    <td className="py-3 text-muted-foreground">{t.bookings}</td>
                    <td className="py-3 text-rosegold">{t.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="surface-card p-6 lg:p-8">
            <h2 className="text-xl">Revenue Analytics</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Service income</dt>
                <dd>{zar(serviceIncome)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Retail sales</dt>
                <dd>{zar(retailSales)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total revenue</dt>
                <dd className="text-rosegold">{zar(serviceIncome + retailSales)}</dd>
              </div>
            </dl>
          </section>

          <section className="surface-card p-6 lg:p-8">
            <h2 className="text-xl">Customer Analytics</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { label: "New customers", value: "46" },
                { label: "Retention rate", value: "78%" },
                { label: "Lifetime value", value: zar(9240) },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-muted/60 p-5">
                  <span className="label-eyebrow">{stat.label}</span>
                  <p className="mt-2 text-2xl">{stat.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
