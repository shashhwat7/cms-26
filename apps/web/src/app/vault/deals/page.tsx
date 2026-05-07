'use client';

import React, { useState, useMemo } from 'react';

const DUMMY_DEALS = [
  { id: 1, title: 'TechCorp Sponsorship', value: '$15k', type: 'Dedicated YT Integration', dueIn: '5d', deliverables: 3, stage: 'Negotiating' },
  { id: 2, title: 'Energy Drink Shorts', value: '$5k', type: 'Shorts Push Strategy', dueIn: '2d', deliverables: 2, stage: 'Active' },
  { id: 3, title: 'Fashion Brand Tag', value: '$8k', type: 'Storytime Vlog Intro', dueIn: '10d', deliverables: 1, stage: 'Outreach' },
  { id: 4, title: 'SaaS App Review', value: '$12k', type: 'Dedicated YT Integration', dueIn: '0d', deliverables: 1, stage: 'Delivered' }
];

export default function DealsPage() {
  const [query, setQuery] = useState('');

  const filteredDeals = useMemo(() =>
    DUMMY_DEALS.filter(d =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.type.toLowerCase().includes(query.toLowerCase()) ||
      d.stage.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  const getDealsForStage = (stage: string) => filteredDeals.filter(d => d.stage === stage);

  return (
    <div className="flex-1 w-full min-h-screen pb-24 flex flex-col">
       <header className="sticky top-0 z-50 h-14 bg-cosmic-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs border border-white/10 text-slate-300">
             Social Vault // Brand Deals CRM
           </div>
        </div>
      </header>

      <div className="px-8 mt-8 flex flex-col flex-1">
         {/* Top Stats */}
         <div className="flex justify-between items-end mb-8">
            <div>
               <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1">Active Deal Value</div>
               <div className="text-3xl font-mono text-saffron">$42,500</div>
            </div>
            <div className="flex gap-4">
               <div>
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search brand deals..."
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-neon-pink transition w-64"
                  />
               </div>
               <div className="text-right">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1">Deals This Month</div>
                  <div className="text-xl font-mono text-white">4</div>
               </div>
            </div>
         </div>

         {/* Pipeline Board */}
         <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
            {['Outreach', 'Negotiating', 'Active', 'Delivered', 'Paid'].map((stage) => (
               <div key={stage} className="w-80 shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col h-full min-h-[500px]">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-slate-300 mb-4">{stage}</h3>
                  <div className="flex flex-col gap-3">
                     {getDealsForStage(stage).map(deal => (
                        <div key={deal.id} className="bg-cosmic-900/80 border border-white/10 rounded-xl p-4 cursor-pointer hover:border-white/30 transition">
                           <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-white text-sm">{deal.title}</span>
                              <span className="text-xs font-mono text-neon-teal border border-neon-teal/30 px-2 py-0.5 rounded bg-neon-teal/10">{deal.value}</span>
                           </div>
                           <div className="text-xs text-slate-400 mb-4">{deal.type}</div>
                           <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                              <span>{deal.deliverables} Deliverables</span>
                              <span className="text-neon-pink">Due in {deal.dueIn}</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
