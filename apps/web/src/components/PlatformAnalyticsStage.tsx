'use client';

import React, { useEffect, useState } from 'react';
import { PlatformAnalyticsPanel } from './PlatformAnalyticsPanel';
import { motion } from 'framer-motion';

export function PlatformAnalyticsStage() {
  const [channels, setChannels] = useState<{ id: string; platform: string; handle: string }[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from /api/social/accounts
    // For now we'll mock it or fetch from the Fastify backend
    const fetchChannels = async () => {
      try {
        const res = await fetch('http://localhost:3001/social/accounts', {
           headers: { 'X-Tenant-ID': 'demo-tenant' }
        });
        if (res.ok) {
           const data = await res.json();
           if (data.accounts?.length) {
              setChannels(data.accounts);
              return;
           }
        }
      } catch (e) {
        console.warn('Backend reach failed for accounts, using mock data');
      }
      
      // Fallback dummy channels if backend hasn't hooked socialAccounts up
      setChannels([
         { id: '1', platform: 'instagram', handle: 'socialvault.ig' },
         { id: '2', platform: 'youtube', handle: 'socialvault_daily' }
      ]);
    };

    fetchChannels();
  }, []);

  return (
    <div className="w-full flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
       {channels.map((ch, idx) => (
         <PlatformAnalyticsPanel key={ch.id} channel={ch} />
       ))}

       {/* Special Add Platform Panel */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }} 
         animate={{ opacity: 1, y: 0 }} 
         transition={{ duration: 0.4, delay: channels.length * 0.08 }}
         className="bg-white/5 backdrop-blur-md border border-white/10 border-dashed rounded-2xl p-5 flex flex-col min-w-[200px] shrink-0 justify-center items-center cursor-pointer hover:bg-white/10 transition group"
       >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition group-hover:border-neon-teal text-white">
             +
          </div>
          <h3 className="font-mono text-sm tracking-wider uppercase text-slate-300 group-hover:text-white transition">
            Add Platform
          </h3>
       </motion.div>
    </div>
  );
}
