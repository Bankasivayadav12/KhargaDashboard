'use client';

import React, { useState } from 'react';
import HeroCMS from './HeroCMS';
import ServicesCMS from './ServicesCMS';
import WhyChooseCMS from './WhyChooseCMS';
import OurWorkCMS from './OurWorkCMS';
import { Video, Layers, Sparkles, FolderKanban, ArrowLeft } from 'lucide-react';

interface HomePageCMSProps {
  heroData: any;
  services: any[];
  whyChoose: any[];
  ourWork: any[];
  onSaveHero: (data: any) => Promise<void>;
  onUpdateService: (service: any) => Promise<void>;
  onReorderServices: (items: any[]) => Promise<void>;
  onUpdateWhyChoose: (item: any) => Promise<void>;
  onUpdateOurWork: (item: any) => Promise<void>;
  onBackToPages: () => void;
}

export default function HomePageCMS({
  heroData,
  services,
  whyChoose,
  ourWork,
  onSaveHero,
  onUpdateService,
  onReorderServices,
  onUpdateWhyChoose,
  onUpdateOurWork,
  onBackToPages,
}: HomePageCMSProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'services' | 'why-choose' | 'our-work'>('hero');

  const SECTIONS = [
    { id: 'hero', label: '1. Hero & Background Video', icon: Video },
    { id: 'services', label: '2. What We Do (11 Services)', icon: Layers },
    { id: 'why-choose', label: '3. Why Choose Us', icon: Sparkles },
    { id: 'our-work', label: '4. View Our Work (Showcase)', icon: FolderKanban },
  ];

  return (
    <div className="max-w-6xl space-y-6">
      {/* Top Breadcrumb & Section Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPages}
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors shadow-xs cursor-pointer"
            title="Back to All Pages"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#B8860B] dark:text-[#D4AF37] uppercase">CMS / PAGES / HOME</div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white tracking-tight">Home Page Content Management</h2>
          </div>
        </div>

        {/* Home Section Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-2xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 shadow-xs">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#D4AF37] text-neutral-950 font-black shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render selected section */}
      <div>
        {activeSection === 'hero' && (
          <HeroCMS initialData={heroData} onSave={onSaveHero} />
        )}

        {activeSection === 'services' && (
          <ServicesCMS
            services={services}
            onUpdate={onUpdateService}
            onReorder={onReorderServices}
            onAdd={async () => {}}
            onDelete={async () => {}}
          />
        )}

        {activeSection === 'why-choose' && (
          <WhyChooseCMS items={whyChoose} onUpdate={onUpdateWhyChoose} />
        )}

        {activeSection === 'our-work' && (
          <OurWorkCMS items={ourWork} onUpdate={onUpdateOurWork} />
        )}
      </div>
    </div>
  );
}
