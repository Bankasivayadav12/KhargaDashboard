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
  ChevronLeft,
  ChevronRight,
  Users,
  X,
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  homeSection: string;
  setHomeSection: (sec: string) => void;
  counts: any;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export default function Sidebar({
  activeView,
  setActiveView,
  counts,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen = false,
  setIsMobileOpen,
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

  const handleNavClick = (view: string) => {
    setActiveView(view);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen?.(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`bg-white dark:bg-[#0c0e17] border-r border-[#dbe0ea] dark:border-[#1a1e2d] h-screen max-h-screen flex flex-col justify-between shrink-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none shadow-sm fixed inset-y-0 left-0 z-50 lg:static lg:z-30 ${
          isMobileOpen ? 'translate-x-0 w-72 max-w-[85vw]' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'
        }`}
      >
        {/* Floating Toggle Collapse Button on the edge (Desktop only) */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-5 w-6 h-6 rounded-full bg-white dark:bg-[#151928] border-2 border-[#D4AF37] text-[#B8860B] dark:text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black items-center justify-center transition-all duration-200 shadow-md z-50 cursor-pointer hover:scale-110 active:scale-95"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" /> : <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />}
        </button>

        {/* Top Section: Logo & Nav Items */}
        <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
          {/* Brand Crest Header */}
          <div className={`px-4 py-3.5 border-b border-[#e5e9f2] dark:border-[#1a1e2d] flex items-center shrink-0 ${isCollapsed ? 'justify-between lg:justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                <Image
                  src="/kharga new logo 1.svg"
                  alt="Kharga Logo"
                  fill
                  className="object-contain filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.4)]"
                />
              </div>
              <div className={`flex flex-col transition-opacity duration-200 ${isCollapsed ? 'flex lg:hidden' : ''}`}>
                <span className="text-xs font-black text-[#0f172a] dark:text-white tracking-widest uppercase">KHARGA</span>
                <span className="text-[9px] text-[#B8860B] dark:text-[#D4AF37] font-mono font-bold tracking-wider">CMS STUDIO</span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen?.(false)}
              className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white lg:hidden cursor-pointer"
              title="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items (Scrollable on small/mobile screens) */}
          <div className="p-2 space-y-1 flex-1 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-1">
              {/* Overview Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => handleNavClick('overview')}
                  className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                    isCollapsed ? 'justify-start lg:justify-center px-3 py-2 lg:p-2' : 'justify-between px-3 py-2'
                  } ${
                    activeView === 'overview'
                      ? 'bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] border border-[#D4AF37] shadow-xs'
                      : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeView === 'overview' ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'text-[#64748b] dark:text-[#64748b]'}`} />
                    <span className={isCollapsed ? 'inline lg:hidden' : 'inline'}>Overview</span>
                  </div>
                </button>

                {isCollapsed && (
                  <div className="hidden lg:block absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#0f172a] border border-[#334155] text-white text-[11px] font-bold rounded-lg shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                    Overview
                  </div>
                )}
              </div>

              {/* CMS Pages Interactive Dropdown */}
              {!isCollapsed || isMobileOpen ? (
                <div className="pt-0.5">
                  {/* CMS Pages Accordion Toggle */}
                  <button
                    type="button"
                    onClick={() => setCmsExpanded(!cmsExpanded)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
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
                            onClick={() => handleNavClick(page.id)}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${
                              isActive
                                ? 'bg-[#D4AF37] text-neutral-950 font-bold shadow-xs'
                                : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-neutral-950' : 'text-[#64748b] dark:text-[#94a3b8]'}`} />
                              <span className="truncate">{page.label}</span>
                            </div>
                            {page.badge && (
                              <span
                                className={`text-[9px] px-1.5 py-0.2 rounded font-mono shrink-0 ${
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
                /* Collapsed Mode (Desktop only) */
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
                            onClick={() => handleNavClick(page.id)}
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
            <div className="relative group pt-2 pb-1 border-t border-[#e2e8f0] dark:border-[#1a1e2d] mt-auto">
              <button
                type="button"
                onClick={() => handleNavClick('settings')}
                className={`w-full flex items-center rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  isCollapsed ? 'justify-start lg:justify-center px-3 py-2 lg:p-2' : 'justify-between px-3 py-2'
                } ${
                  activeView === 'settings'
                    ? 'bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] border border-[#D4AF37] shadow-xs'
                    : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#151928]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className={`w-4 h-4 shrink-0 ${activeView === 'settings' ? 'text-[#B8860B] dark:text-[#D4AF37]' : 'text-[#64748b] dark:text-[#64748b]'}`} />
                  <span className={isCollapsed ? 'inline lg:hidden' : 'inline'}>Settings &amp; DB</span>
                </div>
              </button>

              {isCollapsed && (
                <div className="hidden lg:block absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#0f172a] border border-[#334155] text-white text-[11px] font-bold rounded-lg shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  Settings &amp; DB
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
      </aside>
    </>
  );
}
