/** Hero action CTA — maps to Sanity `actions[]` / AmplifyUP array item. */
export interface IHeroAction {
  _key?: string;
  _type?: string;
  label?: string;
  href?: string;
  style?: "primary" | "outline" | "ghost";
  openInNewTab?: boolean;
}

/** Secondary pill/text link — maps to Sanity `secondaryLinks[]`. */
export interface IHeroSecondaryLink {
  _key?: string;
  _type?: string;
  label?: string;
  href?: string;
}

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
 */
export interface IHero {
  /** Layout style: home-style (default) or insights listing style. Plain prop, not `<Field>`. */
  variant?: "default" | "insights";
  /** Small label above the heading. */
  eyebrow?: string;
  /** Main H1 heading. */
  heading: string;
  /** Supporting copy under the heading. */
  description?: string;
  /** Optional line under the heading. */
  subtitle?: string;
  /** Optional pulse badge (typically default variant). */
  badge?: IHeroBadge;
  /** CTA buttons. */
  actions?: IHeroAction[];
  /** Pill / text links under the CTAs. */
  secondaryLinks?: IHeroSecondaryLink[];
}

export type HeroProps = IHero;
