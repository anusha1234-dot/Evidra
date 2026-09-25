import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/Shell";
import { Badge } from "@/components/ui/primitives";
import { useCaseOverview } from "@/lib/api";
import { CASE } from "@/lib/forensic-data";
import {
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  ShieldCheck,
  Layers,
  FileCheck2,
  PieChart as PieIcon,
  BarChart3,
  HardDrive
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Evidra RECON Forensic Workstation" },
      {
        name: "description",
        content: "Evidra RECON case dashboard: evidence block profile, acquisition record, and activity log.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  const { data } = useCaseOverview();
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"composition" | "entropy">("composition");

  const copyHash = () => {
    void navigator.clipboard?.writeText(CASE.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Shell>
      {/* Title Header Row */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 pb-4 border-b border-[#e4e0d5]">
        <div>
          <p className="font-mono text-[11px] font-bold tracking-wider text-[#60646c] uppercase">
            INVESTIGATION / <span className="text-[#1c2024]">{CASE.id}</span>
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#1c2024]">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#60646c] bg-white border border-[#e4e0d5] px-3 py-1.5 rounded-md shadow-xs">
          <CheckCircle2 size={14} className="text-[#059669]" />
          <span>Analysis complete 09:42 UTC</span>
        </div>
      </div>

      {/* Top Row: 4 Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-xl border border-[#e4e0d5] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-bold tracking-wider text-[#60646c] uppercase">SCANNED BLOCKS</p>
            <div className="grid size-7 place-items-center rounded-md bg-[#059669]/10 text-[#059669]">
              <Layers size={15} />
            </div>
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-[#1c2024]">18,384</p>
          <p className="mt-1 font-mono text-[11px] text-[#60646c]">18,384 processed</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border border-[#e4e0d5] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-bold tracking-wider text-[#60646c] uppercase">RECOVERED FILES</p>
            <div className="grid size-7 place-items-center rounded-md bg-[#2563eb]/10 text-[#2563eb]">
              <FileCheck2 size={15} />
            </div>
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-[#1c2024]">42</p>
          <p className="mt-1 font-mono text-[11px] text-[#60646c]">38 intact · 4 partial</p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border border-[#e4e0d5] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-bold tracking-wider text-[#60646c] uppercase">ENTROPY SCORE</p>
            <div className="grid size-7 place-items-center rounded-md bg-[#0284c7]/10 text-[#0284c7]">
              <PieIcon size={15} />
            </div>
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-[#1c2024]">94%</p>
          <p className="mt-1 font-mono text-[11px] text-[#60646c]">high-entropy media</p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border border-[#e4e0d5] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-bold tracking-wider text-[#60646c] uppercase">ANOMALOUS PATTERNS</p>
            <div className="grid size-7 place-items-center rounded-md bg-[#d97706]/10 text-[#d97706]">
              <AlertTriangle size={15} />
            </div>
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-[#1c2024]">3</p>
          <p className="mt-1 font-mono text-[11px] text-[#d97706] font-medium">require examiner review</p>
        </div>
      </div>

      {/* Middle Row Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Evidence Block Profile */}
        <div className="lg:col-span-2 rounded-xl border border-[#e4e0d5] bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#f0eee6] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#1c2024]">Evidence block profile</h2>
              <p className="font-mono text-[11px] text-[#60646c]">Classification across the acquired image</p>
            </div>
            <div className="flex items-center gap-1 rounded-md border border-[#e4e0d5] bg-[#f6f4ee] p-0.5 font-mono text-[11px]">
              <button
                onClick={() => setTab("composition")}
                className={`rounded-sm px-2.5 py-1 transition-all ${
                  tab === "composition" ? "bg-white text-[#1c2024] font-bold shadow-xs" : "text-[#60646c]"
                }`}
              >
                Composition
              </button>
              <button
                onClick={() => setTab("entropy")}
                className={`rounded-sm px-2.5 py-1 transition-all ${
                  tab === "entropy" ? "bg-white text-[#1c2024] font-bold shadow-xs" : "text-[#60646c]"
                }`}
              >
                Entropy
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-5">
            {/* Horizontal Block Distribution Bar */}
            <div>
              <div className="flex justify-between font-mono text-[11px] font-bold text-[#60646c] mb-2">
                <span>BLOCK DISTRIBUTION</span>
                <span>18,384 total</span>
              </div>
              <div className="flex h-4 overflow-hidden rounded-md bg-[#f0eee6]">
                <div style={{ width: "47.9%" }} className="bg-[#059669] hover:opacity-90" title="Allocated (47.9%)" />
                <div style={{ width: "14.1%" }} className="bg-[#0284c7] hover:opacity-90" title="File slack (14.1%)" />
                <div style={{ width: "33.5%" }} className="bg-[#8b909a] hover:opacity-90" title="Unallocated (33.5%)" />
                <div style={{ width: "4.5%" }} className="bg-[#d97706] hover:opacity-90" title="Flagged (4.5%)" />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[11px] text-[#60646c] sm:grid-cols-4">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-xs bg-[#059669]" />
                  <span>Allocated <b>47.9%</b></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-xs bg-[#0284c7]" />
                  <span>File slack <b>14.1%</b></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-xs bg-[#8b909a]" />
                  <span>Unallocated <b>33.5%</b></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-xs bg-[#d97706]" />
                  <span>Flagged <b>4.5%</b></span>
                </div>
              </div>
            </div>

            {/* Primary Evidence Type Highlight Box */}
            <div className="rounded-lg border border-[#2563eb]/20 bg-[#2563eb]/5 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] font-bold tracking-wider text-[#2563eb] uppercase">PRIMARY EVIDENCE TYPE</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-[#1c2024]">10×</p>
                  <p className="text-xs text-[#60646c] mt-0.5">Disk / corrupt output signatures recovered</p>
                </div>
                <div className="grid size-9 place-items-center rounded-lg bg-white border border-[#2563eb]/20 text-[#2563eb] shadow-xs">
                  <BarChart3 size={18} />
                </div>
              </div>
            </div>

            {/* Entropy Profile Bar Chart */}
            <div>
              <div className="flex items-center justify-between font-mono text-[11px] text-[#60646c] mb-2">
                <span className="font-bold">ENTROPY PROFILE</span>
                <span>-- Review Threshold: 7.5</span>
              </div>
              <div className="flex h-24 items-end gap-1 rounded-md border border-[#e4e0d5] bg-[#f6f4ee] p-3">
                {[0.4, 0.6, 0.9, 0.3, 0.75, 0.95, 0.82, 0.45, 0.9, 0.6, 0.4, 0.88, 0.92, 0.55, 0.78, 0.35, 0.85, 0.96, 0.4, 0.7, 0.88, 0.5, 0.92, 0.65].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-xs transition-all hover:opacity-80 ${
                      h > 0.85 ? "bg-[#dc2626]" : h > 0.7 ? "bg-[#d97706]" : "bg-[#0d9488]"
                    }`}
                    style={{ height: `${h * 100}%` }}
                    title={`Block Cluster #${i}: ${(h * 8).toFixed(2)} bits/byte`}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-[#60646c]">
                <span>0x00000000</span>
                <span>9.2k blocks</span>
                <span>0x01700000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 Col): Acquisition Record */}
        <div className="rounded-xl border border-[#e4e0d5] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#f0eee6] pb-4">
              <h2 className="text-base font-bold text-[#1c2024]">Acquisition record</h2>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#059669]/30 bg-[#059669]/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#059669]">
                ✓ VERIFIED
              </span>
            </div>

            <dl className="mt-4 divide-y divide-[#f0eee6] font-mono text-xs">
              <div className="flex justify-between py-2.5">
                <dt className="text-[#60646c] font-medium">IMAGE</dt>
                <dd className="font-bold text-[#1c2024]">{CASE.imageName}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#60646c] font-medium">SIZE</dt>
                <dd className="text-[#1c2024]">8.0 GB · 18,384 blocks</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#60646c] font-medium">ACQUIRED</dt>
                <dd className="text-[#1c2024]">2024-09-24 22:18:04 UTC</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#60646c] font-medium">EXAMINER</dt>
                <dd className="text-[#1c2024]">Mark Kessler - DFR-045</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#60646c] font-medium">EVIDENCE ID</dt>
                <dd className="text-[#1c2024]">EV-2024-0918-A01</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-[#60646c] font-medium">FORMAT</dt>
                <dd className="text-[#1c2024]">RAW / Sector-aligned</dd>
              </div>
            </dl>
          </div>

          {/* SHA-256 Fingerprint Green Box */}
          <div className="mt-6 rounded-lg border border-[#059669]/25 bg-[#059669]/5 p-3.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-[#059669] uppercase">SHA-256 FINGERPRINT</span>
              <button
                onClick={copyHash}
                className="flex items-center gap-1 font-mono text-[10px] text-[#059669] hover:underline"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <p className="mt-1.5 break-all font-mono text-[11px] font-semibold text-[#059669]">
              78a231fec3a856e1d...b4d4a5c4d7d44e0a
            </p>
            <p className="mt-3 font-mono text-[10px] text-[#60646c]">
              🔒 Write-blocker Win32 · Seal intact · Manifest linked
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity Events Table */}
      <div className="mt-6 rounded-xl border border-[#e4e0d5] bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f0eee6] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#1c2024]">Recent activity events</h2>
            <p className="font-mono text-[11px] text-[#60646c]">Cumulative investigation log - newest first</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-md border border-[#e4e0d5] bg-white px-3 py-1 font-mono text-xs font-semibold text-[#1c2024] hover:bg-[#f6f4ee]">
              All events
            </button>
            <button className="rounded-md border border-[#1c2024] bg-[#1c2024] px-3 py-1 font-mono text-xs font-semibold text-white hover:bg-black flex items-center gap-1">
              <span>View audit log</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#e4e0d5] text-[10px] font-bold uppercase tracking-wider text-[#60646c]">
                <th className="py-2.5 pr-4">UTC TIME</th>
                <th className="py-2.5 px-4">TYPE</th>
                <th className="py-2.5 px-4">EVENT</th>
                <th className="py-2.5 px-4">ACTOR</th>
                <th className="py-2.5 pl-4 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0eee6]">
              <tr className="hover:bg-[#f6f4ee]/60 transition-colors">
                <td className="py-3 pr-4 font-bold text-[#1c2024]">09:42:18</td>
                <td className="py-3 px-4 text-[#60646c]">SCAN</td>
                <td className="py-3 px-4 font-semibold text-[#1c2024]">
                  18,384 blocks classified <span className="font-normal text-[#60646c]">- Full image pass completed - 94% mean entropy</span>
                </td>
                <td className="py-3 px-4 text-[#60646c]">Recon engine</td>
                <td className="py-3 pl-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#059669]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
                    ✓ Complete
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#f6f4ee]/60 transition-colors">
                <td className="py-3 pr-4 font-bold text-[#1c2024]">09:38:05</td>
                <td className="py-3 px-4 text-[#d97706]">FINDING</td>
                <td className="py-3 px-4 font-semibold text-[#1c2024]">
                  Encrypted container signature detected <span className="font-normal text-[#60646c]">- Offset 0x00B1A000 - 128 contiguous blocks</span>
                </td>
                <td className="py-3 px-4 text-[#60646c]">Pattern rule 7A</td>
                <td className="py-3 pl-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#d97706]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#d97706]">
                    🚩 Flagged
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#f6f4ee]/60 transition-colors">
                <td className="py-3 pr-4 font-bold text-[#1c2024]">09:31:52</td>
                <td className="py-3 px-4 text-[#2563eb]">RECOVERY</td>
                <td className="py-3 px-4 font-semibold text-[#1c2024]">
                  Six partial files reconstructed <span className="font-normal text-[#60646c]">- JPEG: 3 · PDF: 2 · SQLITE: 1</span>
                </td>
                <td className="py-3 px-4 text-[#60646c]">Carving module</td>
                <td className="py-3 pl-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#059669]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
                    ✓ Complete
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#f6f4ee]/60 transition-colors">
                <td className="py-3 pr-4 font-bold text-[#1c2024]">09:24:37</td>
                <td className="py-3 px-4 text-[#059669]">INTEGRITY</td>
                <td className="py-3 px-4 font-semibold text-[#1c2024]">
                  Source fingerprint revalidated <span className="font-normal text-[#60646c]">- SHA-256 matched acquisition manifest</span>
                </td>
                <td className="py-3 px-4 text-[#60646c]">ML Kernel</td>
                <td className="py-3 pl-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#059669]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#059669]">
                    ✓ Verified
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-[#f6f4ee]/60 transition-colors">
                <td className="py-3 pr-4 font-bold text-[#1c2024]">09:19:10</td>
                <td className="py-3 px-4 text-[#d97706]">FINDING</td>
                <td className="py-3 px-4 font-semibold text-[#1c2024]">
                  Timestamp discontinuity isolated <span className="font-normal text-[#60646c]">- NTFS $MFT entry 1042-1078 +14h skew</span>
                </td>
                <td className="py-3 px-4 text-[#60646c]">Timeline rule 3C</td>
                <td className="py-3 pl-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#d97706]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#d97706]">
                    🚩 Flagged
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
