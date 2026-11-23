'use client';

import React from 'react';
import {
  Home,
  Info,
  Layers,
  FolderKanban,
  FileText,
  Briefcase,
  Mail,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Users,
} from 'lucide-react';

interface AllPagesCMSProps {
  setActiveView: (view: string) => void;
  counts: any;
}

export default function AllPagesCMS({ setActiveView, counts }: AllPagesCMSProps) {
  const PAGES = [
    {
      id: 'cms-home',
      title: 'Home Page',
      route: '/',
      description: 'Hero background video, What We Do service sliders, Why Choose Us cards, and 3D portfolio showcase.',
      icon: Home,
      badge: 'Active Live',
      sections: ['Hero Section & Video', 'What We Do (11 Services)', 'Why Choose Us', 'View Our Work Showcase', 'FAQ & CTA'],
    },
    {
      id: 'cms-about',
      title: 'About Us Page',
      route: '/about',
      description: 'Company backstory, founding vision, What Makes Us Different, and leadership team gallery.',
      icon: Info,
      badge: 'Active Live',
      sections: ['About Hero', 'Our Story & Mission', 'What Makes Us Different', 'Core Team Grid'],
    },
    {
      id: 'cms-services',
      title: 'Services Pages',
      route: '/services',
      description: 'Comprehensive service overview and 11 individual landing pages with custom process pipelines.',
      icon: Layers,
      badge: `${counts?.services || 11} Services`,
      sections: ['SMM', 'Content Creation', 'SEO', 'Meta/Google Ads', 'Affiliate', 'Influencer', 'Website', 'Logo', 'Cards', 'Brochures'],
    },
    {
      id: 'cms-portfolio',
      title: 'Portfolio & Case Studies',
      route: '/portfolio',
      description: 'Client project showcases, high-resolution media galleries, and project case study walkthroughs.',
      icon: FolderKanban,
      badge: `${counts?.ourWork || 15} Projects`,
      sections: ['Portfolio Filter Grid', 'Project Detail Pages', 'Client Results'],
    },
    {
      id: 'cms-clients',
      title: 'Clients & Partnerships',
      route: '/clients',
      description: 'Marquee client portfolio, key achievement metrics, brand logos, and partnership showcases.',
      icon: Users,
      badge: `${counts?.clients || 6} Clients`,
      sections: ['Client Metrics & ROAS', 'Logo SVGs', 'Visual Identity Partners', 'Publishing Status'],
    },
    {
      id: 'cms-blog',
      title: 'Blog & Articles',
      route: '/blog',
      description: 'Official digital marketing insights, branding thought leadership, and web technology guides from the website.',
      icon: FileText,
      badge: `${counts?.blogs || 5} Articles`,
      sections: ['5 Live Published Articles', 'Author & Category Filter', 'Rich Article Editor', 'SEO Slugs'],
    },
    {
      id: 'cms-career',
      title: 'Careers Page',
      route: '/career',
      description: 'Job opening listings, Vijayawada office roles, experience requirements, and candidate pipelines.',
      icon: Briefcase,
      badge: `${counts?.careers || 3} Openings`,
      sections: ['Content Writer (2+ Yrs)', 'Designer (4+ Yrs)', 'Digital Marketer (3+ Yrs)'],
    },
    {
      id: 'cms-contact',
      title: 'Contact Page',
      route: '/contact',
      description: 'Inquiry routing, office phone/email details, Google Map coordinates, and lead notifications.',
      icon: Mail,
      badge: 'Active Live',
      sections: ['Contact Form', 'Office Address', 'Direct Phone & Email', 'WhatsApp Chat'],
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#dbe0ea] dark:border-[#1e2333]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[11px] font-black text-[#B8860B] dark:text-[#D4AF37]">
            <Sparkles className="w-3 h-3" />
            <span>Complete Website Directory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
            All Website Pages
          </h2>
          <p className="text-xs text-[#64748b] dark:text-[#94a3b8]">
            Click any page card to configure its live text, images, and content directly stored in your database.
          </p>
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#121624] hover:bg-[#f1f5f9] dark:hover:bg-[#1a2034] border border-[#dbe0ea] dark:border-[#22293e] text-xs font-bold text-[#0f172a] dark:text-white transition-all self-start sm:self-auto shadow-xs cursor-pointer"
        >
          <span>Open Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#B8860B] dark:text-[#D4AF37]" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PAGES.map((page) => {
          const Icon = page.icon;
          return (
            <div
              key={page.id}
              onClick={() => setActiveView(page.id)}
              className="p-5 rounded-2xl bg-white dark:bg-[#10131d] border border-[#dbe0ea] dark:border-[#1e2333] hover:border-[#D4AF37] transition-all cursor-pointer shadow-xs hover:shadow-md group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] dark:bg-[#151928] group-hover:bg-[#D4AF37] border border-[#dbe0ea] dark:border-[#22293e] flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-[#B8860B] dark:text-[#D4AF37] group-hover:text-black transition-colors" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#B8860B] dark:text-[#D4AF37] font-bold">
                    {page.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-[#0f172a] dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-[#D4AF37] transition-colors">
                    {page.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#94a3b8] mt-0.5">
                    route: {page.route}
                  </div>
                </div>

                <p className="text-xs text-[#64748b] dark:text-[#94a3b8] line-clamp-2 leading-relaxed">
                  {page.description}
                </p>

                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                    Manageable Sections:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {page.sections.map((sec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#f1f5f9] dark:bg-[#161a29] text-[#475569] dark:text-[#94a3b8] font-medium"
                      >
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[#f1f5f9] dark:border-[#1a1e2d] flex items-center justify-between text-xs font-bold text-[#B8860B] dark:text-[#D4AF37]">
                <span>Open Editor</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
