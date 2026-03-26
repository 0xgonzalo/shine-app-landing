"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { subscribeSchema } from "@/lib/validations";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Newsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError("");

    const result = subscribeSchema.safeParse({ name, email });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (field === "name" || field === "email") {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setFormState("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormState("success");
      } else {
        setApiError(data.error || "Something went wrong. Please try again.");
        setFormState("error");
      }
    } catch {
      setApiError("Something went wrong. Please try again.");
      setFormState("error");
    }
  };

  return (
    <section id="newsletter" className="relative py-24 md:py-32 px-6">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          Be part of what&rsquo;s next.
        </motion.h2>

        <motion.p
          className="text-text-secondary mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Join our community of artists and fans building a fairer music industry. Get early access, exclusive updates, and be the first to know when Shine launches.
        </motion.p>

        <motion.div
          className="bg-[rgba(255,255,255,0.04)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 shadow-[0_0_80px_rgba(37,99,235,0.12)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                className="flex flex-col items-center gap-4 py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <p className="text-xl font-bold text-white">Welcome to Shine. You&rsquo;re in.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={formState === "submitting"}
                    className={`w-full bg-white/5 border rounded-xl p-3.5 px-5 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent ${
                      errors.name ? "border-error" : "border-[rgba(255,255,255,0.1)]"
                    }`}
                    aria-label="Your name"
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-error text-sm mt-1 text-left">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={formState === "submitting"}
                    className={`w-full bg-white/5 border rounded-xl p-3.5 px-5 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-accent ${
                      errors.email ? "border-error" : "border-[rgba(255,255,255,0.1)]"
                    }`}
                    aria-label="Your email"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-error text-sm mt-1 text-left">{errors.email}</p>
                  )}
                </div>

                {apiError && (
                  <p className="text-error text-sm" role="alert">{apiError}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="mt-2 w-full h-12 bg-accent text-white font-bold rounded-full transition-all duration-300 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    "Join Shine"
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
