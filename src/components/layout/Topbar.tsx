import React from 'react';
import { Bell } from 'lucide-react';
import { useCineMatch } from '../../hooks/useCineMatch';
import { SearchInput } from '../ui/SearchInput';
import './Topbar.css';

export const Topbar: React.FC = () => {
  const { user, filters, setCatalogFilters, navigate, activeView } = useCineMatch();

  const handleSearchChange = (query: string) => {
    setCatalogFilters({ query });
    if (activeView !== 'catalog') {
      navigate('catalog');
    }
  };

  return (
    <header className="cm-topbar">
      <div className="cm-topbar-search">
        <SearchInput
          value={filters.query}
          onChange={handleSearchChange}
          placeholder="Buscar películas, directores, actores..."
        />
      </div>

      <div className="cm-topbar-actions">
        <button
          type="button"
          className="cm-topbar-btn"
          aria-label="Notificaciones"
          title="Notificaciones"
        >
          <Bell size={20} />
          <span className="cm-topbar-badge" />
        </button>

        <div
          className="cm-topbar-profile"
          onClick={() => navigate('profile')}
          role="button"
          tabIndex={0}
        >
          <img src={user.avatarUrl} alt={user.name} className="cm-topbar-avatar" />
          <span className="cm-topbar-username">{user.name}</span>
        </div>
      </div>
    </header>
  );
};
