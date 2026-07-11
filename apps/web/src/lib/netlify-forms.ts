export const NETLIFY_FORM_ENDPOINT = "/__forms.html";

export function encodeNetlifyFormData(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

/**
 * When Netlify Forms actually processes a submission it responds with its
 * hosted "Thank you!" page. If the POST was swallowed by Next.js or served
 * back as the raw static file (e.g. stale bundle posting to "/", CDN edge
 * cases), we'd get a 200 with different content — a silent failure. Checking
 * the response body lets us surface those cases as real errors instead of
 * showing a false success message.
 */
function isNetlifyFormsResponse(body: string): boolean {
  return (
    body.includes("<title>Thank you!</title>") ||
    body.includes("Thank you!")
  );
}

export async function submitNetlifyForm(data: Record<string, string>) {
  const response = await fetch(NETLIFY_FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encodeNetlifyFormData({
      "bot-field": "",
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error(`Netlify form submission failed (${response.status})`);
  }

  const body = await response.text();
  if (!isNetlifyFormsResponse(body)) {
    throw new Error(
      "Form endpoint responded but the submission was not processed by Netlify Forms"
    );
  }

  return response;
}
