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



export default function Card({
  title,
  description,
  imageSrc,
  imageAlt = "",
  price,
  metadataLines = [],
}: CardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-transparent">
      <div className="relative">

          <Image
            src={imageSrc}
            alt={imageAlt || title}
            width={800}
            height={600}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />

      </div>

      <div className="flex flex-1 flex-col gap-1 bg-dark-900 p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-heading-3 text-light-300">{title}</h3>
          {price !== undefined ? (
            <span className="text-body-medium text-light-400">${price}</span>
          ) : null}
        </div>
        {description ? (
          <p className="text-body text-light-400">{description}</p>
        ) : null}
        {metadataLines.length ? (
          <div className="mt-1 space-y-0.5">
            {metadataLines.map((line, idx) => (
              <p key={idx} className="text-footnote text-light-400">
                {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
