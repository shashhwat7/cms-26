'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="flex-1 w-full min-h-screen pb-24">
      {/* HEADER */}
      <header className="sticky top-0 z-50 h-14 bg-cosmic-900/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-4">
           <div className="px-3 py-1 bg-white/5 rounded-md font-mono text-xs border border-white/10 text-slate-300">
             Social Vault // Settings
           </div>
        </div>
      </header>

      <div className="px-8 mt-8 space-y-12 max-w-4xl">
         
         {/* SECTION: Connected Channels */}
         <section>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Connected Channels</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
               {/* Single Integration Option */}
               <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-cosmic-900 rounded-lg flex items-center justify-center border border-white/10 font-bold text-neon-pink">IG</div>
                    <div>
                      <h4 className="text-white font-semibold">Instagram</h4>
                      <p className="text-xs text-slate-400 font-mono">socialvault.ig • 12.4K Followers</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-white/10 text-white rounded-lg text-xs font-mono hover:bg-white/10 transition">Disconnect</button>
               </div>
               
               <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 border-dashed rounded-xl cursor-pointer hover:bg-white/10 transition">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-white/20 text-white border-dashed">+</div>
                    <div>
                      <h4 className="text-slate-300 font-semibold">Add Platform</h4>
                      <p className="text-xs text-slate-500 font-mono">Connect TikTok, YouTube, or Facebook</p>
                    </div>
                  </div>
               </div>
            </div>
         </section>

         {/* SECTION: Workspace */}
         <section>
            <div className="flex items-center gap-3 mb-4">
               <h2 className="font-mono text-sm uppercase tracking-widest text-slate-300">Workspace Settings</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
               <div>
                  <label className="block text-xs text-slate-400 font-mono uppercase tracking-widest mb-2">Workspace Name</label>
                  <input type="text" defaultValue="Social Vault Default" className="w-full max-w-md bg-cosmic-900/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-neon-pink" />
               </div>
               <div>
                  <label className="block text-xs text-slate-400 font-mono uppercase tracking-widest mb-2">Invite Members</label>
                  <div className="flex gap-4 max-w-md">
                     <input type="email" placeholder="colleague@agency.com" className="flex-1 bg-cosmic-900/50 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-neon-pink" />
                     <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-xs font-mono hover:bg-white/20 transition">Invite</button>
                  </div>
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}
