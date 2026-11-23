import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { RegisterUserModal } from '../ui/RegisterUserModal';
import './AppLayout.css';

export interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="cm-app-layout">
      <Sidebar />
      <div className="cm-main-content">
        <Topbar />
        <main className="cm-view-container">{children}</main>
      </div>
      <RegisterUserModal />
    </div>
  );
};
