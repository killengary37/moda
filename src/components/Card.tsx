import Image from "next/image";
import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger";

export interface CardProps {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
  price?: string | number;
  badgeText?: string;
  badgeVariant?: BadgeVariant;
  href?: string;
  metadataLines?: string[]; // e.g., ["Men's Shoes", "6 Colour"]
}

const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-[--color-light-200] text-[--color-dark-900]",
  success: "bg-[--color-green]/10 text-[--color-green]",
  warning: "bg-[--color-orange]/10 text-[--color-orange]",
  danger: "bg-[--red]/10 text-[--red]",
};

export default function Card({
  title,
  description,
  imageSrc,
  imageAlt = "",
  price,
  badgeText,
  badgeVariant = "default",
  href = "#",
  metadataLines = [],
}: CardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-[--color-light-300] bg-[--color-light-100] shadow-sm">
      <div className="relative">
        {badgeText ? (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-footnote ${badgeStyles[badgeVariant]}`}
          >
            {badgeText}
          </span>
        ) : null}
        <a href={href} className="block bg-[--color-light-200]">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            width={800}
            height={600}
            className="h-56 w-full object-cover md:h-64 lg:h-72"
            priority={false}
          />
        </a>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-heading-3 text-[--color-dark-900]">{title}</h3>
          {price !== undefined ? (
            <span className="text-body-medium text-[--color-dark-700]">${price}</span>
          ) : null}
        </div>
        {description ? (
          <p className="text-body text-[--color-dark-700]">{description}</p>
        ) : null}
        {metadataLines.length ? (
          <div className="mt-1 space-y-0.5">
            {metadataLines.map((line, idx) => (
              <p key={idx} className="text-footnote text-[--color-dark-700]">
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
