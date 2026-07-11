export const CONTACT_REQUEST_TYPES = [
  { value: "Speaking Request", label: "Speaking Request", slug: "speaking" },
  {
    value: "Help me with my Site/Project",
    label: "Help me with my Site/Project",
    slug: "site-project",
  },
  {
    value: "I want to sponsor a video/blog post",
    label: "I want to sponsor a video/blog post",
    slug: "sponsor",
  },
  {
    value: "Consulting or freelance work",
    label: "Consulting or freelance work",
    slug: "consulting",
  },
  {
    value: "Media / podcast / interview",
    label: "Media / podcast / interview",
    slug: "media",
  },
  {
    value: "Feedback on content",
    label: "Feedback on content",
    slug: "feedback",
  },
  { value: "Want to say Hello", label: "Want to say Hello", slug: "hello" },
  { value: "Other", label: "Other", slug: "other" },
] as const;

export type ContactRequestType = (typeof CONTACT_REQUEST_TYPES)[number]["value"];

export function getContactRequestTypeFromParam(
  param?: string | null
): ContactRequestType | "" {
  if (!param) {
    return "";
  }

  const normalized = param.trim().toLowerCase();
  const match = CONTACT_REQUEST_TYPES.find(
    (option) =>
      option.slug === normalized ||
      option.value.toLowerCase() === normalized
  );

  return match?.value ?? "";
}

export function getContactRequestHref(slug: string) {
  return `/contact?request=${encodeURIComponent(slug)}`;
}
