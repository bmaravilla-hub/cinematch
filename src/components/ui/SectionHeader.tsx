import React from 'react';
import './SectionHeader.css';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onAction?: () => void;
  accentTitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onAction,
  accentTitle
}) => {
  return (
    <div className="cm-section-header">
      <div className="cm-section-header-content">
        <h2 className="cm-section-title">
          {title} {accentTitle && <span className="cm-section-title-accent">{accentTitle}</span>}
        </h2>
        {subtitle && <p className="cm-section-subtitle">{subtitle}</p>}
      </div>
      {actionText && onAction && (
        <button type="button" className="cm-section-action" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};
