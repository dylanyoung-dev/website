/**
 * AmplifyUP props for AwardsSection (`component_id: AwardsSection`).
 *
 * Content → SDK `<Field>` / Edge projection.
 */

/** Portable image as Edge / Amplify may project it. */
export interface IAwardsImage {
  url: string;
  assetId?: string;
  width?: number;
  height?: number;
  alt?: string;
}

/** Single award or certification badge. */
export interface IAwardsItem {
  _key?: string;
  /** Image URL string or portable `{ url }` object. */
  image?: string | IAwardsImage;
  /** Legacy / Studio image path when not using portable image. */
  src?: string;
  alt?: string;
  /** Optional click-through (e.g. MVP profile). */
  href?: string;
}

export interface IAwardsSection {
  /** Internal Amplify / Studio label. */
  title?: string;
  /** Section heading. */
  heading?: string;
  /** Supporting copy under the heading. */
  description?: string;
  /** Eyebrow above MVP logos (e.g. "Sitecore MVP"). */
  mvpLabel?: string;
  /** Eyebrow above certification logos. */
  certificationsLabel?: string;
  /** MVP / award logos. */
  awards?: IAwardsItem[];
  /** Certification logos. */
  certifications?: IAwardsItem[];
}

export type AwardsSectionProps = IAwardsSection;
