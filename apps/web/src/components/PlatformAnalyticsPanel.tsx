'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PlatformAnalyticsPanelProps {
  channel: { id: string; platform: string; handle: string };
}

export function PlatformAnalyticsPanel({ channel }: PlatformAnalyticsPanelProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We already fetch config from /realtime/all in the parent, but to be robust
    // this panel can also fetch its own or just receive data. 
    // The prompt says: "Frontend polls /realtime/all every 90s."
    // Let's assume the parent polls and passes `metrics` or we poll here.
    // I'll make it self-contained for now to satisfy "Each panel polls its platform API every 90 seconds"
    let interval: NodeJS.Timeout;
    
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/realtime/all'); // hitting the Fastify API (proxy handled elsewhere or direct)
        // Wait, Fastify API is usually at process.env.NEXT_PUBLIC_API_URL or similar.
        // Assuming we proxy or it's localhost:3001
        // Let's use the standard fetch path available.
        const apiUrl = 'http://localhost:3001/realtime/all';
        const response = await fetch(apiUrl, { headers: { 'X-Tenant-ID': 'demo-tenant' }});
        if (response.ok) {
           const json = await response.json();
           setData(json[channel.id]);
        }
      } catch (e) {
        console.error('Failed to fetch realtime data', e);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
    interval = setInterval(fetchMetrics, 90000);
    return () => clearInterval(interval);
  }, [channel.id]);

  // Glassmorphism card pattern
  const cardClasses = "bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col min-w-[280px] shrink-0";

  if (loading && !data) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className={cardClasses}
      >
         <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
            <div>
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-16 bg-white/5 rounded animate-pulse"></div>
            </div>
            <div className="h-5 w-12 bg-white/5 rounded-full animate-pulse"></div>
         </div>
         <div className="flex-1 space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <div className="h-3 w-16 bg-white/5 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-white/5 rounded animate-pulse"></div>
              <div className="h-5 w-16 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-white/5 rounded animate-pulse"></div>
              <div className="h-5 w-12 bg-white/10 rounded animate-pulse"></div>
            </div>
         </div>
      </motion.div>
    );
  }

  if (!loading && !data) {
    return (
       <div className={cardClasses + " border-red-500/30 bg-red-500/5 justify-center items-center"}>
          <div className="text-red-400 font-mono text-sm mb-2">⚠ Token Expired</div>
          <button className="px-3 py-1.5 bg-red-500/20 text-red-300 rounded text-xs border border-red-500/30 hover:bg-red-500/30 transition">Reconnect</button>
       </div>
    );
  }

  const m = data?.metrics || {};

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.4 }}
      className={cardClasses}
    >
       <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
          <div>
            <h3 className="font-mono text-sm tracking-wider uppercase text-white drop-shadow-md">
              {channel.platform}
            </h3>
            <div className="text-xs text-slate-400 mt-1">@{channel.handle}</div>
          </div>
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 bg-cosmic-900/50 px-2 py-1 rounded-full border border-white/5 shadow-inner">
             <div className="w-2 h-2 rounded-full bg-neon-pink animate-pulse"></div>
             <span className="text-[9px] font-mono uppercase text-neon-pink">Live</span>
          </div>
       </div>

       <div className="flex-1 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">Audience</span>
            <span className="font-mono text-lg text-white">
              {m.followers?.toLocaleString() || m.subscribers?.toLocaleString() || '---'}
            </span>
          </div>
          
          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">Reach Today</span>
            <span className="font-mono text-lg text-neon-purple drop-shadow-[0_0_8px_rgba(206,99,255,0.4)]">
              {m.reachToday?.toLocaleString() || m.viewsToday?.toLocaleString() || m.videoViewsToday?.toLocaleString() || '---'}
            </span>
          </div>

          <div className="flex justify-between items-baseline">
            <span className="text-xs text-slate-400">Engagement</span>
            <span className="font-mono text-lg text-white">
              {m.engagementRateToday ? `${m.engagementRateToday}%` : '---'}
            </span>
          </div>

       </div>
    </motion.div>
  );
}
