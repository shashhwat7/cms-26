'use client';

import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';

type SocialAccount = {
  id: string;
  platform: string;
  handle: string;
  isActive: boolean;
};

type ScheduledPost = {
  id: string;
  title: string;
  scheduledAt: string;
  platforms: string[];
};

export function SocialDistributionPanel() {
  const { videoUrl } = useEditorStore();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [upcoming, setUpcoming] = useState<ScheduledPost[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    // Fetch mock/real accounts from our new API
    fetch('http://localhost:3001/social/accounts', {
       headers: { 'X-Tenant-ID': '00000000-0000-0000-0000-000000000000' } // Fallback ID for testing
    })
      .then(res => res.json())
      .then(data => setAccounts(data || []))
      .catch(console.error);
      
    // Mock upcoming posts setup for UI demonstration
    setUpcoming([
      { id: '1', title: 'Heritage Sites of Varanasi', scheduledAt: new Date(Date.now() + 86400000).toISOString(), platforms: ['instagram', 'youtube'] },
      { id: '2', title: 'Coastal Wonders: Goa in 4K', scheduledAt: new Date(Date.now() + 172800000).toISOString(), platforms: ['tiktok'] }
    ]);
  }, []);

  const handleConnect = async (platform: string) => {
    setIsConnecting(true);
    try {
      const res = await fetch('http://localhost:3001/social/accounts/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-ID': '00000000-0000-0000-0000-000000000000'
        },
        body: JSON.stringify({ platform, handle: `@tms_${platform.toLowerCase()}` })
      });
      const newAcc = await res.json();
      setAccounts(prev => [...prev, newAcc]);
    } catch (e) {
      console.error('Failed to connect', e);
    }
    setIsConnecting(false);
  };

  const handleSchedule = async () => {
    if (!videoUrl || selectedPlatforms.length === 0 || !scheduledTime) return;
    setIsScheduling(true);
    // Simulate scheduling delay
    await new Promise(r => setTimeout(r, 800));
    setUpcoming(prev => [
      { id: Date.now().toString(), title: 'Newly Scheduled Post', scheduledAt: new Date(scheduledTime).toISOString(), platforms: selectedPlatforms },
      ...prev
    ]);
    setSelectedPlatforms([]);
    setScheduledTime('');
    setIsScheduling(false);
  };

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const platformColors: Record<string, string> = {
    instagram: 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600',
    tiktok: 'bg-black',
    youtube: 'bg-red-600'
  };

  return (
    <div className="w-[360px] bg-cosmic-900/40 backdrop-blur-md border-l border-cosmic-border/30 flex flex-col shrink-0 overflow-y-auto">
      {/* Connected Accounts Section */}
      <div className="p-4 border-b border-cosmic-border/30">
        <h3 className="font-mono text-xs text-neon-purple/80 uppercase mb-4 tracking-widest drop-shadow-md">Connected Channels</h3>
        <div className="flex gap-2 mb-4">
          {['Instagram', 'TikTok', 'YouTube'].map(plat => {
             const key = plat.toLowerCase();
             const isConnected = accounts.some(a => a.platform === key);
             return (
               <button 
                 key={plat}
                 onClick={() => !isConnected && handleConnect(key)}
                 disabled={isConnected}
                 className={`flex-1 py-2 rounded text-xs font-medium text-white transition-opacity ${platformColors[key]} ${isConnected ? 'opacity-100' : 'opacity-40 hover:opacity-75'}`}
               >
                 {isConnected ? '✓ Connected' : plat}
               </button>
             );
          })}
        </div>
        <div className="space-y-2">
          {accounts.map(acc => (
            <div key={acc.id} className="flex justify-between items-center text-xs p-2 bg-cosmic-800/80 rounded border border-cosmic-border/30">
              <span className="font-mono capitalize text-slate-300">{acc.platform}</span>
              <span className="text-neon-pink font-medium drop-shadow-sm">{acc.handle}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduler Section */}
      <div className="p-4 border-b border-cosmic-border/30 flex-1">
        <h3 className="font-mono text-xs text-neon-pink uppercase mb-4 tracking-widest font-bold drop-shadow-md border-l-2 border-neon-pink pl-2">Schedule Engine</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 block mb-1">Target Platforms</label>
            <div className="flex gap-2">
              {['instagram', 'tiktok', 'youtube'].map(p => (
                <label key={p} className="flex items-center gap-1 text-xs cursor-pointer text-slate-300 hover:text-white transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedPlatforms.includes(p)} 
                    onChange={() => togglePlatform(p)}
                    className="accent-neon-pink cursor-pointer"
                  />
                  <span className="capitalize">{p}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Date & Time</label>
            <input 
              type="datetime-local" 
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full border border-cosmic-border/50 bg-cosmic-900/80 text-white rounded px-3 py-2 text-xs outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink shadow-inner"
            />
          </div>

          <button 
             onClick={handleSchedule}
             disabled={isScheduling || !videoUrl || selectedPlatforms.length === 0 || !scheduledTime}
             className="w-full bg-neon-pink text-white py-3 rounded text-xs font-mono font-bold hover:bg-opacity-90 disabled:opacity-30 disabled:hover:shadow-none transition-all shadow-[0_0_15px_rgba(255,20,147,0.4)] hover:shadow-[0_0_25px_rgba(255,20,147,0.8)] mt-4"
          >
             {isScheduling ? 'SCHEDULING...' : 'LOCK IN SCHEDULE'}
          </button>
        </div>
      </div>

      {/* Upcoming Posts Section */}
      <div className="p-4 bg-cosmic-800/50 flex-col flex-1 border-t-[3px] border-neon-purple shadow-[inset_0_10px_20px_rgba(0,0,0,0.2)]">
        <h3 className="font-mono text-xs text-neon-purple/80 uppercase mb-4 tracking-widest drop-shadow-md">Upcoming Rollouts</h3>
        <div className="space-y-3">
          {upcoming.map(post => (
             <div key={post.id} className="bg-cosmic-900/60 p-3 border border-cosmic-border/30 shadow-md rounded hover:border-neon-pink/50 transition-colors">
                <div className="text-xs font-semibold text-white mb-1 truncate" title={post.title}>{post.title}</div>
                <div className="flex justify-between items-end">
                   <div className="text-[10px] text-slate-400 font-mono">
                     {new Date(post.scheduledAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                   </div>
                   <div className="flex gap-1">
                     {post.platforms.map(p => (
                        <div key={p} className={`w-3 h-3 rounded-full ${platformColors[p]}`} title={p} />
                     ))}
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
