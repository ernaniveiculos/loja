import Link from "next/link";
import { cn } from "@/lib/utils";
import { LOGO_DATA_URI } from "@/lib/brand-assets";

const RATIO = 1600 / 686;

export function Logo({ className, height = 40, linkToHome = true }: { className?: string; height?: number; linkToHome?: boolean }) {
  const width = Math.round(height * RATIO);
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_DATA_URI}
      alt="Ernani Veículos"
      width={width}
      height={height}
      className="object-contain"
    />
  );

  if (!linkToHome) {
    return <div className={cn("flex items-center", className)}>{img}</div>;
  }

  return (
    <Link href="/" className={cn("flex items-center", className)} aria-label="Ernani Veículos — página inicial">
      {img}
    </Link>
  );
}
