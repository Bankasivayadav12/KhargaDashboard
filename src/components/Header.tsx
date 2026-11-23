'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ExternalLink,
  LogOut,
  ChevronDown,
  Sparkles,
  Globe,
  Files,
  Home,
  Info,
  Layers,
  FolderKanban,
  FileText,
  Briefcase,
  Mail,
  Check,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean | ((prev: boolean) => boolean)) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  onNavigateSettings: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const CMS_PAGES_LIST = [
  { id: 'cms-all', label: 'All Pages Directory', icon: Files },
  { id: 'cms-home', label: 'Home Page', icon: Home },
  { id: 'cms-why-choose', label: 'Why Choose Us', icon: Sparkles },
  { id: 'cms-about', label: 'About Us', icon: Info },
  { id: 'cms-services', label: 'Services', icon: Layers },
  { id: 'cms-portfolio', label: 'Portfolio', icon: FolderKanban },
  { id: 'cms-blog', label: 'Blog', icon: FileText },
  { id: 'cms-career', label: 'Careers', icon: Briefcase },
  { id: 'cms-contact', label: 'Contact', icon: Mail },
];

export default function Header({
  isCollapsed,
  setIsCollapsed,
  isDarkMode,
  setIsDarkMode,
  activeView,
  setActiveView,
  onNavigateSettings,
  isMobileOpen = false,
  setIsMobileOpen,
}: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCmsMenuOpen, setIsCmsMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const cmsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (cmsMenuRef.current && !cmsMenuRef.current.contains(event.target as Node)) {
        setIsCmsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activePageObj = CMS_PAGES_LIST.find((p) => p.id === activeView);

  return (
    <header className="sticky top-0 z-40 w-full h-16 sm:h-18 bg-white/95 dark:bg-[#0c0e17]/95 backdrop-blur-xl border-b border-[#dbe0ea] dark:border-[#1a1e2d] px-3.5 sm:px-6 lg:px-8 flex items-center justify-between transition-colors duration-200 shadow-xs">
      {/* Left: Mobile Menu / Collapse Toggle, Title & CMS Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={() => {
            if (setIsMobileOpen && window.innerWidth < 1024) {
              setIsMobileOpen((prev) => !prev);
            } else {
              setIsCollapsed((prev) => !prev);
            }
          }}
          className="p-2 sm:p-2.5 rounded-xl bg-[#f1f5f9] dark:bg-[#151928] hover:bg-[#e2e8f0] dark:hover:bg-[#1e2438] border border-[#dbe0ea] dark:border-[#22293e] text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
          title="Toggle Navigation Menu"
        >
          <span className="lg:hidden flex items-center justify-center">
            <Menu className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37]" />
          </span>
          <span className="hidden lg:flex items-center justify-center">
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37]" /> : <PanelLeftClose className="w-4 h-4" />}
          </span>
        </button>

        <div className="flex flex-col min-w-0">
          <span className="text-[9px] sm:text-xs uppercase tracking-widest text-[#B8860B] dark:text-[#D4AF37] font-extrabold flex items-center gap-1.5 truncate">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
            <span className="truncate">Kharga CMS Studio</span>
          </span>
          <h1 className="text-xs sm:text-base lg:text-lg font-black text-[#0f172a] dark:text-white tracking-tight truncate max-w-[140px] xs:max-w-[220px] sm:max-w-none">
            Content Management System
          </h1>
        </div>

        {/* CMS Pages Header Dropdown Switcher */}
        <div className="relative hidden md:block ml-2" ref={cmsMenuRef}>
          <button
            type="button"
            onClick={() => setIsCmsMenuOpen(!isCmsMenuOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
              activePageObj
                ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#B8860B] dark:text-[#D4AF37]'
                : 'bg-[#f1f5f9] dark:bg-[#151928] border-[#dbe0ea] dark:border-[#22293e] text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
            <span>CMS Pages:</span>
            <span className="font-extrabold text-[#0f172a] dark:text-white">
              {activePageObj ? activePageObj.label : 'Select Page'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCmsMenuOpen ? 'rotate-180 text-[#B8860B] dark:text-[#D4AF37]' : ''}`} />
          </button>

          {isCmsMenuOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#22293e] shadow-[0_20px_50px_rgba(15,23,42,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#B8860B] dark:text-[#D4AF37] border-b border-[#e2e8f0] dark:border-[#1e2333]">
                Jump to CMS Page
              </div>
              <div className="space-y-0.5 pt-1">
                {CMS_PAGES_LIST.map((p) => {
                  const Icon = p.icon;
                  const isCur = activeView === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setActiveView(p.id);
                        setIsCmsMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                        isCur
                          ? 'bg-[#D4AF37] text-neutral-950 font-bold'
                          : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#edf1f7] dark:hover:bg-[#181d2f]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{p.label}</span>
                      </div>
                      {isCur && <Check className="w-3.5 h-3.5 shrink-0 text-neutral-950 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Theme Toggle & Modern Profile Dropdown */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Modern Dark / Light Mode Toggle Switch */}
        <button
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#f1f5f9] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white hover:border-[#D4AF37]/70 transition-all duration-200 cursor-pointer shadow-xs group active:scale-95"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isDarkMode ? (
              <Moon className="w-4 h-4 text-[#D4AF37] transition-transform duration-300 rotate-0 group-hover:-rotate-12" />
            ) : (
              <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 rotate-0 group-hover:rotate-45" />
            )}
          </div>
          <span className="text-xs font-bold hidden md:inline text-[#334155] dark:text-[#cbd5e1]">
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
          <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#D4AF37]' : 'bg-amber-400'}`} />
        </button>

        {/* Profile Avatar & Dropdown Menu */}
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 p-1.5 sm:pr-3 rounded-2xl bg-[#f1f5f9] dark:bg-[#151928] hover:bg-[#e2e8f0] dark:hover:bg-[#1e2438] border border-[#dbe0ea] dark:border-[#22293e] transition-all cursor-pointer shadow-xs group"
          >
            {/* Avatar Crest with Status Ring */}
            <div className="relative w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-[#D4AF37] p-0.5 shadow-xs shrink-0">
              <div className="w-full h-full rounded-[10px] bg-[#0c0e17] flex items-center justify-center text-white font-black text-xs">
                KD
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#0c0e17]" />
            </div>

            {/* Name & Role */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-black text-[#0f172a] dark:text-white leading-tight">
                Admin
              </span>
              <span className="text-[10px] text-[#64748b] dark:text-[#94a3b8] font-medium">
                Kharga Studio
              </span>
            </div>

            <ChevronDown
              className={`w-3.5 h-3.5 text-[#64748b] dark:text-[#94a3b8] transition-transform duration-200 ${
                isProfileOpen ? 'rotate-180 text-[#B8860B] dark:text-[#D4AF37]' : ''
              }`}
            />
          </button>

          {/* Floating Dropdown Card */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#22293e] shadow-[0_20px_50px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 border-b border-[#e2e8f0] dark:border-[#1e2333] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-[#D4AF37] p-0.5 shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-[#0c0e17] flex items-center justify-center text-white font-black text-xs">
                    KD
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="text-xs font-black text-[#0f172a] dark:text-white truncate">
                    Administrator
                  </div>
                  <div className="text-[11px] text-[#64748b] dark:text-[#94a3b8] font-mono truncate">
                    admin@kharga.digital
                  </div>
                </div>
              </div>

              <div className="px-3 py-2 my-1 rounded-xl bg-[#f8fafc] dark:bg-[#181d2f] flex items-center justify-between text-[11px]">
                <span className="text-[#64748b] dark:text-[#94a3b8] font-medium">Role:</span>
                <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] font-black text-[10px]">
                  Super Admin
                </span>
              </div>

              <div className="space-y-0.5 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onNavigateSettings();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#334155] dark:text-[#cbd5e1] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-[#1a2034] transition-colors cursor-pointer text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
                  <span>Database &amp; Settings</span>
                </button>

                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#334155] dark:text-[#cbd5e1] hover:text-[#0f172a] dark:hover:text-white hover:bg-[#f1f5f9] dark:hover:bg-[#1a2034] transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
                    <span>View Live Website</span>
                  </div>
                  <span className="text-[10px] text-[#94a3b8] font-mono">:3000</span>
                </a>
              </div>

              <div className="pt-1 mt-1 border-t border-[#e2e8f0] dark:border-[#1e2333]">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
