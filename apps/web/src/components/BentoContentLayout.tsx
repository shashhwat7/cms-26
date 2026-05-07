'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useEditorStore } from '../store/editorStore';
import { SocialDistributionPanel } from './SocialDistributionPanel';
import { ReachIndexEngine } from './ReachIndexEngine';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function BentoContentLayout() {
  const { videoUrl, isPlaying, setPlaybackState } = useEditorStore();
  const [played, setPlayed] = useState(0);


  
  return (
    <div className="flex h-[calc(100vh-52px)] bg-transparent overflow-hidden text-slate-200 border-t border-cosmic-border/30 relative">
      
      {/* LEFT / MAIN PANE - Triple Preview */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-cosmic-border/30 bg-cosmic-900/40 backdrop-blur-sm">
        <div className="p-4 border-b border-cosmic-border/30 flex items-center justify-between shrink-0">
          <h2 className="font-serif text-xl text-white drop-shadow-md">The Social Vault</h2>
          <div className="flex gap-2">
             <button 
                onClick={() => setPlaybackState({ isPlaying: !isPlaying })}
                className="px-4 py-1.5 bg-leaf-600 text-white font-mono text-xs hover:bg-leaf-700 transition"
             >
                {isPlaying ? 'PAUSE' : 'PLAY TRIPLE-SYNC'}
             </button>
          </div>
        </div>

        {/* Triple Sync Grid */}
        <div className="flex-1 grid grid-cols-3 gap-[1px] bg-cosmic-border/30 overflow-hidden">
          {/* 9:16 Vertical (Master Audio) */}
          <div className="bg-cosmic-800 flex flex-col relative outline outline-1 outline-cosmic-border/50">
             <div className="absolute top-2 left-2 z-10 bg-black/80 text-neon-pink text-[10px] font-mono font-bold px-2 py-0.5 border border-neon-pink/30 rounded-sm">9:16 VERTICAL</div>
             <div className="flex-1 flex items-center justify-center p-4">
                {videoUrl ? (
                  <div className="aspect-[9/16] w-full max-h-full bg-black relative">
                    {/* @ts-ignore typed loosely based on react-player config */}
                    <ReactPlayer url={videoUrl} playing={isPlaying} width="100%" height="100%" />
                  </div>
                ) : (
                  <div className="text-cosmic-border font-mono text-xs">No media source</div>
                )}
             </div>
          </div>
          
          {/* 1:1 Square */}
          <div className="bg-cosmic-800 flex flex-col relative outline outline-1 outline-cosmic-border/50">
             <div className="absolute top-2 left-2 z-10 bg-black/80 text-neon-purple text-[10px] font-mono font-bold px-2 py-0.5 border border-neon-purple/30 rounded-sm">1:1 SQUARE</div>
             <div className="flex-1 flex items-center justify-center p-4">
                {videoUrl ? (
                  <div className="aspect-square w-full max-h-full bg-black relative">
                    {/* @ts-ignore typed loosely based on react-player config */}
                    <ReactPlayer url={videoUrl} playing={isPlaying} muted width="100%" height="100%" />
                  </div>
                ) : (
                  <div className="text-cosmic-border font-mono text-xs">No media source</div>
                )}
             </div>
          </div>

          {/* 16:9 Widescreen */}
          <div className="bg-cosmic-800 flex flex-col relative outline outline-1 outline-cosmic-border/50">
             <div className="absolute top-2 left-2 z-10 bg-black/80 text-saffron text-[10px] font-mono font-bold px-2 py-0.5 border border-saffron/30 rounded-sm">16:9 WIDESCREEN</div>
             <div className="flex-1 flex items-center justify-center p-4">
                {videoUrl ? (
                  <div className="aspect-video w-full max-h-full bg-black relative">
                    {/* @ts-ignore typed loosely based on react-player config */}
                    <ReactPlayer url={videoUrl} playing={isPlaying} muted width="100%" height="100%" />
                  </div>
                ) : (
                  <div className="text-cosmic-border font-mono text-xs">No media source</div>
                )}
             </div>
          </div>
        </div>

        {/* BOTTOM PANE - Script/Hook Tiptap Editor & ARI */}
        <div className="h-64 border-t border-cosmic-border/50 bg-cosmic-900/60 grid grid-cols-[1fr_300px] shrink-0">
           <div className="p-5 overflow-y-auto">
              <h3 className="font-mono text-xs text-neon-purple/80 uppercase mb-3 drop-shadow-md">AI Engagement Ghost-Writer</h3>
              <textarea 
                className="w-full h-full resize-none bg-transparent outline-none font-serif text-lg leading-relaxed text-slate-300 placeholder:text-cosmic-border"
                placeholder="Drafting the perfect 3-second hook..."
              />
           </div>
           <div className="border-l border-cosmic-border/30 p-4 bg-cosmic-800/30">
             <ReachIndexEngine hookStrength={0.92} trendingWeight={1.41} durationPenalty={1.1} />
           </div>
        </div>
      </div>

      {/* RIGHT PANE - Social Distribution (The Wire Style) */}
      <SocialDistributionPanel />
    </div>
  );
}
