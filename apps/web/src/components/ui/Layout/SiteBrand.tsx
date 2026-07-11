import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PROFILE_IMAGE = "/images/dylan.jpg";

interface SiteBrandProps {
  showName?: boolean;
  className?: string;
  imageClassName?: string;
}

export function SiteBrand({
  showName = true,
  className,
  imageClassName,
}: SiteBrandProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 shrink-0 no-underline",
        className
      )}
    >
      <div
        className={cn(
          "relative h-9 w-9 overflow-hidden rounded-lg bg-primary/10 ring-2 ring-primary/15 transition-shadow group-hover:ring-primary/30",
          imageClassName
        )}
      >
        <Image
          src={PROFILE_IMAGE}
          alt="Dylan Young"
          fill
          sizes="36px"
          className="object-cover object-[center_15%] scale-110"
          priority
        />
      </div>
      {showName && (
        <span className="hidden items-baseline gap-px text-base font-semibold tracking-tight sm:inline-flex">
          <span className="text-foreground">Dylan</span>
          <span className="text-primary">young</span>
          <span className="font-mono text-[0.92em] font-medium text-muted-foreground transition-colors group-hover:text-primary/75">
            .dev
          </span>
        </span>
      )}
    </Link>
  );
}
