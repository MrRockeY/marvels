import { RequireAuth } from "@/components/auth/RequireAuth";
import { AppShell } from "@/components/layout/AppShell";
import { TemplateGallery } from "@/components/templates/TemplateGallery";

export default function TemplatesPage() {
  return (
    <RequireAuth>
      <AppShell>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#2b2117]">Worksheet templates</h1>
          <p className="mt-1 text-sm text-[#7a6c58]">
            Start from a ready-made layout — every template opens directly in the Studio, fully editable.
          </p>
        </div>
        <TemplateGallery />
      </AppShell>
    </RequireAuth>
  );
}
