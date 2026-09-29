"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel relative overflow-hidden rounded-[32px] px-6 py-8 shadow-[0_30px_80px_rgba(37,99,235,0.12)] md:px-10 md:py-12">
          <div className="floaty-ring left-6 top-10 h-28 w-28 bg-blue-100/30" />
          <div className="floaty-ring right-10 top-16 h-40 w-40 bg-indigo-100/30" style={{ animationDelay: "1s" }} />
          <div className="floaty-ring bottom-8 left-1/4 h-32 w-32 bg-cyan-100/30" style={{ animationDelay: "2.2s" }} />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-xl">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Modern learning studio
              </span>

              <h1 className="font-brand text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                A brighter future starts with a smarter learning experience.
              </h1>

              <p className="mt-5 max-w-lg text-base leading-8 text-slate-600 md:text-lg">
                MARVELS School helps students, teachers, and families learn with confidence through a polished
                digital classroom, guided worksheets, and a premium school experience built for focus.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Enter portal
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/app">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Studio
                  </Button>
                </Link>
              </div>

              <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-left">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                  <p className="text-2xl font-extrabold text-blue-700">1200+</p>
                  <p className="mt-1 text-xs text-slate-500">Learners</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                  <p className="text-2xl font-extrabold text-blue-700">40+</p>
                  <p className="mt-1 text-xs text-slate-500">Teachers</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-3">
                  <p className="text-2xl font-extrabold text-blue-700">98%</p>
                  <p className="mt-1 text-xs text-slate-500">Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="hero-glow relative overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-br from-sky-100 via-white to-blue-100 p-4 shadow-[0_35px_70px_rgba(59,130,246,0.18)]">
                <div className="rounded-[24px] bg-white/85 p-5 shadow-inner">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">School dashboard</p>
                      <h2 className="mt-2 text-xl font-bold text-slate-900">Today&apos;s focus</h2>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Live</span>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-blue-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <BookOpen className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">Reading & writing</p>
                            <p className="text-xs text-slate-500">Track progress</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-blue-700">84%</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                            <GraduationCap className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">Knowledge growth</p>
                            <p className="text-xs text-slate-500">This week</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-indigo-700">+12%</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
                            <ShieldCheck className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">Safe environment</p>
                            <p className="text-xs text-slate-500">Protected access</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-emerald-700">Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
