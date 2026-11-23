'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Search,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  X,
  Save,
  RefreshCw,
  Crown,
  Hexagon,
  Zap,
  Shield,
  Globe,
  Tag,
  TrendingUp,
  Eye,
  EyeOff,
} from 'lucide-react';

interface ClientsCMSProps {
  clients: any[];
  onUpdate: (client: any) => Promise<void>;
  onAdd: (client: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onBack: () => void;
  onRefresh?: () => Promise<void>;
}

const LOGO_ICONS: Record<string, React.ElementType> = {
  crown: Crown,
  hexagon: Hexagon,
  zap: Zap,
  shield: Shield,
  sparkles: Sparkles,
  globe: Globe,
};

const CATEGORIES = [
  'ALL',
  'Visual Identity',
  'Web Experience',
  'Digital Growth',
  'Print & ID Systems',
  'Social Marketing',
  'Affiliate Scale',
];

export default function ClientsCMS({
  clients,
  onUpdate,
  onAdd,
  onDelete,
  onBack,
  onRefresh,
}: ClientsCMSProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    clientName: '',
    clientTagline: '',
    category: 'Visual Identity',
    metric: '',
    description: '',
    image: '/images/logo-design.jpg',
    logoSvg: 'crown',
    logoUrl: '/images/logos/aeterna-logo.svg',
    isPublished: true,
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    try {
      await onRefresh();
      showNotification('Synced with MongoDB Atlas!');
    } catch {
      showNotification('Refresh failed');
    } finally {
      setRefreshing(false);
    }
  };

  const handleOpenAdd = () => {
    setIsCreating(true);
    setFormData({
      id: `client-${Date.now()}`,
      clientName: '',
      clientTagline: '',
      category: 'Visual Identity',
      metric: '+150% Growth',
      description: '',
      image: '/images/logo-design.jpg',
      logoSvg: 'crown',
      logoUrl: '',
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client: any) => {
    setIsCreating(false);
    setFormData({
      id: client.id,
      clientName: client.clientName || '',
      clientTagline: client.clientTagline || '',
      category: client.category || 'Visual Identity',
      metric: client.metric || '',
      description: client.description || '',
      image: client.image || '/images/logo-design.jpg',
      logoSvg: client.logoSvg || 'crown',
      logoUrl: client.logoUrl || '',
      isPublished: client.isPublished !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        id: formData.id || formData.clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      if (isCreating) {
        await onAdd(payload);
        showNotification(`Created "${payload.clientName}" in MongoDB Atlas!`);
      } else {
        await onUpdate(payload);
        showNotification(`Updated "${payload.clientName}" successfully!`);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      showNotification(`Error: ${err?.message || 'Failed to save'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (client: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...client, isPublished: !client.isPublished };
    await onUpdate(updated);
    showNotification(`Status updated for "${client.clientName}"`);
  };

  const handleDelete = async (client: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete client "${client.clientName}"?`)) {
      await onDelete(client.id);
      showNotification(`Deleted "${client.clientName}"`);
    }
  };

  // Filter logic
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      (c.clientName && c.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.clientTagline && c.clientTagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.metric && c.metric.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' || c.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PUBLISHED' && c.isPublished !== false) ||
      (statusFilter === 'DRAFT' && c.isPublished === false);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const publishedCount = clients.filter((c) => c.isPublished !== false).length;
  const draftCount = clients.length - publishedCount;

  return (
    <div className="max-w-6xl space-y-6 pb-20">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dbe0ea] dark:border-[#1e2333]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#22293e] hover:bg-[#f1f5f9] dark:hover:bg-[#1a2034] text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white transition-colors shadow-xs cursor-pointer"
            title="Back to All Pages"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#B8860B] dark:text-[#D4AF37] uppercase">
                CMS / PAGES / CLIENTS
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                MongoDB Atlas Active
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight flex items-center gap-2.5">
              <Users className="w-6 h-6 text-[#B8860B] dark:text-[#D4AF37]" />
              <span>Clients &amp; Brand Partnerships</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {onRefresh && (
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 rounded-xl bg-white dark:bg-[#121624] hover:bg-[#f1f5f9] dark:hover:bg-[#1a2034] border border-[#dbe0ea] dark:border-[#22293e] text-[#475569] dark:text-[#94a3b8] transition-all cursor-pointer shadow-xs"
              title="Refresh from MongoDB"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#D4AF37]' : ''}`} />
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#e0b83b] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between shadow-md transition-all animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{notification}</span>
          </div>
          <button type="button" onClick={() => setNotification(null)} className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <div className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
            Total Clients
          </div>
          <div className="text-2xl font-black text-[#0f172a] dark:text-white mt-1">
            {clients.length}
          </div>
          <div className="text-[10px] font-mono text-[#B8860B] dark:text-[#D4AF37] mt-0.5">
            collection: clientsdata
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <div className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
            Live Published
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {publishedCount}
          </div>
          <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">
            Visible on Website
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <div className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
            Draft Mode
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
            {draftCount}
          </div>
          <div className="text-[10px] text-amber-600/80 dark:text-amber-400/80 mt-0.5">
            Hidden from site
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <div className="text-[10px] font-bold text-[#64748b] dark:text-[#94a3b8] uppercase tracking-wider">
            Database Sync
          </div>
          <div className="text-sm font-black text-[#0f172a] dark:text-white mt-2 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>MongoDB Atlas</span>
          </div>
          <div className="text-[10px] font-mono text-[#64748b] dark:text-[#94a3b8] mt-0.5 truncate">
            cluster0.lz5nypb
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#10131d] p-3 rounded-2xl border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, metric, category, description..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 self-start md:self-auto">
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                statusFilter === s
                  ? 'bg-[#D4AF37] text-neutral-950 font-black shadow-xs'
                  : 'bg-neutral-50 dark:bg-[#151928] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white'
              }`}
            >
              {s === 'ALL' ? 'All Status' : s === 'PUBLISHED' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0f172a] dark:bg-white text-white dark:text-[#0f172a] shadow-xs'
                  : 'bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Client Cards Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#10131d] rounded-3xl border border-dashed border-[#dbe0ea] dark:border-[#22293e] space-y-3">
          <Users className="w-10 h-10 text-[#94a3b8] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#0f172a] dark:text-white">No clients found</h3>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8] max-w-sm mx-auto">
            Try adjusting your search query or category filter, or create a new client card.
          </p>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] text-neutral-950 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Client</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClients.map((client) => {
            const IconComponent = LOGO_ICONS[client.logoSvg] || Sparkles;
            const isLive = client.isPublished !== false;

            return (
              <div
                key={client.id}
                className="bg-white dark:bg-[#10131d] rounded-2xl border border-[#dbe0ea] dark:border-[#1e2333] hover:border-[#D4AF37] transition-all shadow-xs hover:shadow-lg flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Media Preview Header */}
                <div className="relative h-40 w-full overflow-hidden bg-neutral-950 flex items-center justify-center">
                  {client.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={client.image}
                      alt={client.clientName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-[#0a0c14] to-[#1a1f33]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1.5">
                      <Tag className="w-3 h-3" />
                      <span>{client.category || 'Visual Identity'}</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleTogglePublish(client, e)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 cursor-pointer transition-colors ${
                        isLive
                          ? 'bg-emerald-500/80 text-white'
                          : 'bg-amber-500/80 text-neutral-950'
                      }`}
                      title="Click to toggle publish status"
                    >
                      {isLive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{isLive ? 'Live' : 'Draft'}</span>
                    </button>
                  </div>

                  {/* Logo Symbol & Client Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-neutral-950 flex items-center justify-center shrink-0 shadow-md">
                      <IconComponent className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-black text-white tracking-wide uppercase truncate">
                        {client.clientName}
                      </h4>
                      <p className="text-[11px] text-neutral-300 truncate font-mono">
                        {client.clientTagline || 'Partner Brand'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Metric Highlight Box */}
                    {client.metric && (
                      <div className="px-3 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8] flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
                          <span>Key Metric</span>
                        </span>
                        <span className="text-xs font-black text-[#B8860B] dark:text-[#D4AF37]">
                          {client.metric}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-[#64748b] dark:text-[#94a3b8] line-clamp-3 leading-relaxed">
                      {client.description || 'No description provided.'}
                    </p>
                  </div>

                  {/* Card Bottom Meta & Actions */}
                  <div className="pt-3 border-t border-[#dbe0ea] dark:border-[#1e2333] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#94a3b8] truncate">
                      ID: {client.id}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(client)}
                        className="p-1.5 rounded-lg bg-neutral-100 dark:bg-[#151928] hover:bg-[#D4AF37] hover:text-black text-[#64748b] dark:text-[#94a3b8] transition-colors cursor-pointer"
                        title="Edit Client"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(client, e)}
                        className="p-1.5 rounded-lg bg-neutral-100 dark:bg-[#151928] hover:bg-rose-500 hover:text-white text-[#64748b] dark:text-[#94a3b8] transition-colors cursor-pointer"
                        title="Delete Client"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0c0e17] rounded-3xl border border-[#dbe0ea] dark:border-[#1e2333] max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#dbe0ea] dark:border-[#1e2333] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#B8860B] dark:text-[#D4AF37] uppercase">
                  {isCreating ? 'CREATE NEW PARTNERSHIP' : 'EDIT CLIENT DETAILS'}
                </span>
                <h3 className="text-xl font-black text-[#0f172a] dark:text-white">
                  {isCreating ? 'Add Client to MongoDB Atlas' : `Edit "${formData.clientName}"`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#151928] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Column: Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                      Client Brand Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. AETERNA GOODS"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                      Client Tagline / Industry Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.clientTagline}
                      onChange={(e) => setFormData({ ...formData, clientTagline: e.target.value })}
                      placeholder="e.g. Haute Horlogerie & Fashion"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        {CATEGORIES.filter((c) => c !== 'ALL').map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                        Key Metric / ROAS
                      </label>
                      <input
                        type="text"
                        value={formData.metric}
                        onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                        placeholder="e.g. +240% Brand Value"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                      </input>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                      Description &amp; Case Highlights
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed statement on the creative or performance results delivered for this client..."
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Right Column: Visual Assets & Live Preview */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                      Showcase Image URL or Path
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/logo-design.jpg"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                        Brand Icon Symbol
                      </label>
                      <select
                        value={formData.logoSvg}
                        onChange={(e) => setFormData({ ...formData, logoSvg: e.target.value })}
                        className="w-full px-3 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="crown">Crown (Luxury / Royal)</option>
                        <option value="hexagon">Hexagon (Tech / Cyber)</option>
                        <option value="zap">Zap (Performance / Speed)</option>
                        <option value="shield">Shield (Wealth / Security)</option>
                        <option value="sparkles">Sparkles (Social / Creator)</option>
                        <option value="globe">Globe (Fintech / Global)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0f172a] dark:text-white mb-1.5">
                        Unique Slug / ID
                      </label>
                      <input
                        type="text"
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        placeholder="aeterna-luxury"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl text-xs font-mono text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="clientPublished"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer"
                    />
                    <label
                      htmlFor="clientPublished"
                      className="text-xs font-bold text-[#0f172a] dark:text-white cursor-pointer"
                    >
                      Publish immediately (visible to visitors on website)
                    </label>
                  </div>

                  {/* Quick Card Preview */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-[#B8860B] dark:text-[#D4AF37] uppercase tracking-wider mb-1.5">
                      Real-time Live Preview
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-neutral-950 flex items-center justify-center font-bold">
                          {React.createElement(LOGO_ICONS[formData.logoSvg] || Sparkles, {
                            className: 'w-4 h-4',
                          })}
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#0f172a] dark:text-white uppercase">
                            {formData.clientName || 'CLIENT NAME'}
                          </div>
                          <div className="text-[10px] text-[#64748b] dark:text-[#94a3b8]">
                            {formData.clientTagline || 'Tagline'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#B8860B] dark:text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-md">
                        {formData.metric || 'Metric'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Bottom Buttons */}
              <div className="pt-4 border-t border-[#dbe0ea] dark:border-[#1e2333] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#dbe0ea] dark:border-[#22293e] text-xs font-bold text-[#64748b] dark:text-[#94a3b8] hover:bg-neutral-100 dark:hover:bg-[#151928] transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#e0b83b] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving to MongoDB...' : 'Save to MongoDB Atlas'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
