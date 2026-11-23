'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Users,
  Plus,
  Edit2,
  Trash2,
  Crown,
  Sparkles,
  X,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { initialTeamData } from '@/lib/initialData';

interface AboutCMSProps {
  onBack: () => void;
}

export default function AboutCMS({ onBack }: AboutCMSProps) {
  const [activeTab, setActiveTab] = useState<'narrative' | 'team'>('team');
  const [saved, setSaved] = useState(false);
  const [team, setTeam] = useState<any[]>(initialTeamData);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    heroTitle: 'We Build Brands That Command Respect.',
    heroSubtitle: 'Kharga Digital Media is an elite creative & digital technology powerhouse.',
    storyTitle: 'Crafted For High-Growth Market Leaders',
    storyText: 'When you work with KHARGA, you are not simply hiring someone to design a logo or run an ad. We look at the bigger picture.',
    missionText: 'Empower forward-thinking enterprises with magnetic brand identities, modern web architectures, and scalable growth funnels.',
    visionText: 'To be the undisputed standard of design innovation and revenue acceleration for ambitious ventures across India and beyond.',
  });

  const [memberForm, setMemberForm] = useState<any>({
    id: '',
    name: '',
    role: '',
    photo: '/images/team/team-founder.jpg',
    isFounder: false,
  });

  // Load live team from API
  useEffect(() => {
    fetch('/api/team')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.data && d.data.length > 0) {
          setTeam(d.data);
        }
      })
      .catch((err) => console.warn('Failed to load team from API', err));
  }, []);

  const handleSaveNarrative = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleOpenEditMember = (member: any) => {
    setEditingMember(member);
    setMemberForm({ ...member });
    setIsCreating(false);
    setIsModalOpen(true);
  };

  const handleOpenAddMember = () => {
    setEditingMember(null);
    setMemberForm({
      id: 'team-' + Date.now(),
      name: '',
      role: '',
      photo: '/images/team/team-founder.jpg',
      isFounder: false,
    });
    setIsCreating(true);
    setIsModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      setTeam((prev) => [...prev, memberForm]);
      await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberForm),
      }).catch(() => null);
    } else {
      setTeam((prev) => prev.map((m) => (m.id === memberForm.id ? memberForm : m)));
      await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberForm),
      }).catch(() => null);
    }
    setIsModalOpen(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeam((prev) => prev.filter((m) => m.id !== id));
      await fetch(`/api/team?id=${id}`, { method: 'DELETE' }).catch(() => null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl space-y-6 pb-16">
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#dbe0ea] dark:border-[#1e2333]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl bg-white dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#22293e] hover:bg-[#f1f5f9] dark:hover:bg-[#1a2034] text-[#0f172a] dark:text-white shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[10px] font-mono font-bold tracking-widest text-[#B8860B] dark:text-[#D4AF37] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>CMS / PAGES / ABOUT US</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white">
              About Us Page Management
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <a
            href="http://localhost:3000/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#121624] hover:bg-[#f1f5f9] dark:hover:bg-[#1a2034] border border-[#dbe0ea] dark:border-[#22293e] text-xs font-bold text-[#0f172a] dark:text-white transition-all shadow-xs cursor-pointer"
          >
            <span>Live /about</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
          </a>
        </div>
      </div>

      {/* Tabs Switcher: Narrative vs Meet Our Team */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#f1f5f9] dark:bg-[#121624] border border-[#dbe0ea] dark:border-[#1e2333] w-fit max-w-full overflow-x-auto no-scrollbar scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'team'
              ? 'bg-[#D4AF37] text-neutral-950 font-black shadow-xs'
              : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Meet Our Team ({team.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('narrative')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'narrative'
              ? 'bg-[#D4AF37] text-neutral-950 font-black shadow-xs'
              : 'text-[#475569] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Story &amp; Narrative Content</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>About Us page successfully updated and synced!</span>
        </div>
      )}

      {/* TAB 1: MEET OUR TEAM SECTION */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          {/* Header Action Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#B8860B] dark:text-[#D4AF37] uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Section: Meet Our Team</span>
              </div>
              <h3 className="text-base font-black text-[#0f172a] dark:text-white">
                Team Members &amp; Leadership Directory
              </h3>
              <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
                Manage founders, department heads, and creatives featured in the official About Us grid.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAddMember}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] text-neutral-950 font-black text-xs hover:brightness-105 transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Team Member</span>
            </button>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member) => (
              <div
                key={member.id}
                className={`rounded-3xl bg-white dark:bg-[#10131d] border transition-all p-5 shadow-xs flex flex-col justify-between group hover:border-[#D4AF37]/60 ${
                  member.isFounder
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 sm:col-span-2 lg:col-span-1'
                    : 'border-[#dbe0ea] dark:border-[#1e2333]'
                }`}
              >
                <div>
                  {/* Photo Preview Frame */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-400 via-[#D4AF37] to-amber-600 mb-4 shadow-inner">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50">
                        <Users className="w-12 h-12" />
                      </div>
                    )}
                    {member.isFounder && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                        <Crown className="w-3 h-3" />
                        <span>Founder</span>
                      </span>
                    )}
                  </div>

                  {/* Member Details */}
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-[#0f172a] dark:text-white leading-snug">
                      {member.name}
                    </h4>
                    <p className="text-xs font-bold text-[#B8860B] dark:text-[#D4AF37]">
                      {member.role}
                    </p>
                    <div className="text-[11px] font-mono text-[#94a3b8] truncate pt-1">
                      {member.photo}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-3 border-t border-[#f1f5f9] dark:border-[#1a1e2d] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditMember(member)}
                    className="px-3 py-1.5 rounded-xl bg-[#f1f5f9] dark:bg-[#181d2f] hover:bg-[#D4AF37] text-[#0f172a] dark:text-white hover:text-black font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  {!member.isFounder && (
                    <button
                      type="button"
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-2 rounded-xl bg-[#f1f5f9] dark:bg-[#181d2f] hover:bg-red-500 text-[#0f172a] dark:text-white hover:text-white transition-colors cursor-pointer"
                      title="Remove Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NARRATIVE & STORY */}
      {activeTab === 'narrative' && (
        <form onSubmit={handleSaveNarrative} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] shadow-xs space-y-5 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-[#0f172a] dark:text-white uppercase">About Hero Title</label>
            <input
              type="text"
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl px-4 py-2.5 text-xs text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#0f172a] dark:text-white uppercase">Hero Subtitle</label>
            <textarea
              rows={2}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl px-4 py-2.5 text-xs text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-[#0f172a] dark:text-white uppercase">What Makes Us Different Narrative</label>
            <textarea
              rows={3}
              value={formData.storyText}
              onChange={(e) => setFormData({ ...formData, storyText: e.target.value })}
              className="w-full bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl px-4 py-2.5 text-xs text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-[#0f172a] dark:text-white uppercase">Mission Statement</label>
              <textarea
                rows={3}
                value={formData.missionText}
                onChange={(e) => setFormData({ ...formData, missionText: e.target.value })}
                className="w-full bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl px-4 py-2.5 text-xs text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-[#0f172a] dark:text-white uppercase">Vision Statement</label>
              <textarea
                rows={3}
                value={formData.visionText}
                onChange={(e) => setFormData({ ...formData, visionText: e.target.value })}
                className="w-full bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] rounded-xl px-4 py-2.5 text-xs text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-[#f1f5f9] dark:border-[#1a1e2d]">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-neutral-950 font-black text-xs uppercase shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Narrative</span>
            </button>
          </div>
        </form>
      )}

      {/* Edit / Add Team Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-lg max-h-[90vh] bg-white dark:bg-[#10131d] rounded-2xl sm:rounded-3xl border border-[#dbe0ea] dark:border-[#22293e] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-auto">
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-[#e2e8f0] dark:border-[#1e2333] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <Users className="w-4 h-4 text-[#B8860B] dark:text-[#D4AF37] shrink-0" />
                <h3 className="text-sm sm:text-base font-black text-[#0f172a] dark:text-white truncate">
                  {isCreating ? 'Add New Team Member' : 'Edit Team Member: ' + memberForm.name}
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

            <form onSubmit={handleSaveMember} className="p-4 sm:p-6 space-y-4 text-xs overflow-y-auto flex-1">
              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Full Name</label>
                <input
                  type="text"
                  required
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Role / Designation</label>
                <input
                  type="text"
                  required
                  value={memberForm.role}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                  placeholder="e.g. Senior Creative Director"
                  className="w-full p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-medium focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#0f172a] dark:text-white">Photo URL or Path</label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <input
                    type="text"
                    required
                    value={memberForm.photo}
                    onChange={(e) => setMemberForm({ ...memberForm, photo: e.target.value })}
                    className="flex-1 p-2.5 rounded-xl bg-[#f8fafc] dark:bg-[#151928] border border-[#dbe0ea] dark:border-[#22293e] text-[#0f172a] dark:text-white font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                  <div className="relative w-full sm:w-12 h-20 sm:h-12 rounded-xl overflow-hidden border border-[#dbe0ea] dark:border-[#22293e] shrink-0 bg-neutral-200">
                    {memberForm.photo ? (
                      <Image src={memberForm.photo} alt="Preview" fill className="object-cover" />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#0f172a] dark:text-white">
                  <input
                    type="checkbox"
                    checked={memberForm.isFounder}
                    onChange={(e) => setMemberForm({ ...memberForm, isFounder: e.target.checked })}
                    className="accent-[#D4AF37] w-4 h-4 rounded cursor-pointer"
                  />
                  <span>Mark as Executive Founder / Leadership</span>
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
