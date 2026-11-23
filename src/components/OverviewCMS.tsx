'use client';

import React from 'react';
import {
  Video,
  Layers,
  Sparkles,
  FolderKanban,
  Database,
  ArrowRight,
} from 'lucide-react';

interface OverviewProps {
  dbStatus: any;
  heroData: any;
  services: any[];
  whyChoose: any[];
  ourWork: any[];
  setActiveTab: (tab: string) => void;
  onSeed: () => void;
}

export default function OverviewCMS({
  dbStatus,
  services,
  whyChoose,
  ourWork,
  setActiveTab,
}: OverviewProps) {
  const isConnected = dbStatus?.status === 'connected';

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#0c0c12] p-8 border-2 border-[#D4AF37] shadow-xl dark:shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-colors">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs font-black text-[#B8860B] dark:text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kharga Website Content Hub</span>
          </div>
          <h2 className="text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
            Manage your homepage in real-time.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
            Update background videos, adjust the 11 services in What We Do, reorder cards, and showcase client work directly stored in your MongoDB Atlas database.
          </p>
        </div>
      </div>

      {/* Database Status Alert */}
      <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
        isConnected
          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/30'
          : 'bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-500/30'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isConnected ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
          }`}>
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-neutral-950 dark:text-white text-sm">
              {isConnected ? 'MongoDB Atlas is Active & Connected' : 'Awaiting MongoDB Atlas Connection String'}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300">
              {isConnected
                ? 'All updates are synced directly to your remote Atlas database collections.'
                : 'Using fallback in-memory store. Paste your URI in the Settings tab to activate cloud Atlas storage.'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-950 dark:text-white font-bold text-xs uppercase transition-all shrink-0 shadow-xs cursor-pointer"
        >
          {isConnected ? 'View Config' : 'Configure Atlas'}
        </button>
      </div>

      {/* Quick Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Hero */}
        <div
          onClick={() => setActiveTab('hero')}
          className="p-6 rounded-2xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center mb-4">
            <Video className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-950 dark:text-white text-base group-hover:text-[#B8860B] dark:group-hover:text-[#D4AF37] transition-colors">
            Hero &amp; Video
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">
            Autoplay video background (/images/hero.mp4), headline, and CTA button.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#B8860B] dark:text-[#D4AF37] font-bold">
            <span>Manage Section</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 2: Services */}
        <div
          onClick={() => setActiveTab('services')}
          className="p-6 rounded-2xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center mb-4">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-950 dark:text-white text-base group-hover:text-[#B8860B] dark:group-hover:text-[#D4AF37] transition-colors">
            What We Do
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            {services.length} active service sliders (SMM, Content Creation, SEO, Ads, Brochures).
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#B8860B] dark:text-[#D4AF37] font-bold">
            <span>Manage Services</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 3: Why Choose Us */}
        <div
          onClick={() => setActiveTab('why-choose')}
          className="p-6 rounded-2xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-950 dark:text-white text-base group-hover:text-[#B8860B] dark:group-hover:text-[#D4AF37] transition-colors">
            Why Choose Us
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            {whyChoose.length} core value benefit cards with images and titles.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#B8860B] dark:text-[#D4AF37] font-bold">
            <span>Manage Cards</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Card 4: Our Work */}
        <div
          onClick={() => setActiveTab('our-work')}
          className="p-6 rounded-2xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 hover:border-[#D4AF37] dark:hover:border-[#D4AF37] hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all cursor-pointer group hover:-translate-y-1"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center mb-4">
            <FolderKanban className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-neutral-950 dark:text-white text-base group-hover:text-[#B8860B] dark:group-hover:text-[#D4AF37] transition-colors">
            View Our Work
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
            {ourWork.length} portfolio showcase projects in the 3D mouse float section.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#B8860B] dark:text-[#D4AF37] font-bold">
            <span>Manage Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
