'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlatformAnalyticsStage } from '../../components/PlatformAnalyticsStage';
import { ReachIndexEngine } from '../../components/ReachIndexEngine';

const variant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function VaultDashboard() {
  return (
    <div className="flex-1 w-full min-h-screen pb-24">
      
      {/* SECTION 1: HEADER (Sticky) */}
      <header className="sticky top-0 z-50 h-14 bg-cosmic-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
           {/* Workspace switcher mock */}
           <div className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs border border-white/10 text-slate-300">
             Social Vault // Overview
           </div>
        </div>
        <button className="px-4 py-1.5 rounded-full bg-neon-pink text-white text-xs font-bold shadow-[0_0_15px_rgba(255,20,147,0.5)] hover:shadow-[0_0_25px_rgba(255,20,147,0.8)] transition-all flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
           BROADCAST NOW
        </button>
      </header>

      {/* SECTION 2: COMMAND STRIP (Sticky below header) */}
      <div className="sticky top-14 z-40 h-14 bg-cosmic-800/80 backdrop-blur-md border-b border-white/5 flex items-center px-8 gap-6 shrink-0 shadow-xl">
        <div className="flex gap-2 items-baseline">
           <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Total Reach</span>
           <span className="text-sm font-mono text-white text-shadow-glow">104.5K</span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex gap-2 items-baseline">
           <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Followers</span>
           <span className="text-sm font-mono text-white">150.2K</span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex gap-2 items-baseline">
           <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Posts / Mo</span>
           <span className="text-sm font-mono text-white text-shadow-glow">42</span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex gap-2 items-baseline">
           <span className="text-[10px] uppercase font-bold text-neon-purple font-mono">Scheduled</span>
           <span className="text-sm font-mono text-neon-purple drop-shadow-md">6</span>
        </div>
      </div>

      <div className="px-8 mt-8 space-y-12">
      
         {/* SECTION 3: REAL-TIME ANALYTICS */}
         <motion.section {...variant}>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Live Telemetry</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            
            <PlatformAnalyticsStage />
         </motion.section>

         {/* SECTION 4: CONTENT PIPELINE (Kanban placeholder, @dnd-kit integration pending Step 7/details) */}
         <motion.section {...variant} transition={{ duration: 0.4, delay: 0.08 }}>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Operations Pipeline</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
               <button className="text-[10px] font-mono tracking-widest uppercase bg-white/5 px-3 py-1 rounded border border-white/10 text-white hover:bg-white/10">+ New Post</button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl h-80 flex items-center justify-center p-6">
               <p className="text-slate-500 font-mono text-sm border border-dashed border-white/10 p-12 rounded-xl text-center">
                  Drag and drop Kanban Pipeline loading...<br/>
                  <span className="text-xs text-cosmic-border mt-2 inline-block">@dnd-kit will be initialized here</span>
               </p>
            </div>
         </motion.section>

         {/* SECTION 5: GHOST-WRITER & ARI */}
         <motion.section {...variant} transition={{ duration: 0.4, delay: 0.16 }}>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">AI Intelligence Studio</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>

            <div className="grid grid-cols-[1fr_350px] gap-6">
               {/* Ghost Writer Left */}
               <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-96 flex flex-col">
                  {/* Tabs */}
                  <div className="flex gap-4 border-b border-white/10 pb-3 mb-4">
                     <button className="text-neon-pink font-mono text-xs uppercase tracking-widest drop-shadow-sm border-b-2 border-neon-pink pb-3 -mb-[14px]">Ghost-Writer</button>
                     <button className="text-slate-500 hover:text-slate-300 font-mono text-xs uppercase tracking-widest transition pb-3 -mb-[14px]">Signals</button>
                  </div>
                  <textarea 
                     className="w-full flex-1 resize-none bg-transparent outline-none font-serif text-2xl leading-relaxed text-slate-200 placeholder:text-white/20"
                     placeholder="Draft the perfect 3-second hook..."
                  />
               </div>
               
               {/* ARI Score Right */}
               <div className="h-full">
                  <ReachIndexEngine hookStrength={0.92} trendingWeight={1.41} durationPenalty={1.1} />
               </div>
            </div>
         </motion.section>

         {/* SECTION 6: UPCOMING ROLLOUTS */}
         <motion.section {...variant} transition={{ duration: 0.4, delay: 0.24 }}>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Campaign Rollouts</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-h-32">
               <div className="flex gap-4">
                  <div className="w-1 bg-neon-purple rounded-full"></div>
                  <div>
                    <div className="text-xs font-mono text-slate-400 mb-1">THURSDAY, 14:00</div>
                    <div className="font-semibold text-white">Algorithm Crash Course Hook</div>
                    <div className="text-xs text-neon-purple mt-2 flex gap-2"><span className="bg-neon-purple/20 px-2 py-0.5 rounded">TikTok</span></div>
                  </div>
               </div>
            </div>
         </motion.section>

         {/* SECTION 7: RIGHTS & COPYRIGHT */}
         <motion.section {...variant} transition={{ duration: 0.4, delay: 0.32 }}>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Copyright Integrity</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
               <button className="text-[10px] font-mono tracking-widest uppercase bg-white/5 px-3 py-1 rounded border border-white/10 text-white hover:bg-white/10">DistroKid Vault</button>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 border-dashed rounded-2xl h-24 flex items-center justify-center">
               <span className="text-slate-500 font-mono text-xs text-center">Copyright validation engine inactive.<br/>Awaiting scan triggers.</span>
            </div>
         </motion.section>

      </div>
      
      {/* SECTION 8: FOOTER */}
      <footer className="mt-16 border-t border-white/5 bg-cosmic-900/60 py-4 px-8 flex justify-between items-center text-[10px] font-mono tracking-wider text-slate-500 uppercase">
         <div className="flex items-center gap-4">
           <span>Storage: 42GB / 100GB (R2)</span>
           <span>•</span>
           <span>API Queries: 4,001 / 10,000</span>
         </div>
         <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-slate-600"></div>
           DistroKid Disconnected
         </div>
      </footer>

    </div>
  );
}
