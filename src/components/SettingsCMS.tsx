'use client';

import React from 'react';
import { Key, Database, RefreshCw, Server } from 'lucide-react';

interface SettingsProps {
  dbStatus: any;
  onRefresh: () => void;
  onSeed: () => void;
  isSeeding: boolean;
}

export default function SettingsCMS({ dbStatus, onRefresh, onSeed, isSeeding }: SettingsProps) {
  const isConnected = dbStatus?.status === 'connected';

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-black text-neutral-950 dark:text-white tracking-tight">Database &amp; MongoDB Configuration</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Connect your MongoDB Atlas cluster connection string for persistent cloud database storage.
        </p>
      </div>

      {/* MongoDB Atlas Setup Guide */}
      <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-5 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#B8860B] dark:text-[#D4AF37] flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-950 dark:text-white text-base">MongoDB Atlas Connection String</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">How to link your cloud cluster</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 font-mono text-xs text-neutral-300 space-y-2">
          <div className="text-[#D4AF37] font-bold"># File location: D:\freelancing\karga_dashboard\.env.local</div>
          <div className="text-emerald-400 break-all select-all">
            MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/karga_cms?retryWrites=true&amp;w=majority
          </div>
        </div>

        <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p>1. Open your MongoDB Atlas dashboard and click <strong>Connect → Drivers</strong>.</p>
          <p>2. Copy the connection URI and replace <code>&lt;username&gt;</code> and <code>&lt;password&gt;</code> with your database user credentials.</p>
          <p>3. Paste the URI inside <code className="text-[#B8860B] dark:text-[#D4AF37] font-bold">D:reelancingkarga_dashboard.env.local</code>.</p>
          <p>4. Click <strong>Test Connection &amp; Sync</strong> below to verify connection and populate your collections.</p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
          <button
            onClick={onRefresh}
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Test Connection Health</span>
          </button>

          <button
            onClick={onSeed}
            disabled={isSeeding}
            className="w-full sm:w-auto justify-center px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#e4be3e] text-neutral-950 text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isSeeding ? 'Syncing...' : 'Sync Live Website Data to Atlas'}</span>
          </button>
        </div>
      </div>

      {/* Current Connection Status Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0c0c12] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 transition-colors">
        <h3 className="font-bold text-neutral-950 dark:text-white text-sm flex items-center gap-2">
          <Server className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37]" />
          <span>Diagnostic Status</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#14141c] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <span className="text-neutral-500 dark:text-neutral-400 font-bold uppercase text-[10px]">Active Storage Driver</span>
            <div className="font-bold text-neutral-900 dark:text-white font-mono">
              {isConnected ? 'MongoDB Atlas (Cluster)' : 'Memory Cache Fallback'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#14141c] border border-neutral-200 dark:border-neutral-800 space-y-1">
            <span className="text-neutral-500 dark:text-neutral-400 font-bold uppercase text-[10px]">Collections Count</span>
            <div className="font-bold text-neutral-900 dark:text-white font-mono">
              Hero: {dbStatus?.counts?.hero || 1} • Services: {dbStatus?.counts?.services || 11} • WhyChoose: {dbStatus?.counts?.whyChoose || 8}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
