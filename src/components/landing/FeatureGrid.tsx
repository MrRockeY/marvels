import { BookOpenText, BriefcaseBusiness, ShieldCheck, Sparkles } from "lucide-react";

const features = [
  {
    title: "Smart lesson flow",
    text: "Create polished classroom content with a streamlined workflow designed for modern schools.",
    icon: BookOpenText,
  },
  {
    title: "Safe access",
    text: "Simple browser-based login keeps the school portal protected without unnecessary complexity.",
    icon: ShieldCheck,
  },
  {
    title: "Professional output",
    text: "Deliver print-ready worksheets and learning materials with a refined, premium finish.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Modern design",
    text: "Clean interfaces, smooth transitions, and thoughtful motion make the experience feel premium.",
    icon: Sparkles,
  },
];

export function FeatureGrid() {
  return (
    <section className="px-4 pb-20 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">Why families choose us</p>
          <h2 className="mt-3 font-brand text-3xl font-bold text-slate-900 md:text-4xl">Everything your school community needs.</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, text, icon: Icon }) => (
            <div key={title} className="glass-panel rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
