import React from 'react';
import { House, Film, Compass, Bookmark, UserRound } from 'lucide-react';
import type { ActiveView } from '../../types';
import { useCineMatch } from '../../hooks/useCineMatch';
import './Sidebar.css';

interface NavItem {
  id: ActiveView;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { activeView, navigate } = useCineMatch();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: <House size={20} /> },
    { id: 'catalog', label: 'Catálogo', icon: <Film size={20} /> },
    { id: 'recommendations', label: 'Recomendaciones', icon: <Compass size={20} /> },
    { id: 'my-list', label: 'Mi lista', icon: <Bookmark size={20} /> },
    { id: 'profile', label: 'Mi perfil', icon: <UserRound size={20} /> }
  ];

  return (
    <aside className="cm-sidebar">
      <div className="cm-sidebar-brand" onClick={() => navigate('home')} role="button" tabIndex={0}>
        <img src="/CineMatch.png" alt="CineMatch Logo" className="cm-sidebar-logo" />
      </div>

      <nav className="cm-sidebar-nav">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`cm-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <span className="cm-nav-icon">{item.icon}</span>
              <span className="cm-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
