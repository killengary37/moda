import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex items-end bg-[--color-dark-900] text-[--color-light-100] p-10 rounded-r-3xl">
        <div className="max-w-md space-y-4">
          <div className="h-10 w-10 rounded-xl bg-[--color-light-100] flex items-center justify-center">
            <Image src="/logo.svg" alt="Moda" width={20} height={20} />
          </div>
          <h2 className="text-heading-2 leading-[var(--text-heading-2--line-height)] font-semibold">
            Just Do It
          </h2>
          <p className="text-lead text-[--color-light-400]">
            Join millions of athletes and fitness enthusiasts who trust Moda for
            performance needs.
          </p>
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[--color-light-300]" />
            <span className="h-2 w-2 rounded-full bg-[--color-light-300] opacity-60" />
            <span className="h-2 w-2 rounded-full bg-[--color-light-300] opacity-40" />
          </div>
          <p className="text-footnote text-[--color-light-400] mt-10">
            © {new Date().getFullYear()} Moda. All rights reserved.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <p className="mb-4 text-center text-body text-[--color-dark-700]">
            Already have an account?{" "}
            <Link href="/sign-in" className="underline font-medium">
              Sign In
            </Link>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
