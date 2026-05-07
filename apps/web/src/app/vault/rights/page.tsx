'use client';

import React from 'react';

export default function RightsPage() {
  return (
    <div className="flex-1 w-full min-h-screen pb-24">
       <header className="sticky top-0 z-50 h-14 bg-cosmic-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs border border-white/10 text-slate-300">
             Social Vault // Rights & Copyright
           </div>
        </div>
      </header>
      
      <div className="px-8 mt-8 grid grid-cols-[1fr_400px] gap-8">
         {/* Left Panel: Copyright Scan Log */}
         <section>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Copyright Scan Log</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-h-[500px]">
               <div className="flex flex-col gap-4">
                  <div className="p-4 border border-white/5 bg-cosmic-900/30 rounded-xl flex justify-between items-center">
                     <div>
                        <div className="text-white font-semibold mb-1">New Hook Draft Video</div>
                        <div className="text-xs text-slate-400 font-mono">Scanned: 2 min ago</div>
                     </div>
                     <div className="flex items-center gap-2 px-3 py-1 bg-neon-teal/20 text-neon-teal border border-neon-teal/30 rounded-full text-[10px] font-mono uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-teal"></span> Clean
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Right Panel: DistroKid Vault */}
         <section>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">DistroKid Vault</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
               <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-white/10 mx-auto mb-4 border border-white/20 flex items-center justify-center">🎵</div>
                  <h3 className="text-white font-semibold mb-2">Connect DistroKid</h3>
                  <p className="text-xs text-slate-400 mb-6">Link your DistroKid account to automatically clear copyright claims on your distributed audio tracks.</p>
                  <button className="px-6 py-2 bg-white text-black font-semibold text-sm rounded-lg hover:bg-slate-200 transition">Connect Account</button>
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}
