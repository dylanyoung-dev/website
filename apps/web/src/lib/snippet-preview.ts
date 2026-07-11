const LANGUAGE_EXTENSIONS: Record<string, string> = {
  bash: "sh",
  csharp: "cs",
  cs: "cs",
  css: "css",
  graphql: "graphql",
  html: "html",
  javascript: "js",
  js: "js",
  json: "json",
  jsx: "jsx",
  markdown: "md",
  md: "md",
  powershell: "ps1",
  python: "py",
  py: "py",
  shell: "sh",
  sh: "sh",
  sql: "sql",
  text: "txt",
  ts: "ts",
  tsx: "tsx",
  typescript: "ts",
  xml: "xml",
  yaml: "yml",
  yml: "yml",
};

export interface SnippetCodePreview {
  language: string;
  code: string;
}

export function extractFirstCodeBlock(body?: string): SnippetCodePreview | null {
  if (!body) {
    return null;
  }

  const match = body.match(/```(\w+)?\r?\n([\s\S]*?)```/);
  if (!match) {
    return null;
  }

  return {
    language: match[1]?.toLowerCase() || "text",
    code: match[2].trim(),
  };
}

export function getSnippetPreviewText(
  snippet: { body?: string; excerpt?: string },
  maxLines = 8
): string {
  const codeBlock = extractFirstCodeBlock(snippet.body);
  if (codeBlock) {
    return codeBlock.code.split("\n").slice(0, maxLines).join("\n");
  }

  if (snippet.excerpt) {
    return snippet.excerpt;
  }

  return snippet.body?.trim().slice(0, 280) ?? "";
}

export function getSnippetLanguage(snippet: { body?: string }): string | null {
  return extractFirstCodeBlock(snippet.body)?.language ?? null;
}

export function getSnippetFilename(title: string, language?: string | null) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const extension = language
    ? LANGUAGE_EXTENSIONS[language.toLowerCase()] ?? language.toLowerCase()
    : "txt";

  return `${slug || "snippet"}.${extension}`;
}
