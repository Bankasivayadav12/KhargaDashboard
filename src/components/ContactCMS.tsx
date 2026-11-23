'use client';

import React, { useState } from 'react';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';

export default function ContactCMS({ onBack }: { onBack: () => void }) {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    headline: 'Start Your Conversation With Kharga',
    email: 'hello@kharga.digital',
    phone: '+91 98765 43210',
    address: 'Kharga Digital Media Pvt Ltd, Cyber City, Bangalore, India',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <button onClick={onBack} className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-xs cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="text-[10px] font-mono font-bold tracking-widest text-[#B8860B] dark:text-[#D4AF37] uppercase">CMS / PAGES / CONTACT</div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">Contact Page &amp; Inquiries</h2>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5 transition-colors">
        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">Headline</label>
          <input
            type="text"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">Public Inquiries Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24] focus:outline-none font-mono text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">Official Phone Line</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24] focus:outline-none font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase mb-2">Headquarters Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full bg-neutral-50 dark:bg-[#14141c] border border-neutral-300 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-neutral-900 dark:text-white focus:border-[#D4AF37] focus:bg-white dark:focus:bg-[#1a1a24] focus:outline-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-neutral-950 font-extrabold text-xs uppercase shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Contact Info</span>
          </button>
          {saved && (
            <span className="text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              Saved changes!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
