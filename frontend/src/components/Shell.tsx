import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { CASE } from "@/lib/forensic-data";
import { Badge } from "@/components/ui/primitives";
import { CustodyDrawer } from "@/components/CustodyDrawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LayoutDashboard, Grid2X2, Files, Network, FileText, Menu, Copy, ArrowLeftRight, Download, ShieldCheck } from "lucide-react";

const NAV = [
  { to: "/", label: "Overview & Dashboard", sub: "Benchmark", code: "01", icon: LayoutDashboard },
  { to: "/heatmap", label: "4 KB Disk Heatmap", sub: "Hex Inspector", code: "02", icon: Grid2X2 },
  { to: "/artifacts", label: "Evidence Explorer", sub: "Fragment Diff", code: "03", icon: Files },
  { to: "/graph", label: "Relationship Graph", sub: "TLSH Node Map", code: "04", icon: Network },
  { to: "/report", label: "Case Report", sub: "Court Dossier", code: "05", icon: FileText },
] as const;

export function Shell({ children, title }: { children: ReactNode; title?: string }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {open && (
         <Button
           variant="ghost"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 h-full w-full rounded-none bg-slate-900/40 backdrop-blur-xs lg:hidden"
         />
      )}
      <aside
        className={`no-print fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-[#0f172a] text-slate-200 transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
         <Link to="/locker" className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-5">
          <span className="grid size-8 place-items-center rounded-md border border-indigo-500/40 bg-indigo-500/20 font-mono text-xs font-bold text-indigo-400 shadow-xs">
            EV
          </span>
          <div>
            <span className="block text-sm font-bold tracking-wide text-white">EVIDRA</span>
            <span className="block font-mono text-[10px] tracking-widest text-indigo-400 uppercase">RECON WORKSTATION</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1.5 p-3">
          <p className="px-2 pb-2 font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Navigation</p>
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "border-indigo-500/40 bg-indigo-600/15 text-white font-medium shadow-xs" }}
              inactiveProps={{
                className: "border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-200",
              }}
              className="group flex items-center gap-3 rounded-md border px-3 py-2.5 transition-all"
            >
              <n.icon size={17} className="shrink-0 text-indigo-400 transition-transform group-hover:scale-110" />
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] leading-tight">{n.label}</span>
                <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{n.code} · {n.sub}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-3.5 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-md border border-slate-700 bg-slate-800 font-mono text-xs font-semibold text-slate-200">
              JB
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-200">{CASE.examiner}</p>
              <p className="truncate text-[10px] text-slate-400">Senior Forensics Examiner</p>
            </div>
             <Link to="/login" className="text-[10px] font-mono uppercase text-indigo-400 hover:text-indigo-300">
               Logout
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
         <header className="no-print sticky top-0 z-30 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-6 py-2.5 backdrop-blur-md shadow-xs">
           <div className="flex items-center gap-3">
             <Button variant="outline" size="icon"
              onClick={() => setOpen(true)}
               className="shrink-0 rounded-md border-slate-200 lg:hidden"
              aria-label="Open menu"
            >
               <Menu size={18}/>
             </Button>
             <div className="flex min-w-0 items-center gap-x-4 gap-y-1 text-xs">
              <span className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Case</span>
                <span className="font-mono font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2 py-0.5 rounded-md">{CASE.id}</span>
              </span>
              <span className="hidden items-center gap-2 md:flex border-l border-slate-200 pl-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Target Image</span>
                <span className="font-mono text-slate-700 font-medium">{CASE.imageName}</span>
              </span>
            </div>
           </div>

           <div className="flex items-center gap-2">
             <Button variant="outline" size="sm"
              onClick={() => {
                void navigator.clipboard?.writeText(CASE.sha256);
                setCopied(true);
                toast.success("SHA-256 hash copied to clipboard");
                setTimeout(() => setCopied(false), 1400);
              }}
              title={CASE.sha256}
              className="hidden h-8 items-center gap-2 rounded-md border-emerald-200 bg-emerald-50 px-2.5 text-xs text-emerald-700 hover:bg-emerald-100 sm:flex"
            >
              <span className="font-mono text-[10px] font-bold">SHA-256</span>
              <span className="font-mono text-slate-800 font-medium">{CASE.sha256.slice(0, 10)}…{CASE.sha256.slice(-6)}</span>
              <Copy size={13}/>
             </Button>

             <Badge tone="intact" className="hidden xl:inline-flex bg-emerald-50 border-emerald-200 text-emerald-700 normal-case font-medium">
               <ShieldCheck size={13} className="text-emerald-600"/> Read-only Custody (MMAP)
             </Badge>
             
             <CustodyDrawer />
             <Button asChild variant="outline" size="sm" className="h-8 rounded-md border-slate-200 text-slate-700 hover:bg-slate-50"><Link to="/locker"><ArrowLeftRight size={14}/> <span className="hidden sm:inline">Cases</span></Link></Button>
             <Button asChild size="sm" className="h-8 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"><Link to="/report"><Download size={14}/> <span className="hidden sm:inline">Export Dossier</span></Link></Button>
           </div>
        </header>

         <main className="w-full min-w-0 flex-1 px-6 py-8 lg:px-10">
           {title && (
             <div className="mb-6 pb-4 border-b border-slate-200/80">
               <p className="font-mono text-[11px] font-semibold tracking-wider text-indigo-600 uppercase">Case Investigation / {CASE.id}</p>
               <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
             </div>
           )}
          {children}
        </main>
      </div>
    </div>
  );
}
