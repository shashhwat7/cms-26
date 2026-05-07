'use client';

import React from 'react';

interface CopyrightClaim {
  id: string;
  start: number;
  end: number;
  status: 'safe' | 'risk' | 'flagged';
}

export function CopyrightPanel({ claims }: { claims: CopyrightClaim[] }) {
  const handleAiSwap = (id: string) => {
    console.log(`Triggering AI audio swap for claim ${id}`);
  };

  return (
    <div className="bg-white border-l border-ink-100 flex flex-col h-full overflow-hidden w-[300px]">
      <div className="px-5 py-4 border-b border-ink-100 bg-ink-900 text-white flex items-center justify-between shrink-0">
        <h3 className="font-mono text-sm tracking-wide uppercase">Copyright Guardian</h3>
        <span className="text-[10px] bg-rose-600 px-2 py-0.5 font-mono">{claims.filter(c => c.status === 'flagged').length} FLAGS</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {claims.length === 0 ? (
          <div className="text-xs font-mono text-ink-300 text-center mt-10 p-4 border border-dashed border-ink-100">
            No claims detected.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {claims.map(claim => (
              <div 
                key={claim.id} 
                className={`border p-3 ${
                  claim.status === 'flagged' ? 'border-rose-600 bg-rose-600/5' : 
                  claim.status === 'risk' ? 'border-amber-600 bg-amber-600/5' : 
                  'border-leaf-600 bg-leaf-100'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-ink-600">
                    {claim.start.toFixed(1)}s - {claim.end.toFixed(1)}s
                  </div>
                  <div className={`text-[9px] uppercase font-mono px-1.5 py-0.5 text-white ${
                    claim.status === 'flagged' ? 'bg-rose-600' : 'bg-amber-600'
                  }`}>
                    {claim.status}
                  </div>
                </div>

                <button 
                  onClick={() => handleAiSwap(claim.id)}
                  className="w-full mt-2 border border-ink-900 bg-transparent hover:bg-ink-900 hover:text-white transition-colors duration-150 py-1.5 text-xs font-mono uppercase tracking-wide"
                >
                  Apply AI-Swap
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
