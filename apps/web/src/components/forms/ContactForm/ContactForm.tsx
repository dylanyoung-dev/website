"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CONTACT_REQUEST_TYPES,
  getContactRequestTypeFromParam,
} from "@/lib/contact-form";
import { cn } from "@/lib/utils";

const FORM_NAME = "contact";
const NEWSLETTER_FORM_NAME = "newsletter-subscribe";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  defaultRequestType?: string;
}

function encodeFormData(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

const fieldClassName =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

async function subscribeToNewsletter(email: string) {
  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeFormData({
      "form-name": NEWSLETTER_FORM_NAME,
      email,
      source: "contact-form",
    }),
  });

  if (!response.ok) {
    throw new Error("Newsletter subscription failed");
  }
}

export function ContactForm({ defaultRequestType = "" }: ContactFormProps) {
  const searchParams = useSearchParams();
  const requestFromUrl = getContactRequestTypeFromParam(searchParams.get("request"));
  const initialRequestType = requestFromUrl || defaultRequestType;

  const [requestType, setRequestType] = useState(initialRequestType);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribeToSite, setSubscribeToSite] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const resolved = getContactRequestTypeFromParam(searchParams.get("request"));
    if (resolved) {
      setRequestType(resolved);
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (
      !requestType ||
      !trimmedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) ||
      !trimmedMessage
    ) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": FORM_NAME,
          requestType,
          email: trimmedEmail,
          message: trimmedMessage,
          subscribe: subscribeToSite ? "yes" : "no",
        }),
      });

      if (!response.ok) {
        throw new Error("Contact form submission failed");
      }

      if (subscribeToSite) {
        try {
          await subscribeToNewsletter(trimmedEmail);
        } catch {
          // Contact succeeded; don't block success if newsletter fails.
        }
      }

      setStatus("success");
      setRequestType("");
      setEmail("");
      setMessage("");
      setSubscribeToSite(false);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <Card className="border-border/80">
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle2 className="h-10 w-10 text-primary" aria-hidden />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Message sent</h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Thanks for reaching out. I&apos;ll get back to you as soon as I can.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/80">
      <CardContent className="p-6 md:p-8">
        <form
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value={FORM_NAME} />
          <input type="hidden" name="subscribe" value={subscribeToSite ? "yes" : "no"} />
          <p className="hidden" aria-hidden>
            <label>
              Don&apos;t fill this out:{" "}
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="space-y-2">
            <Label htmlFor="requestType">What can I help you with?</Label>
            <select
              id="requestType"
              name="requestType"
              value={requestType}
              onChange={(event) => {
                setRequestType(event.target.value);
                if (status === "error") {
                  setStatus("idle");
                }
              }}
              required
              disabled={status === "submitting"}
              className={cn(fieldClassName, "h-10")}
              aria-invalid={status === "error" && !requestType}
            >
              <option value="" disabled>
                Select a request type
              </option>
              {CONTACT_REQUEST_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
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
              aria-invalid={status === "error" && !email.trim()}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Why are you contacting me?</Label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                if (status === "error") {
                  setStatus("idle");
                }
              }}
              placeholder="Tell me a bit about what you're looking for..."
              required
              rows={6}
              disabled={status === "submitting"}
              className={cn(fieldClassName, "min-h-[9rem] resize-y")}
              aria-invalid={status === "error" && !message.trim()}
            />
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border/80 bg-muted/30 p-4">
            <Checkbox
              id="subscribeToSite"
              checked={subscribeToSite}
              onCheckedChange={(checked) => setSubscribeToSite(checked === true)}
              disabled={status === "submitting"}
            />
            <div className="space-y-1">
              <Label htmlFor="subscribeToSite" className="cursor-pointer font-medium">
                Subscribe to the site
              </Label>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Get notified when new blog posts and videos are published. No spam.
              </p>
            </div>
          </div>

          {status === "error" ? (
            <p className="text-sm text-destructive" role="alert">
              Please fill in all fields with a valid email address.
            </p>
          ) : null}

          <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
            {status === "submitting" ? "Sending…" : "Send message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
