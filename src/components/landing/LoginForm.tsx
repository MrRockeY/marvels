"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("marvels");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const currentPasswordHint = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}${minutes}`;
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginUser(username, password)) {
      router.push("/app");
      return;
    }
    setError("Invalid username or password. Use the current time in HHMM format.");
  };

  return (
    <div className="glass-panel mx-auto w-full max-w-md rounded-[28px] p-7 shadow-[0_32px_80px_rgba(37,99,235,0.14)]">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
          <LockKeyhole className="h-6 w-6" />
        </div>
        <h2 className="font-brand text-3xl font-extrabold text-slate-900">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-500">Sign in to access MARVELS School workspace</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-slate-700">
            Username
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
            <UserRound className="h-4 w-4 text-slate-400" />
            <input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="marvels"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100">
            <LockKeyhole className="h-4 w-4 text-slate-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              placeholder="Current time in HHMM"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-slate-400 transition-colors hover:text-slate-600"
              aria-label="Show or hide password"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700">
          Password hint: {currentPasswordHint}
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
      </form>
    </div>
  );
}
