export function getSchemaIds(baseUrl: string) {
  return {
    personId: `${baseUrl}/#dylan`,
    organizationId: `${baseUrl}/#organization`,
  };
}

/** Profile URLs used in JSON-LD sameAs — keep aligned with footer social links. */
export const PROFILE_SAME_AS = [
  "https://www.linkedin.com/in/dylanyoung/",
  "https://github.com/dylanyoung-dev",
  "https://twitter.com/dylanyoung_dev",
  "https://youtube.com/c/dylanyoungdev",
];

export const PERSON_JOB_TITLE =
  "Solutions Architect, 7x Sitecore MVP & AI Thought Leader";

export const PERSON_DESCRIPTION =
  "7x Sitecore MVP, Solutions Architect, and AI thought leader specializing in Sitecore, composable DXP, and AI/ML engineering.";
