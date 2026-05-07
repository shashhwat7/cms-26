'use client';

import React, { useState, useMemo } from 'react';

const DUMMY_POSTS = [
  { id: 1, title: 'Algorithmic Push Hook 1', status: 'Scheduled', hookScore: 0.94 },
  { id: 2, title: 'Viral Trend Target Option', status: 'Scheduled', hookScore: 0.88 },
  { id: 3, title: 'Algorithmic Test Beta', status: 'Published', hookScore: 0.91 },
  { id: 4, title: 'Product Launch Hook', status: 'Draft', hookScore: 0.70 },
  { id: 5, title: 'Storytime Vlog Intro', status: 'Scheduled', hookScore: 0.85 },
  { id: 6, title: 'Shorts Push Strategy', status: 'Published', hookScore: 0.99 },
];

export default function ContentPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() =>
    DUMMY_POSTS.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.status.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  return (
    <div className="flex-1 w-full min-h-screen pb-24">
      {/* HEADER */}
      <header className="sticky top-0 z-50 h-14 bg-cosmic-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs border border-white/10 text-slate-300">
             Social Vault // Content Library
           </div>
        </div>
      </header>

      <div className="px-8 mt-8 space-y-6">
         {/* Top Bar: Search & Filters */}
         <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl backdrop-blur-md border border-white/10">
            <div className="flex gap-4 items-center w-1/2">
              <input 
                 type="text" 
                 value={query} 
                 onChange={e => setQuery(e.target.value)} 
                 placeholder="Search by title, tag, or status..." 
                 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-neon-pink transition" 
              />
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-mono">Filters</button>
              <button className="px-4 py-2 rounded-lg bg-neon-pink text-white text-xs font-mono font-bold shadow-[0_0_10px_rgba(255,20,147,0.4)] hover:shadow-[0_0_20px_rgba(255,20,147,0.6)] transition">Upload Asset</button>
            </div>
         </div>

         {/* Content Grid */}
         <div className="grid grid-cols-4 gap-6">
            {filtered.map((post) => (
              <div key={post.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition cursor-pointer">
                 <div className="aspect-[9/16] bg-black relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-3 right-3 bg-neon-purple/90 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded shadow-md border border-neon-purple/50">
                       {post.status}
                    </div>
                    {/* Copyright Status Chip (Feature 1 Spec) */}
                    <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] uppercase font-mono px-2 py-0.5 rounded flex items-center gap-1">
                       <span className="w-1.5 h-1.5 rounded-full bg-neon-teal"></span> Clean
                    </div>
                 </div>
                 <div className="p-4">
                    <h3 className="text-sm font-semibold text-white mb-1 truncate">{post.title}</h3>
                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                      <span>Thu, 14:00</span>
                      <span className="text-neon-pink">ARI: {post.hookScore}</span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
