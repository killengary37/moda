import React from "react";
import Image from "next/image";

type Provider = "google" | "apple";
type Props = { onProviderClick?: (p: Provider) => void };

const btnBase =
  "w-full h-12 rounded-xl border border-[--color-light-300] bg-[--color-light-100] text-[--color-dark-900] hover:bg-[--color-light-200] transition flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-dark-900]";

export default function SocialProviders({ onProviderClick }: Props) {
  return (
    <div className="space-y-3">
      <button
        className={btnBase}
        type="button"
        aria-label="Continue with Google"
        onClick={() => onProviderClick?.("google")}
      >
        <Image src="/icons/google.svg" alt="" width={18} height={18} aria-hidden />
        <span className="text-body-medium">Continue with Google</span>
      </button>
      <button
        className={btnBase}
        type="button"
        aria-label="Continue with Apple"
        onClick={() => onProviderClick?.("apple")}
      >
        <Image src="/icons/apple.svg" alt="" width={18} height={18} aria-hidden />
        <span className="text-body-medium">Continue with Apple</span>
      </button>
    </div>
  );
}
