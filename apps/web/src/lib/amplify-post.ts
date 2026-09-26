import { isFieldEnvelope } from "@amplifyup/sdk/react";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Unwrap AmplifyUP field envelopes (`{ value, name }`) to plain values. */
export function unwrapAmplifyFields(source: unknown): Record<string, unknown> {
  if (!isRecord(source)) return {};
  const out: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(source)) {
    if (isFieldEnvelope(raw)) {
      out[key] = raw.value;
      continue;
    }
    if (isRecord(raw) && !Array.isArray(raw)) {
      const nested = unwrapAmplifyFields(raw);
      out[key] = Object.keys(nested).length ? nested : raw;
      continue;
    }
    out[key] = raw;
  }
  return out;
}
