'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  FileText,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Clock,
  ExternalLink,
  Check,
  X,
  Sparkles,
  Tag,
  Search,
  BookOpen,
} from 'lucide-react';

interface BlogCMSProps {
  blogs: any[];
  onUpdate: (blog: any) => Promise<void>;
  onAdd: (blog: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onBack: () => void;
}

export default function BlogCMS({ blogs, onUpdate, onAdd, onDelete, onBack }: BlogCMSProps) {
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [savedNotification, setSavedNotification] = useState('');

  // Form State
  const [formData, setFormData] = useState<any>({
    title: '',
    slug: '',
    category: 'WEB DESIGN',
    excerpt: '',
    image: '/images/blogs/website.jpg',
    date: '05 SEP 2026, Saturday, 10:55 PM',
    readTime: '5 min read',
    introText: '',
    isActive: true,
  });

  const categories = ['ALL', 'WEB DESIGN', 'BRANDING', 'SOCIAL MEDIA', 'UI/UX DESIGN', 'DIGITAL MARKETING'];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = categoryFilter === 'ALL' || b.category.toUpperCase() === categoryFilter.toUpperCase();
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenEdit = (blog: any) => {
    setSelectedBlog(blog);
    setFormData({
      ...blog,
      introText: Array.isArray(blog.content?.intro) ? blog.content.intro.join('\n\n') : (blog.content?.intro || ''),
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setSelectedBlog(null);
    setFormData({
      id: 'blog-' + Date.now(),
      title: 'New Digital Marketing Insight',
      slug: 'new-digital-marketing-insight',
      category: 'DIGITAL MARKETING',
      excerpt: 'Comprehensive blueprint on scaling enterprise visibility through targeted media channels.',
      image: '/images/blogs/website.jpg',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      readTime: '5 min read',
      introText: 'In today\'s dynamic digital landscape, maintaining brand momentum requires continuous adaptation and strategic foresight.',
      content: {
        intro: ['In today\'s dynamic digital landscape, maintaining brand momentum requires continuous adaptation and strategic foresight.'],
        sections: [
          {
            heading: '1. Establish Strategic Foundation',
            paragraphs: ['Align internal marketing capabilities with customer lifetime value.'],
          },
        ],
        checklistTitle: 'Strategic Checklist',
        checklistItems: ['High conversion focus', 'Rigorous analytics'],
        finalThoughtsHeading: 'Final Thoughts',
        finalThoughtsText: ['Invest in sustainable marketing practices.'],
      },
      isActive: true,
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      content: {
        ...(formData.content || {}),
        intro: formData.introText ? formData.introText.split('\n\n') : formData.content?.intro || [],
      },
    };

    if (isCreating) {
      await onAdd(updated);
      setSavedNotification('New article published successfully!');
    } else {
      await onUpdate(updated);
      setSavedNotification('Article updated successfully!');
    }

    setIsEditing(false);
    setTimeout(() => setSavedNotification(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#dbe0ea] dark:border-[#1e2333]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-bold hover:underline cursor-pointer"
          >
            ← Back to All Pages
          </button>
          <span className="text-[#94a3b8]">/</span>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37]" />
            <h2 className="text-lg font-black text-[#0f172a] dark:text-white">Blog &amp; Articles Management</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-black font-black text-xs hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Write New Article</span>
        </button>
      </div>

      {savedNotification && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Total Articles</span>
          <div className="text-2xl font-black text-[#0f172a] dark:text-white mt-1">{blogs.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Live on Website</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            {blogs.filter((b) => b.isActive !== false).length}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Categories</span>
          <div className="text-2xl font-black text-[#B8860B] dark:text-[#D4AF37] mt-1">5</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Public URL</span>
          <a
            href="http://localhost:3000/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#B8860B] dark:text-[#D4AF37] mt-2 flex items-center gap-1 hover:underline"
          >
            <span>/blog</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
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

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] text-xs text-[#0f172a] dark:text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] hover:border-[#D4AF37]/50 shadow-xs transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image Preview Banner */}
              <div className="relative w-full h-44 bg-[#08090f] overflow-hidden">
                <Image
                  src={blog.image || '/images/blogs/website.jpg'}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-neutral-950 text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {blog.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/80 text-[11px] font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{blog.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-sm font-black text-[#0f172a] dark:text-white line-clamp-2 leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
                <div className="text-[11px] font-mono text-[#B8860B] dark:text-[#D4AF37] truncate pt-1">
                  slug: /{blog.slug}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-2 border-t border-[#f1f5f9] dark:border-[#181d2f] flex items-center justify-between">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                blog.isActive !== false
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
              }`}>
                {blog.isActive !== false ? '● Live Published' : '○ Draft'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(blog)}
                  className="p-1.5 rounded-lg bg-[#f1f5f9] dark:bg-[#181d2f] hover:bg-[#D4AF37] text-[#0f172a] dark:text-white hover:text-black transition-colors cursor-pointer"
                  title="Edit Article"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`http://localhost:3000/blog/${blog.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#f1f5f9] dark:bg-[#181d2f] hover:bg-[#D4AF37] text-[#0f172a] dark:text-white hover:text-black transition-colors"
                  title="Preview on Live Site"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete article "${blog.title}"?`)) {
                      onDelete(blog.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-[#f1f5f9] dark:bg-[#181d2f] hover:bg-red-500 text-[#0f172a] dark:text-white hover:text-white transition-colors cursor-pointer"
                  title="Delete Article"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Drawer Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#10131d] rounded-3xl border border-[#dbe0ea] dark:border-[#22293e] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#e2e8f0] dark:border-[#1e2333] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37]" />
                <h3 className="text-base font-black text-[#0f172a] dark:text-white">
                  {isCreating ? 'Create New Article' : 'Edit Article: ' + formData.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Article Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-bold focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="WEB DESIGN">WEB DESIGN</option>
                    <option value="BRANDING">BRANDING</option>
                    <option value="SOCIAL MEDIA">SOCIAL MEDIA</option>
                    <option value="UI/UX DESIGN">UI/UX DESIGN</option>
                    <option value="DIGITAL MARKETING">DIGITAL MARKETING</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Publish Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Feature Image Path</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                  <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-[#dbe0ea] dark:border-[#22293e] shrink-0">
                    <Image src={formData.image || '/images/blogs/website.jpg'} alt="Preview" fill className="object-cover" />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Article Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Introduction Text (Paragraphs separated by blank line)</label>
                <textarea
                  rows={4}
                  value={formData.introText}
                  onChange={(e) => setFormData({ ...formData, introText: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#0f172a] dark:text-white">
                  <input
                    type="checkbox"
                    checked={formData.isActive !== false}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="accent-[#D4AF37] w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Publish as Active Article on Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0] dark:border-[#1e2333]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
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
