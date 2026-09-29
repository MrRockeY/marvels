import Link from "next/link";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HeroSection } from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden pb-12">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-200">
              M
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-slate-700">MARVELS</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">School</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700">Features</a>
            <a href="#about" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700">About</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-700">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-700">Login</Link>
            <Link href="/login" className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <HeroSection />
      <div id="features">
        <FeatureGrid />
      </div>

      <section id="about" className="px-4 pb-20 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] border border-slate-200 bg-white/70 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.05)] md:grid-cols-2 md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">School overview</p>
            <h2 className="mt-4 font-brand text-3xl font-bold text-slate-900 md:text-4xl">A truly modern education platform.</h2>
          </div>
          <div className="space-y-4 text-base leading-8 text-slate-600">
            <p>
              MARVELS School blends comfort, clarity, and structure into one premium digital learning environment.
              Built for student growth, teacher efficiency, and parent confidence, every touchpoint is refined for an exceptional educational experience.
            </p>
            <p>
              From classroom planning to protected access and polished learning assets, the platform keeps the school experience focused, organized, and beautifully simple.
            </p>
          </div>
        </div>
      </section>

      <footer id="contact" className="px-4 pb-10 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center text-white shadow-[0_30px_80px_rgba(37,99,235,0.22)] md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Ready to begin?</p>
            <h3 className="mt-2 text-2xl font-bold">Create a brighter experience for your school.</h3>
          </div>
          <Link href="/login" className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition-opacity hover:opacity-95">
            Access portal
          </Link>
        </div>
      </footer>
    </main>
  );
}
