'use client';

import React, { useState, useMemo } from 'react';

const DUMMY_TOP_CONTENT = [
  { id: 1, title: 'My 10am Morning Routine', platform: 'YouTube', views: 85200, retention: '64%' },
  { id: 2, title: 'Office Setup Tour 2026', platform: 'TikTok', views: 124000, retention: '45%' },
  { id: 3, title: 'Q&A 100k Subs Special', platform: 'YouTube', views: 98000, retention: '72%' }
];

export default function AnalyticsPage() {
  const [query, setQuery] = useState('');

  const filteredContent = useMemo(() =>
    DUMMY_TOP_CONTENT.filter(c =>
       c.title.toLowerCase().includes(query.toLowerCase()) ||
       c.platform.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );
  
  return (
    <div className="flex-1 w-full min-h-screen pb-24">
      {/* HEADER */}
      <header className="sticky top-0 z-50 h-14 bg-cosmic-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs border border-white/10 text-slate-300">
             Social Vault // Analytics
           </div>
        </div>
      </header>

      <div className="px-8 mt-8 space-y-12">
         {/* SECTION A: Date Range & Filters */}
         <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl backdrop-blur-md border border-white/10 sticky top-[72px] z-40">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-lg bg-white/10 text-white text-xs font-mono font-bold">7d</button>
              <button className="px-4 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-xs font-mono transition">30d</button>
              <button className="px-4 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-xs font-mono transition">90d</button>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-lg bg-neon-pink/20 text-neon-pink border border-neon-pink/30 text-xs font-mono font-bold">All</button>
              <button className="px-4 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-xs font-mono transition">Instagram</button>
              <button className="px-4 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-xs font-mono transition">YouTube</button>
              <button className="px-4 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 text-xs font-mono transition">TikTok</button>
            </div>
         </div>

         {/* SECTION B: Summary Stat Cards */}
         <div className="grid grid-cols-4 gap-6">
            {['Total Reach', 'Avg Engagement', 'Total Views', 'Follower Growth'].map((title, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                 <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">{title}</div>
                 <div className="text-2xl font-mono text-white mb-2">
                   {i === 1 ? '4.2%' : i === 0 ? '1.2M' : i === 2 ? '890K' : '+12.4K'}
                 </div>
                 <div className="text-xs text-neon-teal font-mono">↗ 12% vs last period</div>
              </div>
            ))}
         </div>

         {/* SECTION C: Chart Placeholder */}
         <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-80 flex flex-col items-center justify-center">
            <span className="text-slate-500 font-mono text-sm border border-dashed border-white/10 p-12 rounded-xl text-center">
               Recharts LineChart overlay (Performance)
            </span>
         </div>

         {/* SECTION D: Top Content */}
         <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Top Content</h2>
               <input
                 type="text"
                 value={query}
                 onChange={e => setQuery(e.target.value)}
                 placeholder="Search content..."
                 className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-neon-pink transition w-64"
               />
            </div>
            
            <div className="space-y-4">
               {filteredContent.map(content => (
                  <div key={content.id} className="flex justify-between items-center p-4 bg-cosmic-900/50 border border-white/5 rounded-xl hover:bg-white/10 transition">
                     <div>
                        <div className="text-white font-semibold mb-1">{content.title}</div>
                        <div className="text-xs text-slate-400 font-mono">{content.platform}</div>
                     </div>
                     <div className="flex gap-8 text-right">
                        <div>
                           <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">Views</div>
                           <div className="text-sm font-mono text-white">{content.views.toLocaleString()}</div>
                        </div>
                        <div>
                           <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">Retention</div>
                           <div className="text-sm font-mono text-neon-teal">{content.retention}</div>
                        </div>
                     </div>
                  </div>
               ))}
               {filteredContent.length === 0 && (
                  <div className="text-center py-8 text-slate-500 font-mono text-sm">No content found matching "{query}"</div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
