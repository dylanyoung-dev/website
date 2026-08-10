/** Hero action CTA — maps to Sanity `actions[]` / AmplifyUP array item. */
export interface IHeroAction {
  label: string;
  href: string;
  style?: "primary" | "outline" | "ghost";
  openInNewTab?: boolean;
}

/** Secondary pill/text link — maps to Sanity `secondaryLinks[]`. */
export interface IHeroSecondaryLink {
  label: string;
  href: string;
}

/** Optional status badge (home-style). */
export interface IHeroBadge {
  text: string;
  showPulse?: boolean;
}

/**
 * Configurable Hero props for AmplifyUP / Sanity.
 * Import this interface into AmplifyUP to generate registry fields.
 * Site Hero reads these only via SDK `<Field name="…">` (Composer injects props).
 */
export interface IHero {
  /** Layout style: home-style (default) or insights listing style. */
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
