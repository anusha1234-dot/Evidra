import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { CASE } from "@/lib/forensic-data";
import { CustodyDrawer } from "@/components/CustodyDrawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Grid2X2,
  Files,
  Network,
  FileText,
  Menu,
  Copy,
  ShieldCheck,
  FolderTree,
  Clock,
  Search,
  StickyNote,
  History,
  Download,
  Link as LinkIcon,
  CheckCircle2,
  HardDrive
} from "lucide-react";

const NAV_MAIN = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/artifacts", label: "Evidence", badge: "42", icon: Files },
  { to: "/heatmap", label: "Block map", icon: Grid2X2 },
  { to: "/graph", label: "File system", icon: FolderTree },
  { to: "/report", label: "Timeline", icon: Clock },
  { to: "/artifacts", label: "Findings", badge: "3", icon: Search },
] as const;

const NAV_TOOLS = [
  { to: "/notes", label: "Notes", icon: StickyNote },
  { to: "/report", label: "Reports", icon: FileText },
  { to: "/audit", label: "Audit log", icon: History },
] as const;

export function Shell({ children, title }: { children: ReactNode; title?: string }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#f6f4ee] text-[#1c2024]">
      {open && (
         <Button
           variant="ghost"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 h-full w-full rounded-none bg-black/20 backdrop-blur-xs lg:hidden"
         />
      )}
      <aside
        className={`no-print fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#e4e0d5] bg-[#eae7dd] text-[#1c2024] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link to="/" className="flex h-16 items-center gap-3 border-b border-[#ded9cc] px-5">
          <span className="grid size-8 place-items-center rounded-md border border-[#1c2024]/20 bg-[#1c2024] font-mono text-xs font-bold text-white shadow-xs">
            EV
          </span>
          <div>
            <span className="block text-sm font-bold tracking-tight text-[#1c2024]">EVIDRA</span>
            <span className="block font-mono text-[9px] font-semibold tracking-widest text-[#60646c] uppercase">RECON</span>
          </div>
        </Link>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          <div>
            <p className="px-2.5 pb-2 font-mono text-[10px] font-bold tracking-wider text-[#60646c] uppercase">Investigation</p>
            <div className="space-y-1">
              {NAV_MAIN.map((n) => (
                <Link
                  key={n.to + n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{ className: "bg-white text-[#1c2024] font-semibold border-[#d2cebf] shadow-xs" }}
                  inactiveProps={{
                    className: "border-transparent text-[#60646c] hover:bg-[#e2dec] hover:text-[#1c2024]",
                  }}
                  className="group flex items-center justify-between rounded-md border px-3 py-2 text-xs transition-all"
                >
                  <div className="flex items-center gap-3">
                    <n.icon size={16} className="shrink-0 text-[#60646c] group-hover:text-[#1c2024]" />
                    <span>{n.label}</span>
                  </div>
                  {"badge" in n && (
                    <span className="rounded-full bg-[#1c2024]/10 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1c2024]">
                      {n.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="px-2.5 pb-2 font-mono text-[10px] font-bold tracking-wider text-[#60646c] uppercase">Case Tools</p>
            <div className="space-y-1">
              {NAV_TOOLS.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "bg-white text-[#1c2024] font-semibold border-[#d2cebf] shadow-xs" }}
                  inactiveProps={{
                    className: "border-transparent text-[#60646c] hover:bg-[#e2dec] hover:text-[#1c2024]",
                  }}
                  className="group flex items-center gap-3 rounded-md border px-3 py-2 text-xs transition-all"
                >
                  <n.icon size={16} className="shrink-0 text-[#60646c] group-hover:text-[#1c2024]" />
                  <span>{n.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Integrity status card */}
          <div className="mt-4 rounded-lg border border-[#059669]/30 bg-[#059669]/10 p-3 text-xs">
            <div className="flex items-center gap-2 text-[#059669] font-bold">
              <CheckCircle2 size={15} />
              <span>Integrity verified</span>
            </div>
            <p className="mt-1 font-mono text-[10px] text-[#059669]/80">
              Last hash check 09:42:10 UTC
            </p>
          </div>
        </div>

        <div className="border-t border-[#ded9cc] p-3.5 bg-[#e4e0d5]">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-[#1c2024] font-mono text-xs font-semibold text-white">
              MK
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-[#1c2024]">{CASE.examiner}</p>
              <p className="truncate text-[10px] text-[#60646c]">Lead Examiner</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="no-print sticky top-0 z-30 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-[#e4e0d5] bg-[#f6f4ee]/95 px-6 py-2.5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(true)}
              className="shrink-0 rounded-md border-[#e4e0d5] lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </Button>
            <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#60646c]">ACTIVE CASE</span>
                <span className="font-mono font-bold text-[#1c2024] border-b border-dashed border-[#1c2024]">{CASE.id}</span>
              </div>
              <div className="flex items-center gap-2 border-l border-[#e4e0d5] pl-4">
                <HardDrive size={15} className="text-[#60646c]" />
                <span className="font-mono font-bold text-[#1c2024]">{CASE.imageName}</span>
                <span className="font-mono text-[11px] text-[#60646c]">· {CASE.imageSizeMb} MB · 18,384 blocks</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#059669]/30 bg-[#059669]/10 px-3 py-1 font-mono text-[11px] font-semibold text-[#059669]">
              <ShieldCheck size={14} /> READ-ONLY EVIDENCE
            </span>
            <CustodyDrawer />
            <Button asChild size="sm" className="h-8 rounded-md bg-[#1c2024] text-white hover:bg-black shadow-xs font-semibold text-xs">
              <Link to="/report">
                <Download size={14} className="mr-1.5" /> Export
              </Link>
            </Button>
          </div>
        </header>

        <main className="w-full min-w-0 flex-1 px-6 py-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
