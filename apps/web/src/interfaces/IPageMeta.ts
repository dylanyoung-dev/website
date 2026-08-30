/**
 * AmplifyUP props for PageMeta (`component_id: PageMeta`).
 * Generic SEO / Open Graph metadata for any page.
 */

export interface IPageMeta {
  /** Internal Amplify / Studio label. */
  title?: string;
  /** Document / browser title. */
  metaTitle?: string;
  /** Meta description. */
  metaDescription?: string;
  /** Absolute or site-relative canonical URL. */
  canonicalUrl?: string;
  /** Open Graph / Twitter image URL. */
  ogImage?: string | { url?: string; alt?: string };
  /** Open Graph type (e.g. website, article). */
  ogType?: string;
  /** Comma-separated keywords. */
  keywords?: string;
  /** Robots directive (e.g. "noindex, nofollow"). */
  robots?: string;
  /** Twitter card type. */
  twitterCard?: "summary" | "summary_large_image";
  /** Site name for Open Graph. */
  siteName?: string;
}

export type PageMetaProps = IPageMeta;
