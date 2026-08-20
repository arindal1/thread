import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthField } from "@/components/auth/AuthField";

export const metadata = { title: "Log In - Thread" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <AuthLayout eyebrow="WELCOME BACK" title="Log in to Thread">
      <form action="/api/auth/login" method="post" className="space-y-6">
        {next && <input type="hidden" name="next" value={next} />}
        {error && (
          <p
            role="alert"
            className="border border-[var(--accent-2)] bg-[var(--accent-2)]/10 px-4 py-3 text-sm text-[var(--ink)]"
          >
            {error}
          </p>
        )}
        <AuthField label="Email" type="email" name="email" autoComplete="email" />
        <AuthField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
        />

        <button
          type="submit"
          data-cursor
          className="column-label w-full border border-[var(--accent)] py-4 text-[var(--accent)] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
        >
          ENTER →
        </button>
      </form>

      <p className="lede mt-10 text-sm text-[var(--muted)]">
        New to Thread?{" "}
        <Link href="/signup" className="text-[var(--accent)]" data-cursor>
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}