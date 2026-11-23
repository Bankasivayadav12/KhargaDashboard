'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import OverviewCMS from '@/components/OverviewCMS';
import AllPagesCMS from '@/components/AllPagesCMS';
import HomePageCMS from '@/components/HomePageCMS';
import ServicesCMS from '@/components/ServicesCMS';
import OurWorkCMS from '@/components/OurWorkCMS';
import AboutCMS from '@/components/AboutCMS';
import ContactCMS from '@/components/ContactCMS';
import BlogCMS from '@/components/BlogCMS';
import CareerCMS from '@/components/CareerCMS';
import ClientsCMS from '@/components/ClientsCMS';
import SettingsCMS from '@/components/SettingsCMS';
import {
  initialHeroData,
  initialServicesData,
  initialWhyChooseData,
  initialOurWorkData,
  initialBlogsData,
  initialCareersData,
  initialClientsData,
} from '@/lib/initialData';

export default function DashboardPage() {
  const [activeView, setActiveView] = useState('overview');
  const [homeSection, setHomeSection] = useState('hero');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [heroData, setHeroData] = useState<any>(initialHeroData);
  const [services, setServices] = useState<any[]>(initialServicesData);
  const [whyChoose, setWhyChoose] = useState<any[]>(initialWhyChooseData);
  const [ourWork, setOurWork] = useState<any[]>(initialOurWorkData);
  const [blogs, setBlogs] = useState<any[]>(initialBlogsData);
  const [careers, setCareers] = useState<any[]>(initialCareersData);
  const [clients, setClients] = useState<any[]>(initialClientsData);
  const [isSeeding, setIsSeeding] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync dark class with document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const loadAllData = async () => {
    const fetchSafe = async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        console.warn('Safe fetch failed for ' + url, e);
        return null;
      }
    };

    try {
      const [statusRes, heroRes, servicesRes, whyChooseRes, ourWorkRes, blogsRes, careersRes, clientsRes] = await Promise.all([
        fetchSafe('/api/status'),
        fetchSafe('/api/hero'),
        fetchSafe('/api/services'),
        fetchSafe('/api/why-choose'),
        fetchSafe('/api/our-work'),
        fetchSafe('/api/blogs'),
        fetchSafe('/api/careers'),
        fetchSafe('/api/clientsdata'),
      ]);

      if (statusRes) setDbStatus(statusRes);
      if (heroRes?.data) setHeroData(heroRes.data);
      if (servicesRes?.data && servicesRes.data.length > 0) setServices(servicesRes.data);
      if (whyChooseRes?.data && whyChooseRes.data.length > 0) setWhyChoose(whyChooseRes.data);
      if (ourWorkRes?.data && ourWorkRes.data.length > 0) setOurWork(ourWorkRes.data);
      if (blogsRes?.data && blogsRes.data.length > 0) setBlogs(blogsRes.data);
      if (careersRes?.data && careersRes.data.length > 0) setCareers(careersRes.data);
      if (clientsRes?.data && clientsRes.data.length > 0) setClients(clientsRes.data);
    } catch (e) {
      console.error('Failed to load CMS data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleSaveHero = async (updatedHero: any) => {
    setHeroData(updatedHero);
    const res = await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHero),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) setHeroData(res.data);
  };

  const handleUpdateService = async (service: any) => {
    setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
    const res = await fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setServices((prev) => prev.map((s) => (s.id === service.id ? res.data : s)));
    }
  };

  const handleReorderServices = async (items: any[]) => {
    setServices(items);
    const res = await fetch('/api/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) setServices(res.data);
  };

  const handleUpdateWhyChoose = async (item: any) => {
    setWhyChoose((prev) => prev.map((w) => (w.id === item.id ? item : w)));
    const res = await fetch('/api/why-choose', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setWhyChoose((prev) => prev.map((w) => (w.id === item.id ? res.data : w)));
    }
  };

  const handleUpdateOurWork = async (item: any) => {
    setOurWork((prev) => prev.map((p) => (p.id === item.id ? item : p)));
    const res = await fetch('/api/our-work', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setOurWork((prev) => prev.map((p) => (p.id === item.id ? res.data : p)));
    }
  };

  const handleUpdateBlog = async (blog: any) => {
    setBlogs((prev) => prev.map((b) => (b.id === blog.id ? blog : b)));
    const res = await fetch('/api/blogs', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? res.data : b)));
    }
  };

  const handleAddBlog = async (blog: any) => {
    setBlogs((prev) => [blog, ...prev]);
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setBlogs((prev) => [res.data, ...prev.filter((b) => b.id !== blog.id)]);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' }).catch(() => null);
  };

  const handleUpdateCareer = async (job: any) => {
    setCareers((prev) => prev.map((c) => (c.id === job.id ? job : c)));
    const res = await fetch('/api/careers', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setCareers((prev) => prev.map((c) => (c.id === job.id ? res.data : c)));
    }
  };

  const handleAddCareer = async (job: any) => {
    setCareers((prev) => [job, ...prev]);
    const res = await fetch('/api/careers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setCareers((prev) => [res.data, ...prev.filter((c) => c.id !== job.id)]);
    }
  };

  const handleDeleteCareer = async (id: string) => {
    setCareers((prev) => prev.filter((c) => c.id !== id));
    await fetch(`/api/careers?id=${id}`, { method: 'DELETE' }).catch(() => null);
  };

  const handleUpdateClient = async (client: any) => {
    setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
    const res = await fetch('/api/clientsdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setClients((prev) => prev.map((c) => (c.id === client.id ? res.data : c)));
    }
  };

  const handleAddClient = async (client: any) => {
    setClients((prev) => [client, ...prev]);
    const res = await fetch('/api/clientsdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    }).then((r) => r.json()).catch(() => null);
    if (res?.data) {
      setClients((prev) => [res.data, ...prev.filter((c) => c.id !== client.id)]);
    }
  };

  const handleDeleteClient = async (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    await fetch(`/api/clientsdata?id=${id}`, { method: 'DELETE' }).catch(() => null);
  };

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      await fetch('/api/seed', { method: 'POST' });
      await loadAllData();
    } finally {
      setIsSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-[#edf1f7] dark:bg-[#08090f] flex items-center justify-center transition-colors">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#B8860B] dark:text-[#D4AF37] uppercase">
            Loading Kharga CMS...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen max-h-screen bg-[#edf1f7] dark:bg-[#08090f] flex text-[#0f172a] dark:text-[#f8fafc] font-sans antialiased overflow-hidden transition-colors duration-250 relative">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        homeSection={homeSection}
        setHomeSection={setHomeSection}
        counts={{
          services: services.length,
          whyChoose: whyChoose.length,
          ourWork: ourWork.length,
          clients: clients.length,
          blogs: blogs.length,
          careers: careers.length,
        }}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen max-h-screen overflow-hidden transition-all duration-300">
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeView={activeView}
          setActiveView={setActiveView}
          onNavigateSettings={() => setActiveView('settings')}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto">
          {activeView === 'overview' && (
            <OverviewCMS
              dbStatus={dbStatus}
              heroData={heroData}
              services={services}
              whyChoose={whyChoose}
              ourWork={ourWork}
              setActiveTab={(view) => setActiveView(view === 'hero' || view === 'services' || view === 'why-choose' || view === 'our-work' ? 'cms-home' : view)}
              onSeed={handleSeedDatabase}
            />
          )}

          {activeView === 'cms-all' && (
            <AllPagesCMS
              setActiveView={setActiveView}
              counts={{
                services: services.length,
                whyChoose: whyChoose.length,
                ourWork: ourWork.length,
                clients: clients.length,
                blogs: blogs.length,
                careers: careers.length,
              }}
            />
          )}

          {activeView === 'cms-home' && (
            <HomePageCMS
              heroData={heroData}
              services={services}
              whyChoose={whyChoose}
              ourWork={ourWork}
              onSaveHero={handleSaveHero}
              onUpdateService={handleUpdateService}
              onReorderServices={handleReorderServices}
              onUpdateWhyChoose={handleUpdateWhyChoose}
              onUpdateOurWork={handleUpdateOurWork}
              onBackToPages={() => setActiveView('cms-all')}
            />
          )}

          {activeView === 'cms-services' && (
            <div className="max-w-6xl space-y-6">
              <button
                type="button"
                onClick={() => setActiveView('cms-all')}
                className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-bold hover:underline mb-2 cursor-pointer"
              >
                ← Back to All Pages Directory
              </button>
              <ServicesCMS
                services={services}
                onUpdate={handleUpdateService}
                onReorder={handleReorderServices}
                onAdd={async () => {}}
                onDelete={async () => {}}
              />
            </div>
          )}

          {activeView === 'cms-portfolio' && (
            <div className="max-w-6xl space-y-6">
              <button
                type="button"
                onClick={() => setActiveView('cms-all')}
                className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-bold hover:underline mb-2 cursor-pointer"
              >
                ← Back to All Pages Directory
              </button>
              <OurWorkCMS items={ourWork} onUpdate={handleUpdateOurWork} />
            </div>
          )}

          {activeView === 'cms-clients' && (
            <ClientsCMS
              clients={clients}
              onUpdate={handleUpdateClient}
              onAdd={handleAddClient}
              onDelete={handleDeleteClient}
              onBack={() => setActiveView('cms-all')}
              onRefresh={loadAllData}
            />
          )}

          {activeView === 'cms-about' && (
            <AboutCMS onBack={() => setActiveView('cms-all')} />
          )}

          {activeView === 'cms-contact' && (
            <ContactCMS onBack={() => setActiveView('cms-all')} />
          )}

          {activeView === 'cms-blog' && (
            <BlogCMS
              blogs={blogs}
              onUpdate={handleUpdateBlog}
              onAdd={handleAddBlog}
              onDelete={handleDeleteBlog}
              onBack={() => setActiveView('cms-all')}
            />
          )}

          {activeView === 'cms-career' && (
            <CareerCMS
              careers={careers}
              onUpdate={handleUpdateCareer}
              onAdd={handleAddCareer}
              onDelete={handleDeleteCareer}
              onBack={() => setActiveView('cms-all')}
            />
          )}

          {activeView === 'settings' && (
            <SettingsCMS
              dbStatus={dbStatus}
              onRefresh={loadAllData}
              onSeed={handleSeedDatabase}
              isSeeding={isSeeding}
            />
          )}
        </main>
      </div>
    </div>
  );
}
