/** Hero action CTA — AmplifyUP list row schema. */
export type IHeroAction = {
  id: string;
  label?: string;
  href?: string;
  style?: "primary" | "outline" | "ghost";
  openInNewTab?: boolean;
};

/** Secondary pill/text link — AmplifyUP list row schema. */
export type IHeroSecondaryLink = {
  id: string;
  label?: string;
  href?: string;
};

/** Optional status badge (home-style). */
export interface IHeroBadge {
  text: string;
  showPulse?: boolean;
}

/**
 * Configurable Hero props for AmplifyUP / Sanity.
 *
 * Content fields are bound via SDK `fields` envelopes (`field={fields.heading}`).
 * Settings like `variant` are plain component props — not Field-wrapped.
 * Object arrays are `ListRow[]` (`Fields` + plain `id`).
 */
export interface IHero {
  /** Layout style: home-style (default) or insights listing style. Plain prop, not `<Field>`. */
  variant?: "default" | "insights";
  eyebrow?: string;
  heading: string;
  description?: string;
  subtitle?: string;
  badge?: IHeroBadge;
  actions?: IHeroAction[];
  secondaryLinks?: IHeroSecondaryLink[];
}

export type HeroProps = IHero;
