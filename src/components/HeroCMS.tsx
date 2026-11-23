'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

interface HeroCMSProps {
  initialData: any;
  onSave: (data: any) => Promise<void>;
}

export default function HeroCMS({ initialData, onSave }: HeroCMSProps) {
  const [formData, setFormData] = useState({
    headline: initialData?.headline || 'BUILD YOUR BRAND.\nGROW YOUR BUSINESS.',
    subheadline: initialData?.subheadline || 'Creative Strategy • Digital Experiences • Business Growth',
    videoUrl: initialData?.videoUrl || '/images/hero.mp4',
    videoPoster: initialData?.videoPoster || '/images/services/service_hero.jpg',
    ctaText: initialData?.ctaText || 'GET STARTED',
    ctaLink: initialData?.ctaLink || '/contact',
    showLogo: initialData?.showLogo ?? true,
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(formData);
    setSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight">Hero Section &amp; Background Video</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Configure the main landing screen, autoplay background video, titles, and call-to-action button.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5 bg-white dark:bg-[#0c0c12] p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
              Main Headline (Supports Newlines)
            </label>
            <textarea
              rows={3}
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24] font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
              Subheadline / Tagline
            </label>
            <input
              type="text"
              value={formData.subheadline}
              onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
              Background Video URL or Path
            </label>
            <input
              type="text"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24] font-mono text-xs"
            />
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
              Default: <code className="text-[#B8860B] dark:text-[#D4AF37] font-bold">/images/hero.mp4</code>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaText}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                CTA Button Link
              </label>
              <input
                type="text"
                value={formData.ctaLink}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="showLogo"
              checked={formData.showLogo}
              onChange={(e) => setFormData({ ...formData, showLogo: e.target.checked })}
              className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer"
            />
            <label htmlFor="showLogo" className="text-xs font-bold text-neutral-800 dark:text-neutral-200 cursor-pointer">
              Show Official Kharga Crest Emblem in Hero
            </label>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#e0b83b] text-neutral-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Hero Changes'}</span>
            </button>

            {savedSuccess && (
              <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                Saved to MongoDB!
              </span>
            )}
          </div>
        </form>

        {/* Live Mockup Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-[#B8860B] dark:text-[#D4AF37] uppercase tracking-widest">
            Live Preview on Website
          </div>
          <div className="relative aspect-[9/14] sm:aspect-video lg:aspect-[9/13] w-full rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl bg-black flex flex-col justify-between p-6">
            <video
              src={formData.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />

            <div className="relative z-10 text-center flex flex-col items-center justify-center h-full space-y-4 text-white">
              {formData.showLogo && (
                <div className="w-16 h-16 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/kharga new logo 1.svg" alt="Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
                </div>
              )}
              <h3 className="text-xl font-black text-white whitespace-pre-line tracking-tight uppercase leading-snug">
                {formData.headline}
              </h3>
              <p className="text-[11px] text-neutral-300 max-w-xs">{formData.subheadline}</p>
              <div className="pt-2">
                <span className="px-5 py-2 rounded-xl bg-white text-black font-extrabold text-[11px] uppercase tracking-wider shadow-lg">
                  {formData.ctaText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
