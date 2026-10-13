"use client";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Copy, Mail, Send, Check, Paperclip, Sparkles, Phone, MessageSquare } from "lucide-react";
import { Button, Card, Notice } from "@/components/ui";
import { contact } from "@/lib/data";

type F = { name: string; email: string; subject: string; message: string; priority: string };
const empty: F = { name: "", email: "", subject: "", message: "", priority: "Normal" };
const inp =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-black/40 transition-all focus:border-ink focus:outline-none focus:ring-2 focus:ring-lime/60";

export default function ContactForm({ ticket }: { ticket?: boolean }) {
  const [f, setF] = useState<F>(empty);
  const [e, setE] = useState<Partial<Record<keyof F, string>>>({});
  const [ok, setOk] = useState(false);
  const [note, setNote] = useState("");
  const [savedBriefName, setSavedBriefName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("mmk_wizard_config") || localStorage.getItem("mmk-brief-v1");
      if (stored) {
        const raw = JSON.parse(stored);
        const parsed = raw.cfg || raw;
        if (parsed.projectName || parsed.category) {
          setSavedBriefName(parsed.projectName || parsed.category);
          // If form name/email are empty, prefill from brief
          setF((prev) => ({
            ...prev,
            name: prev.name || parsed.name || "",
            email: prev.email || parsed.email || "",
            subject: prev.subject || (parsed.projectName ? `Inquiry regarding ${parsed.projectName}` : ""),
          }));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const attachBrief = () => {
    try {
      const stored = localStorage.getItem("mmk_wizard_config") || localStorage.getItem("mmk-brief-v1");
      if (stored) {
        const raw = JSON.parse(stored);
        const b = raw.cfg || raw;
        const briefSummary = `\n\n--- Attached Project Brief ---\nProject: ${b.projectName || "Untitled"}\nCategory: ${b.category || "General"}\nPages: ${[...(b.pages || []), ...(b.customPages || [])].join(", ") || "Standard"}\nFeatures: ${(b.features || []).join(", ") || "None selected"}\nBudget: ${b.budget || "TBD"}\nTimeline: ${b.timeline || "Flexible"}`;
        setF((prev) => ({
          ...prev,
          message: prev.message + briefSummary,
        }));
        setNote("Attached project brief details to message.");
      }
    } catch {
      setNote("Could not attach project brief.");
    }
  };

  const body = `Name: ${f.name}\nEmail: ${f.email}\n${ticket ? `Priority: ${f.priority}\n` : ""}\n${f.message}`;
  const mail = `mailto:${contact.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const n: Partial<Record<keyof F, string>> = {};
    if (f.name.trim().length < 2) n.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) n.email = "Enter a valid email address.";
    if (f.subject.trim().length < 3) n.subject = "Add a short subject.";
    if (f.message.trim().length < 10) n.message = "Message must be at least 10 characters.";
    setE(n);
    if (Object.keys(n).length === 0) {
      setOk(true);
      setNote("");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${f.subject}\n${body}`);
      setNote("Copied message to clipboard!");
    } catch {
      setNote("Copy failed. Select the text and copy it manually.");
    }
  };

  const field = (k: "name" | "email" | "subject" | "message", label: string, area?: boolean) => (
    <label className="block" key={k}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-black/70">
        {label}
      </span>
      {area ? (
        <textarea
          rows={5}
          className={inp}
          value={f[k]}
          placeholder="How can we help your business?"
          onChange={(x) => setF({ ...f, [k]: x.target.value })}
        />
      ) : (
        <input
          type={k === "email" ? "email" : "text"}
          className={inp}
          placeholder={k === "name" ? "e.g. Alex Morgan" : k === "email" ? "alex@company.com" : "Project inquiry"}
          value={f[k]}
          onChange={(x) => setF({ ...f, [k]: x.target.value })}
        />
      )}
      {e[k] && (
        <span role="alert" className="mt-1.5 block text-xs font-semibold text-red-600">
          {e[k]}
        </span>
      )}
    </label>
  );

  if (ok) {
    return (
      <Card className="border border-black/10 bg-white">
        <div className="flex items-center gap-2 text-lime-800 font-bold mb-2">
          <Check size={20} className="text-lime" />
          <h3 className="text-xl font-bold text-ink">
            {ticket ? "Ticket summary ready" : "Message prepared"}
          </h3>
        </div>
        <div className="my-4">
          <Notice kind="demo">
            This is a frontend demonstration. You can copy your message or open it directly in your email client.
          </Notice>
        </div>
        <pre className="whitespace-pre-wrap rounded-xl bg-mist p-5 text-sm font-mono border border-black/5 text-ink leading-relaxed">
          {`Subject: ${f.subject}\n\n${body}`}
        </pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button tone="dark" onClick={copy}>
            <Copy size={15} /> Copy message
          </Button>
          <Button href={mail}>
            <Mail size={15} /> Open in email app
          </Button>
          <Button tone="outline" onClick={() => setOk(false)}>
            Edit message
          </Button>
        </div>
        {note && <p role="status" className="mt-4 text-xs font-semibold text-emerald-700">{note}</p>}
      </Card>
    );
  }

  return (
    <Card className="border border-black/10 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-ink flex items-center gap-2">
          <MessageSquare size={18} className="text-lime" />
          {ticket ? "Submit a support ticket" : "Send us a direct message"}
        </h3>
        {savedBriefName && (
          <button
            type="button"
            onClick={attachBrief}
            className="inline-flex items-center gap-1.5 rounded-lg border border-lime/40 bg-lime/10 px-2.5 py-1 text-xs font-semibold text-ink hover:bg-lime/20 transition"
          >
            <Paperclip size={13} className="text-lime" />
            <span>Attach brief ({savedBriefName})</span>
          </button>
        )}
      </div>

      <form noValidate onSubmit={submit} className="space-y-4">
        {Object.keys(e).length > 0 && (
          <Notice kind="error">Please check the required fields highlighted below.</Notice>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {field("name", "Your Name")}
          {field("email", "Email Address")}
        </div>

        {field("subject", "Subject")}

        {ticket && (
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-black/70">
              Priority
            </span>
            <select
              className={inp}
              value={f.priority}
              onChange={(x) => setF({ ...f, priority: x.target.value })}
            >
              <option>Low - General question</option>
              <option>Normal - Upcoming sprint</option>
              <option>Urgent - Active production</option>
            </select>
          </label>
        )}

        {field("message", "Message", true)}

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-black/50">
            Frontend demo: Messages are formatted locally for instant copying or email launch.
          </p>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-lime px-6 py-3 text-sm font-bold text-ink hover:bg-lime-hover shadow-[0_2px_15px_-3px_rgba(198,244,50,0.4)] transition-all shrink-0"
          >
            <Send size={15} />
            {ticket ? "Prepare ticket" : "Prepare message"}
          </button>
        </div>
      </form>
      {note && <p role="status" className="mt-3 text-xs font-semibold text-emerald-700">{note}</p>}
    </Card>
  );
}
