"use client";

import { useState } from "react";

interface DetailTabsProps {
  locale: string;
  children: {
    overview: React.ReactNode;
    files: React.ReactNode;
    quickstart: React.ReactNode;
  };
}

const tabs = [
  { id: 'overview', label: 'Overview', labelZh: '概览' },
  { id: 'files', label: 'Files', labelZh: '文件' },
  { id: 'quickstart', label: 'Quick Start', labelZh: '快速开始' },
] as const;

type TabId = typeof tabs[number]['id'];

export function DetailTabs({ locale, children }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const isZh = locale === 'zh';

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              {isZh ? tab.labelZh : tab.label}
              {activeTab === tab.id && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white" 
                  style={{ borderRadius: '2px 2px 0 0' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
            {children.overview}
          </div>
        )}
        {activeTab === 'files' && (
          <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
            {children.files}
          </div>
        )}
        {activeTab === 'quickstart' && (
          <div className="animate-in fade-in duration-300 slide-in-from-bottom-2">
            {children.quickstart}
          </div>
        )}
      </div>
    </div>
  );
}
