'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function VaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/vault', label: 'Dashboard', icon: '⎈' },
    { href: '/vault/analytics', label: 'Analytics', icon: '📊' },
    { href: '/vault/content', label: 'Content', icon: '🎬' },
    { href: '/vault/rights', label: 'Rights', icon: '©️' },
    { href: '/vault/deals', label: 'Deals', icon: '🤝' },
    { href: '/vault/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#0D0A1A,_#16102A_80%,_#0D0A1A_100%)] font-sans flex text-slate-200">
      
      {/* Left Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-white/5 backdrop-blur-xl flex flex-col pt-6 shrink-0 z-50">
         <div className="px-6 mb-12">
            <div className="font-serif font-black text-2xl tracking-tighter uppercase text-white border-l-4 border-neon-pink pl-3 leading-none drop-shadow-md">
               Social<br/>Vault
            </div>
         </div>

         <nav className="flex-1 px-4 space-y-2">
            {links.map(link => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition ${active ? 'bg-white/10 text-white shadow-inner font-semibold border border-white/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                  <span>{link.icon}</span>
                  <span className="font-mono text-sm uppercase tracking-wider">{link.label}</span>
                </Link>
              );
            })}
         </nav>
         
         <div className="p-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple shadow-sm"></div>
              <div className="text-xs font-mono font-bold">Workspace 1</div>
            </div>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
         {children}
      </main>
    </div>
  );
}
