import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AiNotice, AppLayout } from "@/components/AppLayout";
import { beautyChatReply } from "@/lib/ai";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Beauty Chat — Azzuro Body & Skin" },
      {
        name: "description",
        content:
          "Ask the Azzuro beauty assistant about facials, massage, slimming treatments and product recommendations.",
      },
      { property: "og:title", content: "AI Beauty Chat — Azzuro Body & Skin" },
      {
        property: "og:description",
        content: "Consultant-style guidance before you book your treatment.",
      },
    ],
  }),
  component: Chat,
});

const suggestions = [
  "Which facial is best for acne?",
  "What massage helps with stress?",
  "What slimming products do you recommend?",
];

type Message = { role: "client" | "assistant"; text: string };

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome to Azzuro Body & Skin. Tell me about your skin or body concern and I will suggest a suitable treatment and home care ritual.",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (question: string) => {
    const text = question.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { role: "client", text },
      { role: "assistant", text: beautyChatReply(text) },
    ]);
    setInput("");
  };

  return (
    <AppLayout eyebrow="AI Assistance" title="AI Beauty Chat">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="surface-card flex h-[70vh] flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                  message.role === "client"
                    ? "ml-auto bg-rosegold text-rosegold-foreground"
                    : "bg-muted/70"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-3 border-t border-border p-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a treatment or product…"
              className="flex-1 rounded-full border border-input bg-card px-5 py-3 text-sm outline-none focus:border-rosegold"
            />
            <button className="rounded-full bg-rosegold px-6 py-3 font-nav text-[11px] uppercase tracking-[0.14em] text-rosegold-foreground">
              Send
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <span className="label-eyebrow">Popular Questions</span>
            <div className="mt-3 space-y-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="w-full rounded-xl bg-muted/60 px-4 py-3 text-left text-sm transition-colors hover:bg-blush"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <AiNotice />
        </div>
      </div>
    </AppLayout>
  );
}
