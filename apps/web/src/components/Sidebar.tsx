'use client';

import React from 'react';

const SITES = [
  { id: '1', name: 'The Design Brief', posts: 12, color: '#2E7D52', active: true },
  { id: '2', name: 'Tech Marginalia', posts: 8, color: '#0C4A6E', active: false },
  { id: '3', name: 'Slow Food Dispatch', posts: 4, color: '#9F1239', active: false },
];

export function Sidebar() {
  const handleAddSite = async () => {
    // Scaffold UI/UX Server action trigger mock
    console.log("Adding new tenant schema in background...");
  };

  return (
    <aside className="bg-white border-r border-ink-100 py-5 sticky top-[52px] h-[calc(100vh-52px)] overflow-y-auto w-[220px]">
      <div className="mb-7">
        <div className="text-[10px] font-semibold tracking-widest text-ink-300 uppercase px-[18px] mb-[6px]">
          Content
        </div>
        <div className="flex items-center gap-2.5 px-[18px] py-2 text-[13px] text-ink-600 cursor-pointer border-l-2 border-transparent transition-all hover:bg-ink-100 hover:text-ink-900 active text-leaf-600 border-l-leaf-600 bg-leaf-100 font-semibold">
          <span className="text-[14px] opacity-70">◈</span> All Videos
          <span className="ml-auto text-[11px] font-mono bg-leaf-600/10 text-leaf-600 px-[7px] py-[1px] rounded-full">24</span>
        </div>
        <div className="flex items-center gap-2.5 px-[18px] py-2 text-[13px] text-ink-600 cursor-pointer border-l-2 border-transparent transition-all hover:bg-ink-100 hover:text-ink-900">
          <span className="text-[14px] opacity-70">✦</span> Editor
        </div>
        <div className="flex items-center gap-2.5 px-[18px] py-2 text-[13px] text-ink-600 cursor-pointer border-l-2 border-transparent transition-all hover:bg-ink-100 hover:text-ink-900">
          <span className="text-[14px] opacity-70">⊡</span> Media Library
          <span className="ml-auto text-[11px] font-mono bg-ink-100 text-ink-600 px-[7px] py-[1px] rounded-full">147</span>
        </div>
        <div className="flex items-center gap-2.5 px-[18px] py-2 text-[13px] text-ink-600 cursor-pointer border-l-2 border-transparent transition-all hover:bg-ink-100 hover:text-ink-900">
          <span className="text-[14px] opacity-70">◷</span> Scheduled
          <span className="ml-auto text-[11px] font-mono bg-ink-100 text-ink-600 px-[7px] py-[1px] rounded-full">3</span>
        </div>
      </div>

      <div className="mb-7">
        <div className="text-[10px] font-semibold tracking-widest text-ink-300 uppercase px-[18px] mb-[6px]">
          My Brands
        </div>
        <div className="px-3 py-1">
          {SITES.map((site) => (
            <div
              key={site.id}
              className={`flex items-center gap-2 px-2 py-[7px] rounded cursor-pointer mb-[2px] transition-colors ${
                site.active ? 'bg-leaf-100' : 'hover:bg-ink-100'
              }`}
            >
              <div
                className="w-[7px] h-[7px] rounded-full shrink-0"
                style={{ backgroundColor: site.color === '#2E7D52' ? '#16A34A' : site.color === '#0C4A6E' ? '#3B82F6' : '#E11D48' }}
              />
              <span
                className={`text-[12px] flex-1 ${
                  site.active ? 'text-leaf-600 font-semibold' : 'text-ink-600'
                }`}
              >
                {site.name}
              </span>
              <span className="text-[10px] font-mono text-ink-300">{site.posts}</span>
            </div>
          ))}
          <div
            onClick={handleAddSite}
            className="flex items-center gap-2 px-2 py-[7px] rounded cursor-pointer mb-[2px] transition-colors hover:bg-ink-100"
          >
            <div className="w-[7px] h-[7px] rounded-full shrink-0 bg-ink-300" />
            <span className="text-[12px] flex-1 text-ink-600">+ Add Brand</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
