import React from 'react';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'underline'
}) => {
  return (
    <div className={`cm-tabs cm-tabs-${variant}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            className={`cm-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className="cm-tab-badge">{tab.badge}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
