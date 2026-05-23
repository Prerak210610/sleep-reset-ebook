"use client";

import { useEffect, useState } from "react";
import { resolveAsset } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface Props {
  path: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  style?: React.CSSProperties;
}

/**
 * Loads an image from Firebase Storage by path. Until the asset is uploaded,
 * shows a tasteful warm placeholder (grain + soft cream) — never a broken image.
 */
export default function StorageImage({ path, alt, className, fallbackClassName, style }: Props) {
  const [url, setUrl] = useState<string>("");
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let mounted = true;
    resolveAsset(path).then((u) => {
      if (mounted) setUrl(u);
    });
    return () => {
      mounted = false;
    };
  }, [path]);

  if (!url || errored) {
    return (
      <div
        className={cn(
          "relative grain bg-creme-warm dark:bg-forest/60 flex items-center justify-center",
          fallbackClassName ?? className
        )}
      >
        <span className="font-accent text-xs tracking-widest uppercase opacity-50">
          {path.split("/").pop()}
        </span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={className}
      style={style}
    />
  );
}
