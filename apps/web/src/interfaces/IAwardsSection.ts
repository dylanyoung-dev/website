/**
 * AmplifyUP props for AwardsSection (`component_id: AwardsSection`).
 *
 * Content → SDK Field / Image / ListRow envelopes (0.1.64+).
 */

import type { ImageValue } from "@amplifyup/sdk/react";

/** Single award or certification badge (list row schema). */
export type IAwardsItem = {
  id: string;
  image?: ImageValue;
  alt?: string;
  href?: string;
};

export interface IAwardsSection {
  title?: string;
  heading?: string;
  description?: string;
  mvpLabel?: string;
  certificationsLabel?: string;
  awards?: IAwardsItem[];
  certifications?: IAwardsItem[];
}

export type AwardsSectionProps = IAwardsSection;
