import Link from "next/link";
import {
  ArrowLeft,
  FileQuestion,
  Home,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The requested KyroX page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#070A10] px-4 py-12 text-[#A6B1C3] sm:px-6">
      {/* Hintergrund-Effekte */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/[0.10] blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-260px] right-[-180px] h-[500px] w-[500px] rounded-full bg-teal-400/[0.07] blur-[120px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(rgba(148,163,184,0.35)_1px,transparent_1px)] [background-size:32px_32px]"
      />

      <section className="not-found-card relative w-full max-w-[680px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0B1516]/90 p-6 text-center shadow-[0_32px_100px_rgba(0,0,0,0.52),0_0_70px_rgba(16,185,129,0.07)] backdrop-blur-xl sm:p-10 md:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
        />

        {/* Logo */}
        <Link
          href="/"
          aria-label="KyroX home"
          className="mx-auto mb-9 inline-flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-gradient-to-br from-emerald-500 to-teal-700 text-sm font-black tracking-[-0.08em] text-white shadow-[0_10px_30px_rgba(16,185,129,0.25)]">
            KX
          </span>

          <span className="flex flex-col items-start leading-none">
            <span className="text-sm font-extrabold tracking-[0.16em] text-[#F1F5F9]">
              KYROX™
            </span>

            <span className="mt-1 text-[9px] font-semibold tracking-[0.22em] text-[#718096]">
              OFFICIAL
            </span>
          </span>
        </Link>

        {/* 404-Symbol */}
        <div className="not-found-icon relative mx-auto mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-[22px] border border-emerald-300/15 bg-emerald-400/[0.08] text-[#2DD4BF] shadow-[0_18px_45px_rgba(16,185,129,0.12)]">
          <FileQuestion className="h-9 w-9" strokeWidth={1.8} />

          <span className="absolute -right-2 -top-2 flex h-7 min-w-7 items-center justify-center rounded-full border border-[#0B1516] bg-[#10B981] px-1 text-[10px] font-black text-white">
            404
          </span>
        </div>

        <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#2DD4BF]">
          Error 404
        </div>

        <h1 className="text-balance text-[30px] font-extrabold leading-tight tracking-[-0.035em] text-[#F1F5F9] sm:text-[40px]">
          This page could not be found
        </h1>

        <p className="mx-auto mt-4 max-w-[520px] text-pretty text-sm leading-7 text-[#A6B1C3] sm:text-[15px]">
          The link may be incorrect, outdated, or the requested page may have
          been moved. You can return to the official KyroX policies and
          continue from there.
        </p>

        {/* Navigation */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-[#10B981] px-6 text-sm font-bold text-white shadow-[0_12px_32px_rgba(16,185,129,0.24)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#12C98D] hover:shadow-[0_16px_38px_rgba(16,185,129,0.30)] active:translate-y-0 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            Back to policies
          </Link>

          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] border border-white/[0.09] bg-white/[0.035] px-6 text-sm font-semibold text-[#A6B1C3] transition-[transform,border-color,color,background-color] duration-200 hover:-translate-y-0.5 hover:border-emerald-400/25 hover:bg-emerald-400/[0.06] hover:text-[#F1F5F9] active:translate-y-0 active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to KyroX
          </Link>
        </div>

        <div className="mt-9 flex items-center justify-center gap-2 border-t border-white/[0.07] pt-6 text-[11px] text-[#718096]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
          Official KyroX policies and legal information
        </div>
      </section>
    </main>
  );
}