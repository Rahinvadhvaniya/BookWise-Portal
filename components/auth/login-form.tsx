"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginWithCredentials, loginWithGoogle } from "@/app/auth/actions";

type LoginFormProps = {
  callbackUrl?: string;
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginWithCredentials, undefined);

  return (
    <div className="surface w-full max-w-md rounded-2xl p-6 shadow-sm">
      <h1 className="text-3xl">Login</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Continue with Google or email + password.</p>

      <form action={loginWithGoogle} className="mt-6">
        <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/account"} />
        <button
          type="submit"
          className="w-full rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium"
        >
          Continue with Google
        </button>
      </form>

      <div className="my-5 text-center text-xs uppercase tracking-[0.2em] text-[var(--muted)]">or</div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/account"} />

        <div>
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

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none"
          />
        </div>

        {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isPending ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-5 text-sm text-[var(--muted)]">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-medium text-[var(--accent)]">
          Register
        </Link>
      </p>
    </div>
  );
}
