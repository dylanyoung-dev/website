function isFieldEnvelope(
  value: unknown
): value is { name: string; value: unknown } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const rec = value as { name?: unknown; value?: unknown; url?: unknown };
  return typeof rec.name === "string" && "value" in rec && !("url" in rec);
}

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
