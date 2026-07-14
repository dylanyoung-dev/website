"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { cn } from "@/lib/utils";

const FORM_NAME = "newsletter-subscribe";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function SubscribeBanner({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      await submitNetlifyForm({
        "form-name": FORM_NAME,
        email: trimmed,
        source: "homepage",
      });

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="subscribe"
      className={cn("scroll-mt-24", className)}
      aria-labelledby="subscribe-heading"
    >
      <div className="rounded-2xl border border-transparent p-1.5 dark:border-primary/45 dark:bg-primary/15">
        <div className="relative overflow-hidden rounded-[0.875rem] bg-slate-950 px-6 py-8 md:px-10 md:py-10">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl"
          aria-hidden
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl space-y-2">
            <h2
              id="subscribe-heading"
              className="text-xl font-bold tracking-tight text-white md:text-2xl"
            >
              Get notified when new content is released
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 md:text-base">
              Blog posts and YouTube videos on AI, Sitecore, and the craft. No
              spam.{" "}
              <Link
                href="/feed.xml"
                className="no-underline text-slate-300 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Prefer RSS? Subscribe via feed.
              </Link>
            </p>
          </div>

          {status === "success" ? (
            <p
              className="text-sm font-medium text-green-400 lg:shrink-0 lg:text-base"
              role="status"
            >
              You&apos;re on the list — thanks for subscribing.
            </p>
          ) : (
            <div className="flex w-full flex-col gap-2 lg:max-w-md lg:shrink-0 xl:max-w-lg">
              <form
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <input type="hidden" name="source" value="homepage" />
                <p className="hidden" aria-hidden>
                  <label>
                    Don&apos;t fill this out:{" "}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") {
                      setStatus("idle");
                    }
                  }}
                  placeholder="you@email.com"
                  required
                  autoComplete="email"
                  disabled={status === "submitting"}
                  className="h-11 border-0 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-primary"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "subscribe-error" : undefined}
                />

                <Button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-11 shrink-0 rounded-lg px-6 font-semibold shadow-md shadow-primary/25"
                >
                  {status === "submitting" ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>

              {status === "error" ? (
                <p id="subscribe-error" className="text-sm text-red-400" role="alert">
                  Something went wrong. Please check your email and try again.
                </p>
              ) : null}
            </div>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
