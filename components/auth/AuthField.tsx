"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/** Neoclassical text input: underline-only, label rises on focus. */
export function AuthField({
  label,
  type = "text",
  name,
  autoComplete,
  minLength,
}: {
  label: string;
  type?: string;
  name: string;
  autoComplete?: string;
  minLength?: number;
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative">
      <label htmlFor={id} className="column-label mb-2 block">
        {label}
      </label>
      <div className="flex items-center border-b border-[var(--line)] focus-within:border-[var(--accent)]">
        <input
          id={id}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          autoComplete={autoComplete}
          minLength={minLength}
          required
          className="lede w-full bg-transparent py-3 text-lg text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}