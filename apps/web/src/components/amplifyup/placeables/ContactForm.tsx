"use client";

import { Suspense } from "react";
import { ContactForm as LegacyContactForm } from "@/components/forms/ContactForm";

/**
 * AmplifyUP placeable `ContactForm` — placement-only (no fields).
 * AmplifyUP has no form builder; the Netlify form and request types stay in code.
 * The `?request=` param preselects the request type, read client-side.
 */
export function ContactForm() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        <Suspense fallback={null}>
          <LegacyContactForm />
        </Suspense>
      </div>
    </div>
  );
}
