/**
 * AmplifyUP props for SubscribeBanner (`component_id: SubscribeBanner`).
 *
 * Content → SDK `<Field>` / Edge projection.
 * Form submit stays site-owned (Netlify); `formSource` is a plain setting.
 */

export interface ISubscribeBanner {
  /** Internal Amplify / Studio label. */
  title?: string;
  /** Section heading. */
  heading?: string;
  /** Supporting copy beside the form. */
  description?: string;
  /** RSS link label (shown after description). */
  rssLabel?: string;
  /** RSS feed href. */
  rssHref?: string;
  /** Email input placeholder. */
  emailPlaceholder?: string;
  /** Submit button label. */
  buttonLabel?: string;
  /** Shown after a successful subscribe. */
  successMessage?: string;
  /** Shown when validation or submit fails. */
  errorMessage?: string;
  /**
   * Netlify form `source` hidden field (e.g. "homepage").
   * Plain setting — not a Composer click-to-edit Field.
   */
  formSource?: string;
}

export type SubscribeBannerProps = ISubscribeBanner;
