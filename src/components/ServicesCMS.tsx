'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Edit3,
  ExternalLink,
  Check,
  X,
  Layers,
  Search,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

interface ServicesCMSProps {
  services: any[];
  onUpdate: (service: any) => Promise<void>;
  onReorder: (items: any[]) => Promise<void>;
  onAdd: (service: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function ServicesCMS({
  services,
  onUpdate,
  onReorder,
}: ServicesCMSProps) {
  const [editingService, setEditingService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedToast, setSavedToast] = useState('');

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenEdit = (service: any) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editingService);
    setIsModalOpen(false);
    setSavedToast(`"${editingService.title}" updated successfully!`);
    setTimeout(() => setSavedToast(''), 3000);
  };

  const handleShift = async (index: number, direction: 'prev' | 'next') => {
    const targetIdx = direction === 'prev' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= services.length) return;

    const copy = [...services];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);

    const reordered = copy.map((item, idx) => ({ ...item, order: idx + 1 }));
    await onReorder(reordered.map((m) => ({ id: m.id, order: m.order })));
    setSavedToast('Service order updated!');
    setTimeout(() => setSavedToast(''), 2500);
  };

  return (
    <div className="max-w-6xl space-y-6 pb-20">
      {/* Top Banner and Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dbe0ea] dark:border-[#1e2333]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[11px] font-black text-[#B8860B] dark:text-[#D4AF37]">
            <Layers className="w-3.5 h-3.5" />
            <span>Cards Grid View</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
            Services &amp; What We Do (11 Services)
          </h2>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
            Card-based executive view for inspecting images, copy, explore links, and custom display sequence.
          </p>
        </div>

        {savedToast && (
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in shadow-xs">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{savedToast}</span>
          </div>
        )}
      </div>

      {/* Filter and Metrics Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] text-xs font-bold text-[#0f172a] dark:text-white shadow-xs">
            Total Cards: <span className="text-[#B8860B] dark:text-[#D4AF37] font-black">{services.length}</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] text-xs font-bold text-[#0f172a] dark:text-white shadow-xs">
            Active: <span className="text-emerald-600 dark:text-emerald-400 font-black">{services.filter((s) => s.isActive !== false).length}</span>
          </span>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search services by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37] shadow-xs"
          />
        </div>
      </div>

      {/* 3-COLUMN CARDS GRID FORMAT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredServices.map((service, index) => {
          const actualIndex = services.findIndex((s) => s.id === service.id);

          return (
            <div
              key={service.id}
              className="rounded-3xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Large Featured Image Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0c0e17]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Top Corner Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-950/85 backdrop-blur-md text-[#D4AF37] font-mono text-xs font-black shadow-md border border-[#D4AF37]/30">
                      #{actualIndex + 1}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                        service.isActive !== false
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-rose-500/90 text-white'
                      }`}
                    >
                      {service.isActive !== false ? '● Active' : '○ Hidden'}
                    </span>
                  </div>

                  {/* Title Preview on Bottom of Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-base font-black text-white drop-shadow-md leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-2.5">
                  <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <div className="pt-1">
                    <a
                      href={`http://localhost:3000${service.exploreUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#B8860B] dark:text-[#D4AF37] hover:underline truncate max-w-full"
                    >
                      <span>{service.exploreUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Card Footer Controls */}
              <div className="p-4 pt-3 border-t border-[#f1f5f9] dark:border-[#1a1e2d] bg-[#fafbfc] dark:bg-[#0e111a] flex items-center justify-between gap-2">
                {/* Reorder Arrows */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={actualIndex === 0}
                    onClick={() => handleShift(actualIndex, 'prev')}
                    className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                      actualIndex === 0
                        ? 'opacity-30 border-transparent text-neutral-400 cursor-not-allowed'
                        : 'border-[#dbe0ea] dark:border-[#22293e] hover:bg-[#D4AF37] hover:text-black text-[#0f172a] dark:text-white cursor-pointer'
                    }`}
                    title="Move Left / Earlier"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    disabled={actualIndex === services.length - 1}
                    onClick={() => handleShift(actualIndex, 'next')}
                    className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                      actualIndex === services.length - 1
                        ? 'opacity-30 border-transparent text-neutral-400 cursor-not-allowed'
                        : 'border-[#dbe0ea] dark:border-[#22293e] hover:bg-[#D4AF37] hover:text-black text-[#0f172a] dark:text-white cursor-pointer'
                    }`}
                    title="Move Right / Later"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleOpenEdit(service)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-neutral-950 font-black text-xs hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Card</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Edit Modal Drawer */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl max-h-[90vh] bg-white dark:bg-[#10131d] rounded-2xl sm:rounded-3xl border border-[#dbe0ea] dark:border-[#22293e] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#e2e8f0] dark:border-[#1e2333] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Layers className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37] shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-[#0f172a] dark:text-white truncate">
                  Edit Service: {editingService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveModal} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Image URL / Path</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    required
                    value={editingService.image}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                  <div className="relative w-full sm:w-14 h-24 sm:h-11 rounded-xl overflow-hidden border border-[#dbe0ea] dark:border-[#22293e] shrink-0 bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editingService.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Live Explore Route</label>
                <input
                  type="text"
                  required
                  value={editingService.exploreUrl}
                  onChange={(e) => setEditingService({ ...editingService, exploreUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#0f172a] dark:text-white">
                  <input
                    type="checkbox"
                    checked={editingService.isActive !== false}
                    onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                    className="accent-[#D4AF37] w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Active in What We Do section</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0] dark:border-[#1e2333]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#dbe0ea] dark:border-[#22293e] font-bold text-[#475569] dark:text-[#94a3b8] hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4AF37] text-neutral-950 font-black shadow-md hover:brightness-105 active:scale-95 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
