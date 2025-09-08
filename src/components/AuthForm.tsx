"use client";

import React, { useState } from "react";
import Link from "next/link";
import SocialProviders from "./SocialProviders";

type Mode = "sign-in" | "sign-up";
type Props = { mode: Mode };

export default function AuthForm({ mode }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const title = mode === "sign-up" ? "Join Moda Today!" : "Welcome Back";
  const cta = mode === "sign-up" ? "Sign Up" : "Sign In";
  const altHref = mode === "sign-up" ? "/sign-in" : "/sign-up";
  const altText =
    mode === "sign-up" ? "Already have an account? Sign In" : "New here? Create an account";

  return (
    <div className="space-y-6">
      <h1 className="text-center text-heading-3 leading-[var(--text-heading-3--line-height)] font-medium text-[--color-dark-900]">
        {title}
      </h1>
      <p className="text-center text-body text-[--color-dark-700]">
        {mode === "sign-up" ? "Create your account to start your journey" : "Sign in to continue"}
      </p>

      <SocialProviders />

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[--color-light-300]" />
        <span className="text-footnote text-[--color-dark-700]">
          Or {mode === "sign-up" ? "sign up" : "continue"} with
        </span>
        <div className="h-px flex-1 bg-[--color-light-300]" />
      </div>

      <form className="space-y-4" action="#" method="post" noValidate>
        {mode === "sign-up" && (
          <div className="space-y-2">
            <label htmlFor="name" className="text-footnote text-[--color-dark-700]">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Enter your full name"
              className="h-12 w-full rounded-xl border border-[--color-light-300] bg-[--color-light-100] px-4 text-body text-[--color-dark-900] placeholder:text-[--color-dark-500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-dark-900]"
            />
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-footnote text-[--color-dark-700]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="johndoe@gmail.com"
            className="h-12 w-full rounded-xl border border-[--color-light-300] bg-[--color-light-100] px-4 text-body text-[--color-dark-900] placeholder:text-[--color-dark-500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-dark-900]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-footnote text-[--color-dark-700]">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={mode === "sign-up" ? "minimum 8 characters" : "your password"}
              className="h-12 w-full rounded-xl border border-[--color-light-300] bg-[--color-light-100] px-4 pr-12 text-body text-[--color-dark-900] placeholder:text-[--color-dark-500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-dark-900]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-2 my-2 inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-[--color-light-200]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        {mode === "sign-in" && (
          <div className="flex justify-end">
            <a href="#" className="text-footnote underline">
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          className="w-full h-12 rounded-xl bg-[--color-dark-900] text-[--color-light-100] text-body-medium hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-dark-900]"
        >
          {cta}
        </button>
      </form>

      <p className="text-center text-footnote text-[--color-dark-700]">
        {mode === "sign-up" ? (
          <>
            By signing up, you agree to our <a className="underline" href="#">Terms of Service</a> and{" "}
            <a className="underline" href="#">Privacy Policy</a>.
          </>
        ) : (
          <Link href={altHref} className="underline">
            {altText}
          </Link>
        )}
      </p>
    </div>
  );
}
