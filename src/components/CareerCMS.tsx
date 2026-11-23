'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  Clock,
  Award,
  Check,
  X,
  Sparkles,
  ExternalLink,
  Users,
} from 'lucide-react';

interface CareerCMSProps {
  careers: any[];
  onUpdate: (job: any) => Promise<void>;
  onAdd: (job: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onBack: () => void;
}

export default function CareerCMS({ careers, onUpdate, onAdd, onDelete, onBack }: CareerCMSProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [savedNotification, setSavedNotification] = useState('');

  const [formData, setFormData] = useState<any>({
    title: '',
    location: 'Vijayawada',
    type: 'Full Time',
    experience: '2+ Years',
    status: 'Open',
    department: 'Creative & Design',
    description: '',
    requirementsStr: '',
    isActive: true,
  });

  const handleOpenEdit = (job: any) => {
    setSelectedJob(job);
    setFormData({
      ...job,
      requirementsStr: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setSelectedJob(null);
    setFormData({
      id: 'job-' + Date.now(),
      title: 'Senior Motion Graphic Designer',
      location: 'Vijayawada',
      type: 'Full Time',
      experience: '3+ Years',
      status: 'Open',
      department: 'Creative',
      description: 'Craft high-converting motion graphics and cinematic reels for high-growth brands.',
      requirementsStr: 'Fluency with After Effects and Premiere\nStrong visual rhythm\nAgency experience',
      isActive: true,
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      requirements: formData.requirementsStr ? formData.requirementsStr.split('\n').filter(Boolean) : [],
    };

    if (isCreating) {
      await onAdd(updated);
      setSavedNotification('New position listed successfully!');
    } else {
      await onUpdate(updated);
      setSavedNotification('Position updated successfully!');
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
            <Briefcase className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37]" />
            <h2 className="text-lg font-black text-[#0f172a] dark:text-white">Careers &amp; Opportunities CMS</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#D4AF37] text-black font-black text-xs hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Job Opening</span>
        </button>
      </div>

      {savedNotification && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{savedNotification}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Open Positions</span>
          <div className="text-2xl font-black text-[#0f172a] dark:text-white mt-1">{careers.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Headquarters</span>
          <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-2">Vijayawada, AP</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Employment Type</span>
          <div className="text-sm font-black text-[#B8860B] dark:text-[#D4AF37] mt-2">Full Time</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-[#94a3b8]">Public Route</span>
          <a
            href="http://localhost:3000/career"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#B8860B] dark:text-[#D4AF37] mt-2 flex items-center gap-1 hover:underline"
          >
            <span>/career</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Career Positions Cards */}
      <div className="space-y-3">
        {careers.map((job) => (
          <div
            key={job.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] hover:border-[#D4AF37]/50 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-base font-black text-[#0f172a] dark:text-white">{job.title}</h3>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  job.status === 'Open'
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/40'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600'
                }`}>
                  ● {job.status}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] font-bold">
                  {job.department || 'Operations'}
                </span>
              </div>

              {job.description && (
                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] max-w-2xl leading-relaxed">
                  {job.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-[#64748b] dark:text-[#94a3b8] font-medium pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
                  <span>{job.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
                  <span>{job.type}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
                  <span>{job.experience}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleOpenEdit(job)}
                className="px-3 py-1.5 rounded-xl bg-[#f1f5f9] dark:bg-[#181d2f] hover:bg-[#D4AF37] text-[#0f172a] dark:text-white hover:text-black font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Position</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete job position "${job.title}"?`)) {
                    onDelete(job.id);
                  }
                }}
                className="p-2 rounded-xl bg-[#f1f5f9] dark:bg-[#181d2f] hover:bg-red-500 text-[#0f172a] dark:text-white hover:text-white transition-colors cursor-pointer"
                title="Delete Position"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Drawer Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-[#10131d] rounded-2xl sm:rounded-3xl border border-[#dbe0ea] dark:border-[#22293e] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#e2e8f0] dark:border-[#1e2333] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Briefcase className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37] shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-[#0f172a] dark:text-white truncate">
                  {isCreating ? 'Post New Career Opportunity' : 'Edit Position: ' + formData.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Job Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Employment Type</label>
                  <input
                    type="text"
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#0f172a] dark:text-white">Experience Required</label>
                  <input
                    type="text"
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Listing Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-bold focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="Open">Open (Actively Hiring)</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Role Overview</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Requirements (1 item per line)</label>
                <textarea
                  rows={3}
                  value={formData.requirementsStr}
                  onChange={(e) => setFormData({ ...formData, requirementsStr: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
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
