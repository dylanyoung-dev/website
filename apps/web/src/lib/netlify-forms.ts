export const NETLIFY_FORM_ENDPOINT = "/__forms.html";

export function encodeNetlifyFormData(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
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

  return response;
}
