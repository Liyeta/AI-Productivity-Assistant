import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { products, zar } from "@/data/salon";

export const Route = createFileRoute("/store")({
  head: () => ({
    meta: [
      { title: "Retail Store — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Shop Azzuro Body & Skin retail: slimming creams, contour gels, facial serums and spa massage oils with secure South African checkout.",
      },
      { property: "og:title", content: "Retail Store — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Therapist-selected home care to extend your in-salon results.",
      },
    ],
  }),
  component: Store,
});

const payments = ["Card", "EFT", "PayFast", "Ozow"];

function Store() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<Record<string, number>>({});
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);

  const lines = Object.entries(cart)
    .map(([id, count]) => ({ product: products.find((p) => p.id === id)!, count }))
    .filter((line) => line.product);

  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.count, 0);
    const discount = applied ? subtotal * 0.1 : 0;
    const net = subtotal - discount;
    const vat = net - net / 1.15;
    return { subtotal, discount, vat, total: net };
  }, [lines, applied]);

  const addToCart = (id: string, name: string) => {
    const count = qty[id] ?? 1;
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + count }));
    toast.success(`${name} added to cart`, { description: `Quantity ${count}` });
  };

  return (
    <AppLayout eyebrow="Retail Store" title="Shop">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="grid gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <article key={product.id} className="surface-card flex flex-col overflow-hidden">
              <img
                src={product.image}
                alt={`${product.name} — Azzuro Body & Skin retail product`}
                width={768}
                height={576}
                loading="lazy"
                className="h-44 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg">{product.name}</h3>
                <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <p className="mt-3 text-lg text-rosegold">{zar(product.price)}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      aria-label="Decrease quantity"
                      className="px-3 py-1.5 text-muted-foreground"
                      onClick={() =>
                        setQty((p) => ({ ...p, [product.id]: Math.max(1, (p[product.id] ?? 1) - 1) }))
                      }
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-nav text-sm">{qty[product.id] ?? 1}</span>
                    <button
                      aria-label="Increase quantity"
                      className="px-3 py-1.5 text-muted-foreground"
                      onClick={() =>
                        setQty((p) => ({ ...p, [product.id]: (p[product.id] ?? 1) + 1 }))
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(product.id, product.name)}
                    className="flex-1 whitespace-nowrap rounded-full bg-rosegold px-3 py-2.5 font-nav text-[10px] uppercase tracking-[0.1em] text-rosegold-foreground transition-opacity hover:opacity-90"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <span className="label-eyebrow">Shopping Cart</span>
            {lines.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Your cart is empty. Add a product to begin checkout.
              </p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm">
                {lines.map((line) => (
                  <li key={line.product.id} className="flex items-start gap-3">
                    <span className="flex-1">
                      {line.product.name}
                      <span className="block text-xs text-muted-foreground">
                        {line.count} × {zar(line.product.price)}
                      </span>
                    </span>
                    <span>{zar(line.product.price * line.count)}</span>
                    <button
                      aria-label={`Remove ${line.product.name}`}
                      className="text-muted-foreground"
                      onClick={() =>
                        setCart((prev) => {
                          const next = { ...prev };
                          delete next[line.product.id];
                          return next;
                        })
                      }
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code (AZZURO10)"
                className="flex-1 rounded-full border border-input bg-card px-4 py-2 text-xs outline-none focus:border-rosegold"
              />
              <button
                onClick={() => {
                  const ok = promo.trim().toUpperCase() === "AZZURO10";
                  setApplied(ok);
                  ok ? toast.success("10% discount applied") : toast.error("Invalid promo code");
                }}
                className="rounded-full border border-rosegold px-4 py-2 font-nav text-[10px] uppercase tracking-[0.14em] text-rosegold"
              >
                Apply
              </button>
            </div>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{zar(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Discounts</dt>
                <dd>−{zar(totals.discount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">VAT (15% incl.)</dt>
                <dd>{zar(Number(totals.vat.toFixed(2)))}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt>
                <dd className="text-rosegold">{zar(Number(totals.total.toFixed(2)))}</dd>
              </div>
            </dl>

            <button
              disabled={lines.length === 0}
              onClick={() => {
                toast.success("Order placed", {
                  description: "Secure payment captured. Invoice emailed to the client.",
                });
                setCart({});
                setApplied(false);
                setPromo("");
              }}
              className="mt-5 w-full rounded-full bg-rosegold px-6 py-3 font-nav text-xs uppercase tracking-[0.18em] text-rosegold-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Checkout
            </button>
          </div>

          <div className="surface-card p-6">
            <span className="label-eyebrow">Secure Payment</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {payments.map((method) => (
                <span
                  key={method}
                  className="rounded-full bg-muted px-4 py-1.5 font-nav text-[11px] tracking-wide"
                >
                  {method}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              All transactions are encrypted. Card details are never stored on our servers.
            </p>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
