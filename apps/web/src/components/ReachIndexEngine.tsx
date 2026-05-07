'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ReachIndexEngine({
  hookStrength = 0.8,
  trendingWeight = 1.2,
  durationPenalty = 1.05,
}: {
  hookStrength?: number;
  trendingWeight?: number;
  durationPenalty?: number;
}) {
  const [ari, setAri] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      const reach = (hookStrength * trendingWeight) / durationPenalty;
      setAri(Number(reach.toFixed(2)));
      setIsCalculating(false);
    }, 600); // simulate engine calculating

    return () => clearTimeout(timer);
  }, [hookStrength, trendingWeight, durationPenalty]);

  return (
    <motion.div
      className="p-4 border border-cosmic-border/30 min-w-[200px] bg-cosmic-900/40 rounded shadow-inner"
      animate={{
        boxShadow: isCalculating ? '0 0 15px 2px rgba(255,20,147,0.5)' : '0 0 0px 0px transparent',
        borderColor: isCalculating ? '#ff1493' : 'rgba(71,33,117,0.3)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-[10px] uppercase font-mono tracking-widest text-neon-purple/80 mb-2 drop-shadow-sm">
        Reach Index (ARI)
      </div>
      <div className="flex items-center gap-3">
        <div className="text-3xl font-mono text-white drop-shadow-[0_0_8px_rgba(206,99,255,0.6)]">{ari}</div>
        {isCalculating && (
          <span className="text-[10px] font-mono text-neon-pink animate-pulse">Calculating...</span>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-cosmic-border/30 pt-3">
        <div>
          <div className="text-[9px] text-slate-400">HOOK</div>
          <div className="text-xs font-mono text-slate-200">{hookStrength}</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-400">TREND</div>
          <div className="text-xs font-mono text-slate-200">{trendingWeight}</div>
        </div>
        <div>
          <div className="text-[9px] text-slate-400">PENALTY</div>
          <div className="text-xs font-mono text-slate-200">{durationPenalty}</div>
        </div>
      </div>
    </motion.div>
  );
}
