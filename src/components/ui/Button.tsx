import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  return (
    <button className={`cm-btn cm-btn-${variant} cm-btn-${size} ${className}`} {...props}>
      {icon && <span className="cm-btn-icon">{icon}</span>}
      {children && <span>{children}</span>}
    </button>
  );
};
