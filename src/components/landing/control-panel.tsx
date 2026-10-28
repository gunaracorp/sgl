"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  JWDS_COLORS,
  JWDS_ROLES,
  JWDS_SECTION_PATTERNS,
  resolveJwdsRole,
  type JwdsRoleConfig,
} from "@/lib/design-tokens";

/**
 * ═════════════════════════════════════════════════════════════════
 *  JW PANEL KENDALI — Role Activation System (JWDS v1.0)
 * ═════════════════════════════════════════════════════════════════
 *  Sistem aktivasi tersembunyi untuk tim internal. Tidak mengubah
 *  satu pixel pun bagi pengunjung biasa — 100% client-side, aman
 *  untuk static export cPanel.
 *
 *  Cara membuka:
 *  1. Tambah #panel di URL        → sgl.web.id/#panel
 *  2. Tekan Shift + P di keyboard
 *  3. Ketuk logo footer 5× cepat
 *
 *  Role: 👑 Pemilik (RAJA-95) · 🎨 Desainer (JWDS-95) · 🧺 Staf (STAF-95)
 *  Kode dirahasiakan — lihat DESIGN-SYSTEM.md (internal only).
 * ═════════════════════════════════════════════════════════════════
 */

const LS = {
  session: "jw_session",
  leads: "jw_leads",
  audit: "jw_audit",
  promo: "jw_promo",
  designer: "jw_designer",
} as const;

const DAY_MS = 86_400_000;

type JwSession = {
  role: JwdsRoleConfig["role"];
  at: number;
  exp: number;
};

type JwLeads = Record<string, number>;

type JwAuditEntry = { role: string; at: number };

type JwPromo = { enabled: boolean; text: string };

const DEFAULT_PROMO: JwPromo = {
  enabled: false,
  text: "✨ PROMO SPESIAL: Gratis antar-jemput area Pedurungan (min. 3 kg) — chat kami sekarang!",
};

const SECTION_LABELS: Record<string, string> = {
  beranda: "Hero",
  keunggulan: "Keunggulan",
  layanan: "Layanan",
  "cara-pesan": "Cara Pesan",
  harga: "Harga",
  testimoni: "Testimoni",
  lokasi: "Outlet",
  faq: "FAQ",
  kontak: "Kontak",
  lainnya: "Halaman Lain",
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage penuh / private mode — abaikan */
  }
}

function sessionRole(session: JwSession | null): JwdsRoleConfig | null {
  if (!session) return null;
  if (Date.now() > session.exp) return null;
  return JWDS_ROLES.find((r) => r.role === session.role) ?? null;
}

function fmtTime(ts: number): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

/** Pembersih anotasi Mode Percontohan */
type Cleanup = () => void;

export function ControlPanel() {
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<JwSession | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [leads, setLeads] = useState<JwLeads>({});
  const [audit, setAudit] = useState<JwAuditEntry[]>([]);
  const [promo, setPromo] = useState<JwPromo>(DEFAULT_PROMO);
  const [promoDraft, setPromoDraft] = useState(DEFAULT_PROMO.text);
  const [designerMode, setDesignerMode] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const designerCleanups = useRef<Cleanup[]>([]);
  const tapState = useRef({ n: 0, t: 0 });

  const role = sessionRole(session);

  /* ── Boot: muat semua state dari localStorage (setelah frame pertama) ── */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setMounted(true);
      const s = readJson<JwSession | null>(LS.session, null);
      setSession(sessionRole(s) ? s : null);
      if (s && !sessionRole(s)) localStorage.removeItem(LS.session);
      setLeads(readJson<JwLeads>(LS.leads, {}));
      setAudit(readJson<JwAuditEntry[]>(LS.audit, []));
      const p = readJson<JwPromo>(LS.promo, DEFAULT_PROMO);
      setPromo(p);
      setPromoDraft(p.text);
      const d = localStorage.getItem(LS.designer) === "1";
      setDesignerMode(d && !!sessionRole(s));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Pelacak leads: klik wa.me / tel: (semua pengunjung) ──── */
  useEffect(() => {
    if (!mounted) return;
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      let key: string | null = null;
      if (href.includes("wa.me")) {
        const section = anchor.closest("section[id]")?.getAttribute("id") ?? "lainnya";
        key = `wa:${section}`;
      } else if (href.startsWith("tel:")) {
        key = "tel";
      }
      if (!key) return;
      setLeads((prev) => {
        const next = { ...prev, [key]: (prev[key] ?? 0) + 1 };
        writeJson(LS.leads, next);
        return next;
      });
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [mounted]);

  /* ── Trigger: hash #panel + tombol Shift+P + 5× ketuk logo ── */
  const openActivation = useCallback(() => {
    setModalOpen(true);
    setCodeError(false);
  }, []);

  const openPanel = useCallback(() => {
    setPanelOpen(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const checkHash = () => {
      if (window.location.hash === "#panel" || window.location.hash === "#aktivas") {
        if (sessionRole(readJson<JwSession | null>(LS.session, null))) openPanel();
        else openActivation();
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.shiftKey && (e.key === "P" || e.key === "p")) {
        e.preventDefault();
        if (sessionRole(readJson<JwSession | null>(LS.session, null))) openPanel();
        else openActivation();
      }
    };
    document.addEventListener("keydown", onKey);

    const onTap = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const brand = target?.closest?.('footer a[href="#beranda"], footer a[href="/"]');
      if (!brand) return;
      const now = Date.now();
      tapState.current =
        now - tapState.current.t < 2000
          ? { n: tapState.current.n + 1, t: now }
          : { n: 1, t: now };
      if (tapState.current.n >= 5) {
        tapState.current = { n: 0, t: 0 };
        e.preventDefault();
        openActivation();
      }
    };
    document.addEventListener("click", onTap, true);

    return () => {
      window.removeEventListener("hashchange", checkHash);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onTap, true);
    };
  }, [mounted, openActivation, openPanel]);

  /* ── Aktivasi kode role ───────────────────────────────────── */
  const activate = () => {
    const conf = resolveJwdsRole(codeInput);
    if (!conf) {
      setCodeError(true);
      return;
    }
    const now = Date.now();
    const next: JwSession = { role: conf.role, at: now, exp: now + conf.sessionDays * DAY_MS };
    writeJson(LS.session, next);
    setSession(next);
    const entry: JwAuditEntry = { role: conf.role, at: now };
    const nextAudit = [entry, ...readJson<JwAuditEntry[]>(LS.audit, [])].slice(0, 20);
    writeJson(LS.audit, nextAudit);
    setAudit(nextAudit);
    setModalOpen(false);
    setCodeInput("");
    setPanelOpen(true);
  };

  const logout = () => {
    localStorage.removeItem(LS.session);
    localStorage.removeItem(LS.designer);
    clearDesigner();
    setDesignerMode(false);
    setSession(null);
    setPanelOpen(false);
  };

  /* ── Banner promo ─────────────────────────────────────────── */
  const savePromo = (next: JwPromo) => {
    writeJson(LS.promo, next);
    setPromo(next);
    setPromoDraft(next.text);
  };

  /* ── Mode Percontohan (anotasi JWDS di atas halaman) ──────── */
  const clearDesigner = () => {
    designerCleanups.current.forEach((fn) => fn());
    designerCleanups.current = [];
  };

  const toggleDesigner = (on: boolean) => {
    clearDesigner();
    writeJson(LS.designer, on ? "1" : "0");
    setDesignerMode(on);
    if (!on) return;
    JWDS_SECTION_PATTERNS.forEach(({ id, pattern, tokens }) => {
      const el =
        id === "footer"
          ? document.querySelector("footer")
          : document.getElementById(id);
      if (!el) return;
      const prevOutline = el.style.outline;
      const prevOffset = el.style.outlineOffset;
      const prevPos = el.style.position;
      el.style.outline = "2px dashed #a3e635";
      el.style.outlineOffset = "-2px";
      if (getComputedStyle(el).position === "static") el.style.position = "relative";
      const chip = document.createElement("div");
      chip.textContent = `◆ JWDS · ${pattern}`;
      chip.title = tokens;
      chip.style.cssText =
        "position:absolute;top:0;left:0;z-index:80;background:#022c22;color:#bef264;" +
        "font:700 11px/1.4 ui-sans-serif,system-ui;padding:4px 12px;" +
        "border-radius:0 0 12px 0;max-width:min(92%,460px);pointer-events:none;" +
        "box-shadow:0 2px 8px rgba(0,0,0,.25)";
      el.appendChild(chip);
      designerCleanups.current.push(() => {
        el.style.outline = prevOutline;
        el.style.outlineOffset = prevOffset;
        el.style.position = prevPos;
        chip.remove();
      });
    });
  };

  useEffect(() => clearDesigner, []);

  /* ── Util: salin hex & ekspor CSV & salin JSON ────────────── */
  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  const leadEntries = Object.entries(leads)
    .filter(([k]) => k.startsWith("wa:"))
    .sort((a, b) => b[1] - a[1]);
  const totalWa = leadEntries.reduce((s, [, v]) => s + v, 0);
  const telCount = leads["tel"] ?? 0;

  const exportCsv = () => {
    const rows = [
      ["metric", "key", "count"],
      ...leadEntries.map(([k, v]) => ["whatsapp", k.replace("wa:", ""), String(v)]),
      ["telepon", "tel", String(telCount)],
    ];
    const csv = rows.map((r) => r.join(";")).join("\n");
    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-sgl-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyBusinessJson = async () => {
    const payload = JSON.stringify(
      { exportedAt: new Date().toISOString(), leads, promo, designerMode },
      null,
      2,
    );
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      /* abaikan */
    }
  };

  const resetLeads = () => {
    writeJson(LS.leads, {});
    setLeads({});
  };

  /* ── Render ───────────────────────────────────────────────── */
  if (!mounted) return null;

  return (
    <>
      {/* Style kecil: scrollbar panel & animasi chip */}
      <style>{`
        .jw-scroll::-webkit-scrollbar{width:6px}
        .jw-scroll::-webkit-scrollbar-thumb{background:#a7f3d0;border-radius:99px}
        .jw-scroll::-webkit-scrollbar-track{background:transparent}
        @keyframes jw-pop{from{opacity:0;transform:translateY(12px) scale(.96)}to{opacity:1;transform:none}}
        .jw-pop{animation:jw-pop .35s ease-out both}
      `}</style>

      {/* Banner promo (terlihat semua pengunjung bila diaktifkan) */}
      {promo.enabled && (
        <div className="jw-pop fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-3 bg-lime-300 px-4 py-2.5 text-center text-sm font-bold text-emerald-950 shadow-lg">
          <span>{promo.text}</span>
          <button
            type="button"
            onClick={() => savePromo({ ...promo, enabled: false })}
            aria-label="Sembunyikan banner promo"
            className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-950/10 text-xs font-black transition hover:bg-emerald-950/25"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modal aktivasi kode */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm rounded-3xl border-emerald-100 p-6 sm:p-8">
          <DialogHeader className="text-left">
            <div className="mx-auto mb-2 grid size-14 place-items-center rounded-2xl bg-emerald-950 text-2xl shadow-lg">
              🔑
            </div>
            <DialogTitle className="text-center text-xl font-extrabold tracking-tight text-emerald-950">
              Aktivasi Panel Kendali
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-stone-500">
              JWDS v1.0 — sistem role internal PT Digital Bisnis Manajemen.
              Masukkan kode aktivasi yang diberikan admin jaringan.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              activate();
            }}
            className="mt-2 space-y-3"
          >
            <Input
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value.toUpperCase());
                setCodeError(false);
              }}
              placeholder="KODE AKTIVASI"
              aria-label="Kode aktivasi"
              aria-invalid={codeError}
              autoFocus
              className={`h-12 rounded-xl border-2 text-center font-mono text-lg font-bold tracking-[0.25em] ${
                codeError ? "animate-pulse border-red-400 text-red-600" : "border-emerald-200 focus-visible:ring-emerald-400"
              }`}
            />
            {codeError && (
              <p className="text-center text-xs font-semibold text-red-500">
                Kode tidak dikenali — hubungi admin jaringan website.
              </p>
            )}
            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-emerald-600 text-base font-bold hover:bg-emerald-700"
            >
              Aktifkan Sekarang
            </Button>
          </form>
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-stone-400">
            <span>👑 Pemilik</span>
            <span aria-hidden>·</span>
            <span>🎨 Desainer</span>
            <span aria-hidden>·</span>
            <span>🧺 Staf</span>
          </div>
        </DialogContent>
      </Dialog>

      {/* Badge mengambang saat sesi aktif */}
      {role && (
        <button
          type="button"
          onClick={openPanel}
          aria-label={`Buka Panel Kendali — role ${role.label}`}
          className="jw-pop fixed bottom-5 left-5 z-[65] flex min-h-11 items-center gap-2 rounded-full bg-emerald-950 py-2.5 pl-3 pr-4 text-lime-300 shadow-2xl ring-1 ring-lime-400/40 transition hover:scale-105 hover:bg-emerald-900"
        >
          <span className="text-lg" aria-hidden>{role.emoji}</span>
          <span className="text-xs font-bold tracking-wide">{role.label}</span>
        </button>
      )}

      {/* Palet warna Mode Percontohan */}
      {role && designerMode && (
        <aside
          aria-label="Palet warna JWDS"
          className="jw-pop fixed bottom-20 left-5 z-[64] w-60 rounded-3xl border border-emerald-100 bg-white/95 p-4 shadow-2xl backdrop-blur"
        >
          <p className="text-[11px] font-black uppercase tracking-widest text-emerald-700">
            Palet JWDS v1.0
          </p>
          <div className="jw-scroll mt-3 max-h-64 space-y-1.5 overflow-y-auto pr-1">
            {JWDS_COLORS.map((c) => (
              <button
                key={c.token}
                type="button"
                onClick={() => copyHex(c.hex)}
                title={c.role}
                className="flex min-h-9 w-full items-center gap-2 rounded-xl px-1.5 py-1 text-left transition hover:bg-emerald-50"
              >
                <span
                  className="size-5 shrink-0 rounded-md border border-stone-200"
                  style={{ background: c.hex }}
                  aria-hidden
                />
                <span className="flex-1 truncate text-[11px] font-bold text-emerald-950">
                  {c.token}
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  {copiedHex === c.hex ? "✓ tersalin" : c.hex}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-[10px] text-stone-400">
            Klik warna untuk salin hex
          </p>
        </aside>
      )}

      {/* Panel Kendali (drawer) */}
      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-emerald-100 p-0 sm:max-w-md">
          {role && (
            <div className="flex min-h-full flex-col">
              <SheetHeader className="space-y-1 bg-emerald-950 p-6 text-left">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl bg-emerald-900 text-2xl shadow-inner" aria-hidden>
                    {role.emoji}
                  </span>
                  <div>
                    <SheetTitle className="text-lg font-extrabold text-white">
                      Panel Kendali · {role.label}
                    </SheetTitle>
                    <SheetDescription className="text-xs text-lime-300">
                      {role.tagline} — JWDS v1.0
                    </SheetDescription>
                  </div>
                </div>
                <p className="pt-2 text-[11px] text-emerald-100/60">
                  Sesi aktif sampai {fmtTime(session!.exp)} · aktif {role.sessionDays} hari
                </p>
              </SheetHeader>

              <div className="flex-1 space-y-6 p-6">
                {/* Statistik leads — semua role */}
                <section aria-label="Statistik klik WhatsApp">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-wider text-emerald-900">
                      📈 Leads WhatsApp
                    </h3>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                      {totalWa} klik WA · {telCount} tel
                    </span>
                  </div>
                  {leadEntries.length === 0 ? (
                    <p className="mt-3 rounded-2xl bg-stone-50 p-4 text-xs text-stone-500">
                      Belum ada klik tercatat di browser ini. Statistik menghitung
                      klik tombol WhatsApp & telepon dari pengunjung perangkat ini.
                    </p>
                  ) : (
                    <ul className="jw-scroll mt-3 max-h-72 space-y-1.5 overflow-y-auto pr-1">
                      {leadEntries.map(([key, count]) => {
                        const sectionId = key.replace("wa:", "");
                        return (
                          <li
                            key={key}
                            className="flex items-center justify-between rounded-xl border border-stone-100 bg-white px-3 py-2"
                          >
                            <span className="text-xs font-semibold text-stone-700">
                              {SECTION_LABELS[sectionId] ?? sectionId}
                            </span>
                            <span className="rounded-full bg-lime-100 px-2 py-0.5 text-[11px] font-black text-emerald-900 tabular-nums">
                              {count}×
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>

                {/* Mode Percontohan — desainer & pemilik */}
                {role.role !== "staf" && (
                  <section aria-label="Mode Percontohan" className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-black text-emerald-900">
                          🎨 Mode Percontohan JWDS
                        </h3>
                        <p className="mt-0.5 text-[11px] leading-snug text-emerald-800/70">
                          Tampilkan anotasi pola design + palet resmi di atas
                          halaman live — rujukan standarisasi 95 website.
                        </p>
                      </div>
                      <Switch
                        checked={designerMode}
                        onCheckedChange={toggleDesigner}
                        aria-label="Aktifkan Mode Percontohan"
                      />
                    </div>
                    {designerMode && (
                      <p className="mt-3 rounded-xl bg-white p-2.5 text-[11px] text-emerald-800">
                        Setiap section bergaris hijau putus-putus = pola JWDS.
                        Arahkan kursor ke label ◆ untuk melihat token-nya.
                      </p>
                    )}
                  </section>
                )}

                {/* Manajer banner promo — semua role */}
                <section aria-label="Banner promo" className="rounded-3xl border border-stone-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-black text-emerald-900">
                      📣 Banner Promo
                    </h3>
                    <Switch
                      checked={promo.enabled}
                      onCheckedChange={(on) => savePromo({ ...promo, enabled: on })}
                      aria-label="Tampilkan banner promo"
                    />
                  </div>
                  {role.role === "pemilik" && (
                    <div className="mt-3 space-y-2">
                      <Input
                        value={promoDraft}
                        onChange={(e) => setPromoDraft(e.target.value)}
                        aria-label="Teks banner promo"
                        className="rounded-xl border-stone-200 text-xs"
                      />
                      <Button
                        type="button"
                        onClick={() => savePromo({ enabled: promo.enabled, text: promoDraft })}
                        className="h-10 w-full rounded-full bg-emerald-600 text-xs font-bold hover:bg-emerald-700"
                      >
                        Simpan Teks Promo
                      </Button>
                    </div>
                  )}
                </section>

                {/* Alat pemilik */}
                {role.role === "pemilik" && (
                  <section aria-label="Alat pemilik" className="space-y-2">
                    <h3 className="text-sm font-black uppercase tracking-wider text-emerald-900">
                      👑 Kendali Pemilik
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        onClick={exportCsv}
                        variant="outline"
                        className="h-11 rounded-xl border-emerald-200 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                      >
                        ⬇️ Ekspor CSV
                      </Button>
                      <Button
                        type="button"
                        onClick={copyBusinessJson}
                        variant="outline"
                        className="h-11 rounded-xl border-emerald-200 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                      >
                        📋 Salin JSON
                      </Button>
                      <Button
                        type="button"
                        onClick={resetLeads}
                        variant="outline"
                        className="h-11 rounded-xl border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
                      >
                        🧹 Reset Leads
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setPanelOpen(false)}
                        variant="outline"
                        className="h-11 rounded-xl border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
                      >
                        Tutup Panel
                      </Button>
                    </div>
                    <div className="rounded-3xl border border-stone-100 bg-stone-50 p-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-stone-500">
                        Log Audit Aktivasi
                      </h4>
                      {audit.length === 0 ? (
                        <p className="mt-2 text-[11px] text-stone-400">Belum ada aktivasi.</p>
                      ) : (
                        <ul className="jw-scroll mt-2 max-h-40 space-y-1 overflow-y-auto pr-1">
                          {audit.map((entry, i) => (
                            <li key={`${entry.at}-${i}`} className="flex items-center justify-between text-[11px] text-stone-600">
                              <span className="font-bold capitalize">{entry.role}</span>
                              <span className="font-mono text-stone-400">{fmtTime(entry.at)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                )}

                {/* Daftar kekuatan role */}
                <section aria-label="Kemampuan role" className="rounded-3xl bg-emerald-950 p-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-lime-300">
                    Kewenangan {role.emoji} {role.label}
                  </h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {role.powers.map((power) => (
                      <li key={power} className="flex gap-2 text-[11px] leading-snug text-emerald-100/85">
                        <span className="text-lime-400" aria-hidden>✓</span>
                        {power}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="sticky bottom-0 border-t border-stone-100 bg-white/95 p-4 backdrop-blur">
                <Button
                  type="button"
                  onClick={logout}
                  variant="outline"
                  className="h-11 w-full rounded-full border-red-200 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  Keluar & Nonaktifkan Panel
                </Button>
                <p className="mt-2 text-center text-[10px] text-stone-400">
                  JWDS v1.0 · PT Digital Bisnis Manajemen — digiman.id
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
