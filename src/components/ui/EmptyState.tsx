import React from 'react';
import { Film } from 'lucide-react';
import { Button } from './Button';
import './EmptyState.css';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction
}) => {
  return (
    <div className="cm-empty-state">
      <div className="cm-empty-state-icon">
        {icon || <Film size={36} color="var(--brand-secondary)" />}
      </div>
      <h3 className="cm-empty-state-title">{title}</h3>
      <p className="cm-empty-state-desc">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
