import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AiNotice, AppLayout } from "@/components/AppLayout";
import { generateResearch, type ResearchReport } from "@/lib/ai";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Research beauty and wellness trends, marketing opportunities and retail inventory recommendations for Azzuro Body & Skin.",
      },
      { property: "og:title", content: "AI Research Assistant — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Turn a topic into an actionable beauty industry brief.",
      },
    ],
  }),
  component: Research,
});

const depths = ["Quick Summary", "Standard Report", "Deep Analysis"];

function Research() {
  const [topic, setTopic] = useState("Top beauty trends for 2026");
  const [depth, setDepth] = useState(depths[1]!);
  const [report, setReport] = useState<ResearchReport | null>(null);

  return (
    <AppLayout eyebrow="AI Assistance" title="AI Research Assistant">
      <div className="space-y-6">
        <div className="surface-card grid gap-5 p-6 lg:grid-cols-[1.6fr_1fr] lg:p-8">
          <label className="block text-sm">
            Research Topic
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Top beauty trends for 2026"
              className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-rosegold focus:ring-2 focus:ring-rosegold/25"
            />
          </label>
          <div className="text-sm">
            Research Depth
            <div className="mt-2 flex flex-wrap gap-2">
              {depths.map((d) => (
                <button
                  key={d}
                  onClick={() => setDepth(d)}
                  className={`rounded-full px-4 py-2 font-nav text-xs tracking-wide transition-colors ${
                    depth === d
                      ? "bg-rosegold text-rosegold-foreground"
                      : "border border-border text-muted-foreground hover:bg-blush"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <button
              onClick={() => setReport(generateResearch(topic, depth))}
              className="w-full rounded-full bg-rosegold px-6 py-3.5 font-nav text-xs uppercase tracking-[0.18em] text-rosegold-foreground transition-opacity hover:opacity-90 lg:w-auto lg:px-10"
            >
              Run Research
            </button>
          </div>
        </div>

        {report && (
          <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
            <div className="surface-card p-6 lg:p-8">
              <span className="label-eyebrow">Summary</span>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{report.summary}</p>

              <h3 className="mt-8 text-xl">Key Trends</h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {report.trends.map((trend) => (
                  <div key={trend.title} className="rounded-2xl bg-muted/60 p-5">
                    <h4 className="text-base">{trend.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {trend.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="surface-card p-6 lg:p-8">
                <span className="label-eyebrow">Opportunities</span>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {report.opportunities.map((o) => (
                    <li key={o}>• {o}</li>
                  ))}
                </ul>
              </div>
              <div className="surface-card p-6 lg:p-8">
                <span className="label-eyebrow">Recommended Products</span>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {report.products.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
                <button
                  onClick={() => toast.success("Report exported to PDF")}
                  className="mt-5 w-full rounded-full border border-rosegold px-5 py-2.5 font-nav text-[11px] uppercase tracking-[0.14em] text-rosegold"
                >
                  Export to PDF
                </button>
              </div>
            </div>
          </div>
        )}

        <AiNotice />
      </div>
    </AppLayout>
  );
}
