// One-off: send the "Bienvenido a Shine!" welcome email to a batch of recipients.
// Dry-run by default. Set SEND=1 to actually send via Resend.
//
// Usage:
//   node scripts/send-welcome-batch.mjs <recipients.json> [--lang es|en]
//   SEND=1 node scripts/send-welcome-batch.mjs <recipients.json>
//
// recipients.json: [{ "email": "...", "fname": "...", "language": "" }, ...]
// Env is read from .env.vercel.production (RESEND_API_KEY, RESEND_FROM_EMAIL).

import fs from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { buildWelcomeEmail } from "../lib/emails/welcome.ts";

// --- load env from pulled Vercel prod file ---
const envPath = path.resolve(process.cwd(), ".env.vercel.production");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] ??= m[2].replace(/^"|"$/g, "");
}

const file = process.argv[2];
const langFlagIdx = process.argv.indexOf("--lang");
const defaultLang = langFlagIdx > -1 ? process.argv[langFlagIdx + 1] : "es";
const SEND = process.env.SEND === "1";

const recipients = JSON.parse(fs.readFileSync(file, "utf8"));

function pickName(fname, email) {
  const n = (fname || "").trim();
  if (!n || n.includes("@")) return ""; // no usable name
  return n;
}
function pickLang(r) {
  const l = (r.language || "").toLowerCase();
  if (l.startsWith("es")) return "es";
  if (l.startsWith("en")) return "en";
  return defaultLang;
}

const from = process.env.RESEND_FROM_EMAIL;
const resend = SEND ? new Resend(process.env.RESEND_API_KEY) : null;

console.log(`Mode: ${SEND ? "LIVE SEND" : "DRY RUN"} | from: ${from} | default lang: ${defaultLang}`);
console.log(`Recipients: ${recipients.length}\n`);

let ok = 0, fail = 0;
const results = [];
for (const r of recipients) {
  const lang = pickLang(r);
  const name = pickName(r.fname, r.email);
  const { subject } = buildWelcomeEmail({ name: name || "there", lang });
  const displayName = name || "(no name → generic greeting)";
  if (!SEND) {
    console.log(`DRY  ${r.email.padEnd(34)} lang=${lang} name="${displayName}" subj="${subject}"`);
    results.push({ email: r.email, lang, name, status: "dry" });
    continue;
  }
  try {
    const { html, text } = buildWelcomeEmail({ name: name || "there", lang });
    const resp = await resend.emails.send({ from, to: r.email, subject, html, text });
    if (resp.error) throw new Error(JSON.stringify(resp.error));
    ok++;
    console.log(`SENT ${r.email.padEnd(34)} lang=${lang} id=${resp.data?.id}`);
    results.push({ email: r.email, lang, name, status: "sent", id: resp.data?.id });
  } catch (e) {
    fail++;
    console.error(`FAIL ${r.email.padEnd(34)} ${e.message}`);
    results.push({ email: r.email, lang, name, status: "fail", error: e.message });
  }
}
console.log(`\nDone. ${SEND ? `sent=${ok} fail=${fail}` : `dry-run of ${recipients.length}`}`);
fs.writeFileSync(path.resolve(path.dirname(file), "send-results.json"), JSON.stringify(results, null, 2));
