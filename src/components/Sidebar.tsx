'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Globe,
  Files,
  Home,
  Info,
  Layers,
  FolderKanban,
  FileText,
  Briefcase,
  Mail,
  Settings,
  ChevronDown,
  Database,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  homeSection: string;
  setHomeSection: (sec: string) => void;
  counts: any;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Sidebar({
  activeView,
  setActiveView,
  counts,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [cmsExpanded, setCmsExpanded] = useState(true);

  const CMS_PAGES = [
    { id: 'cms-all', label: 'All Pages Directory', icon: Files },
    { id: 'cms-home', label: 'Home Page', icon: Home, badge: '4' },
    { id: 'cms-about', label: 'About Us', icon: Info },
    { id: 'cms-services', label: 'Services', icon: Layers, badge: counts?.services || 11 },
    { id: 'cms-portfolio', label: 'Portfolio', icon: FolderKanban, badge: counts?.ourWork || 15 },
    { id: 'cms-clients', label: 'Clients', icon: Users, badge: counts?.clients || 6 },
    { id: 'cms-blog', label: 'Blog', icon: FileText, badge: counts?.blogs || 5 },
    { id: 'cms-career', label: 'Careers', icon: Briefcase, badge: counts?.careers || 3 },
    { id: 'cms-contact', label: 'Contact', icon: Mail },
  ];

  const isCmsActive = activeView.startsWith('cms-');

  return (
    <aside
      className={`bg-white dark:bg-[#0c0e17] border-r border-[#dbe0ea] dark:border-[#1a1e2d] h-screen max-h-screen overflow-hidden flex flex-col justify-between shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-30 select-none relative shadow-sm ${
        isCollapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Floating Toggle Collapse Button on the edge */}
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-white dark:bg-[#151928] border-2 border-[#D4AF37] text-[#B8860B] dark:text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition-all duration-200 shadow-md z-50 cursor-pointer hover:scale-110 active:scale-95"
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" /> : <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />}
      </button>

      {/* Top Section: Logo & Nav Items */}
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Crest Header */}
        <div className={`px-4 py-3 border-b border-[#e5e9f2] dark:border-[#1a1e2d] flex items-center shrink-0 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
              <Image
                src="/kharga new logo 1.svg"
                alt="Kharga Logo"
                fill
                className="object-contain filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col transition-opacity duration-200">
                <span className="text-xs font-black text-[#0f172a] dark:text-white tracking-widest uppercase">KHARGA</span>
                <span className="text-[9px] text-[#B8860B] dark:text-[#D4AF37] font-mono font-bold tracking-wider">CMS STUDIO</span>
              </div>
            )}
          </div>
        </div>

        {/* Compact Navigation Items (Fits within 1 screen without scrolling) */}
        <div className="p-2 space-y-1 flex-1 overflow-hidden flex flex-col justify-between">
          <div className="space-y-1 overflow-hidden">
            {/* Overview Button */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => setActiveView('overview')}
                className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-1.5'
                } ${
                  activeView === 'overview'
                    ? 'bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] border border-[#D4AF37] shadow-xs'
                    : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeView === 'overview' ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'text-[#64748b] dark:text-[#64748b]'}`} />
                  {!isCollapsed && <span>Overview</span>}
                </div>
              </button>

              {isCollapsed && (
                <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#0f172a] border border-[#334155] text-white text-[11px] font-bold rounded-lg shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  Overview
                </div>
              )}
            </div>

            {/* CMS Pages Interactive Dropdown */}
            {!isCollapsed ? (
              <div className="pt-0.5">
                {/* CMS Pages Accordion Toggle */}
                <button
                  type="button"
                  onClick={() => setCmsExpanded(!cmsExpanded)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                    isCmsActive
                      ? 'bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs'
                      : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Globe className={`w-4 h-4 shrink-0 ${isCmsActive ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'text-[#64748b]'}`} />
                    <span className="truncate">CMS Pages</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                      isCmsActive ? 'bg-[#D4AF37] text-neutral-950 font-black' : 'bg-[#e2e8f0] dark:bg-[#1e2438] text-[#475569] dark:text-[#94a3b8]'
                    }`}>
                      {CMS_PAGES.length}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        cmsExpanded ? 'rotate-180 text-[#B8860B] dark:text-[#D4AF37]' : 'text-[#64748b]'
                      }`}
                    />
                  </div>
                </button>

                {/* Dropdown Items (Collapsible) */}
                {cmsExpanded && (
                  <div className="mt-1 ml-2.5 pl-2 border-l-2 border-[#dbe0ea] dark:border-[#1e2333] space-y-0.5 animate-in fade-in duration-150">
                    {CMS_PAGES.map((page) => {
                      const Icon = page.icon;
                      const isActive = activeView === page.id;

                      return (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => setActiveView(page.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${
                            isActive
                              ? 'bg-[#D4AF37] text-neutral-950 font-bold shadow-xs'
                              : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Icon className={`w-3 h-3 shrink-0 ${isActive ? 'text-neutral-950' : 'text-[#64748b] dark:text-[#94a3b8]'}`} />
                            <span className="truncate">{page.label}</span>
                          </div>
                          {page.badge && (
                            <span
                              className={`text-[9px] px-1 py-0.2 rounded font-mono shrink-0 ${
                                isActive
                                  ? 'bg-neutral-950/20 text-neutral-950 font-black'
                                  : 'bg-[#e2e8f0] dark:bg-[#1e2438] text-[#475569] dark:text-[#94a3b8]'
                              }`}
                            >
                              {page.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Collapsed Mode: CMS Pages Icon with Hover/Flyout Dropdown */
              <div className="relative group pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsCollapsed(false);
                    setCmsExpanded(true);
                  }}
                  className={`w-full flex items-center justify-center p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCmsActive
                      ? 'bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] border border-[#D4AF37]'
                      : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                  }`}
                  title="CMS Pages (Click to Expand)"
                >
                  <Globe className={`w-4 h-4 ${isCmsActive ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'text-[#64748b]'}`} />
                  {isCmsActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] absolute top-1.5 right-1.5" />
                  )}
                </button>

                {/* Flyout Dropdown Menu */}
                <div className="absolute left-full ml-2.5 top-0 w-56 p-2 bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#22293e] rounded-2xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
                  <div className="px-2.5 py-1 mb-1 text-[10px] font-black uppercase tracking-wider text-[#B8860B] dark:text-[#D4AF37] border-b border-[#e2e8f0] dark:border-[#1e2333] flex items-center justify-between">
                    <span>CMS Pages</span>
                    <span className="font-mono">{CMS_PAGES.length}</span>
                  </div>
                  <div className="space-y-0.5">
                    {CMS_PAGES.map((page) => {
                      const Icon = page.icon;
                      const isActive = activeView === page.id;
                      return (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => setActiveView(page.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#D4AF37] text-neutral-950 font-bold'
                              : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{page.label}</span>
                          </div>
                          {page.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded font-mono bg-[#e2e8f0] dark:bg-[#1e2438]">
                              {page.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Settings at the bottom */}
          <div className="relative group pt-1 border-t border-[#e2e8f0] dark:border-[#1a1e2d]">
            <button
              type="button"
              onClick={() => setActiveView('settings')}
              className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-1.5'
              } ${
                activeView === 'settings'
                  ? 'bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] border border-[#D4AF37] shadow-xs'
                  : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className={`w-3.5 h-3.5 shrink-0 ${activeView === 'settings' ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'text-[#64748b] dark:text-[#64748b]'}`} />
                {!isCollapsed && <span>Settings &amp; DB</span>}
              </div>
            </button>

            {isCollapsed && (
              <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#0f172a] border border-[#334155] text-white text-[11px] font-bold rounded-lg shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                Settings &amp; DB
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slim Footer Engine Indicator */}
      <div className={`p-2 m-2 rounded-xl bg-[#f1f5f9] dark:bg-[#111422] border border-[#e2e8f0] dark:border-[#1e2333] text-xs shrink-0 transition-all ${isCollapsed ? 'flex justify-center p-2 m-1.5' : ''}`}>
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
              <span className="font-bold text-[#0f172a] dark:text-white text-[11px]">MongoDB Atlas</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        ) : (
          <div className="relative group">
            <Database className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
            <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#0f172a] border border-[#334155] text-[10px] text-white font-bold rounded-lg shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              MongoDB Engine
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
