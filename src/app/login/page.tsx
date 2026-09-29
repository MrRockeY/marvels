"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/landing/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition-colors hover:text-blue-800">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            MARVELS School
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 text-center lg:text-left">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Secure portal
            </span>
            <h1 className="font-brand text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Access your school workspace.
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              Sign in with your secure school credentials to dive into lesson planning, worksheets, and classroom-ready content.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
