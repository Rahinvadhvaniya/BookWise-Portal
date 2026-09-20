"use client";

import Link from "next/link";
import { useActionState } from "react";

import { registerWithCredentials } from "@/app/auth/actions";

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerWithCredentials, undefined);

  return (
    <div className="surface w-full max-w-lg rounded-2xl p-6 shadow-sm">
      <h1 className="text-3xl">Create Account</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Register with email and password. Phone login flow is structured for upcoming OTP provider integration.</p>

      <form action={formAction} className="mt-6 grid gap-4 sm:grid-cols-2">
        <input type="hidden" name="callbackUrl" value="/account" />
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="mb-1 block text-sm font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="phone" className="mb-1 block text-sm font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength={8}
            required
            className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>

        {state?.error ? <p className="sm:col-span-2 text-sm text-red-600">{state.error}</p> : null}

        <button
          type="submit"
          disabled={isPending}
          className="sm:col-span-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isPending ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium text-[var(--accent)]">
          Login
        </Link>
      </p>
    </div>
  );
}
