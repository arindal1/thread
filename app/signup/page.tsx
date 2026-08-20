import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthField } from "@/components/auth/AuthField";

export const metadata = { title: "Sign Up — Thread" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <AuthLayout eyebrow="BEGIN YOUR THREAD" title="Create an account">
      <form action="/api/auth/signup" method="post" className="space-y-6">
        {error && (
          <p
            role="alert"
            className="border border-[var(--accent-2)] bg-[var(--accent-2)]/10 px-4 py-3 text-sm text-[var(--ink)]"
          >
            {error}
          </p>
        )}
        <AuthField label="Name" type="text" name="name" autoComplete="name" />
        <AuthField label="Email" type="email" name="email" autoComplete="email" />
        <AuthField
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          minLength={8}
        />

        <p className="text-xs leading-relaxed text-[var(--muted)]">
          By continuing, you agree that your data remains yours — Thread
          never sells or shares what you record.
        </p>

        <button
          type="submit"
          data-cursor
          className="column-label w-full border border-[var(--accent)] py-4 text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
        >
          CREATE ACCOUNT →
        </button>
      </form>

      <p className="lede mt-10 text-sm text-[var(--muted)]">
        Already have a thread?{" "}
        <Link href="/login" className="text-[var(--accent)]" data-cursor>
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}