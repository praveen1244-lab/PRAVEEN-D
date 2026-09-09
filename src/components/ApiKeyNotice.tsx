import React, { useState } from 'react';
import { Info, X, ExternalLink, Sparkles } from 'lucide-react';

interface ApiKeyNoticeProps {
  hasKey: boolean;
}

export const ApiKeyNotice: React.FC<ApiKeyNoticeProps> = ({ hasKey }) => {
  const [dismissed, setDismissed] = useState(false);

  if (hasKey || dismissed) return null;

  return (
    <div className="absolute top-20 right-4 z-40 max-w-sm pointer-events-auto select-none">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-100 p-3.5 text-xs text-gray-700 animate-in fade-in slide-in-from-top-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 text-blue-600 font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Google Maps Live Integration</span>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-gray-600 text-[11px] leading-relaxed mt-1">
          Currently running in interactive preview mode. To unlock native Google Maps JavaScript API rendering and Cloud styling, configure <code className="bg-gray-100 px-1 py-0.5 rounded text-blue-700 font-mono text-[10px]">VITE_GOOGLE_MAPS_API_KEY</code> in project secrets.
        </p>

        <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-100 text-[11px]">
          <a
            href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            <span>Get free Demo Key</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </a>
          <span className="text-gray-400">Zero Cloud setup</span>
        </div>
      </div>
    </div>
  );
};
