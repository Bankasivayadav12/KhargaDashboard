'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FolderKanban,
  Edit3,
  Check,
  X,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface OurWorkCMSProps {
  items: any[];
  onUpdate: (item: any) => Promise<void>;
}

export default function OurWorkCMS({ items, onUpdate }: OurWorkCMSProps) {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [savedToast, setSavedToast] = useState('');

  const categories = ['ALL', 'E-commerce Branding', 'Interactive 3D Web', 'Web App & Dashboard', 'Luxury Packaging', 'FinTech Platform', 'Social Media & Content', 'Interior & Architecture', 'UI/UX Design System'];

  const filteredItems = items.filter((item) => {
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(editingItem);
    setIsModalOpen(false);
    setSavedToast(`"${editingItem.title}" updated successfully!`);
    setTimeout(() => setSavedToast(''), 3000);
  };

  return (
    <div className="max-w-6xl space-y-6 pb-20">
      {/* Top Banner and Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dbe0ea] dark:border-[#1e2333]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[11px] font-black text-[#B8860B] dark:text-[#D4AF37]">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Interactive Portfolio Showcase (15 Projects)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
            View Our Work Projects &amp; Imagery
          </h2>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
            Manage project cards, client attribution, category tags, and high-resolution media displayed in the 3D floating showcase on the homepage.
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
            Total Projects: <span className="text-[#B8860B] dark:text-[#D4AF37] font-black">{items.length}</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] text-xs font-bold text-[#0f172a] dark:text-white shadow-xs">
            Live in 3D Grid: <span className="text-emerald-600 dark:text-emerald-400 font-black">15</span>
          </span>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37] shadow-xs"
          />
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              categoryFilter === cat
                ? 'bg-[#D4AF37] text-neutral-950 font-black shadow-xs'
                : 'bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3-COLUMN CARDS GRID FORMAT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item, index) => {
          return (
            <div
              key={item.id}
              className="rounded-3xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group shadow-xs"
            >
              <div>
                {/* Large Featured Image Frame */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#0c0e17]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Overlaid Sequence Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-950/85 backdrop-blur-md text-[#D4AF37] font-mono text-xs font-black shadow-md border border-[#D4AF37]/30">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Overlaid Category Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/90 text-neutral-950 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Title Preview on Bottom of Image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-base font-black text-white drop-shadow-md leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0f172a] dark:text-white">
                    <span className="text-[#64748b] dark:text-[#94a3b8] font-medium">Client:</span>
                    <span className="text-[#B8860B] dark:text-[#D4AF37] font-extrabold">{item.client || 'Confidential'}</span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <div className="text-[10px] font-mono text-[#94a3b8] truncate pt-1">
                    {item.image}
                  </div>
                </div>
              </div>

              {/* Card Footer Controls */}
              <div className="p-4 pt-3 border-t border-[#f1f5f9] dark:border-[#1a1e2d] bg-[#fafbfc] dark:bg-[#0e111a] flex items-center justify-between gap-2">
                <a
                  href="http://localhost:3000/#our-work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#64748b] dark:text-[#94a3b8] hover:text-[#B8860B] dark:hover:text-[#D4AF37]"
                >
                  <span>3D View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenEdit(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-neutral-950 font-black text-xs hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Project</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal Drawer */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-xl max-h-[90vh] bg-white dark:bg-[#10131d] rounded-2xl sm:rounded-3xl border border-[#dbe0ea] dark:border-[#22293e] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#e2e8f0] dark:border-[#1e2333] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <FolderKanban className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37] shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-[#0f172a] dark:text-white truncate">
                  Edit Showcase Project: {editingItem.title}
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

            {/* Modal Body Form */}
            <form onSubmit={handleSaveModal} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem.client}
                    onChange={(e) => setEditingItem({ ...editingItem, client: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Category</label>
                <input
                  type="text"
                  required
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Image URL / Path</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    required
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                  <div className="relative w-full sm:w-14 h-24 sm:h-11 rounded-xl overflow-hidden border border-[#dbe0ea] dark:border-[#22293e] shrink-0 bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Project Description</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
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
