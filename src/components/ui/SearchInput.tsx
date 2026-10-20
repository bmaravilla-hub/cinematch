import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchInput.css';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showShortcut?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Buscar películas, géneros...',
  showShortcut = true
}) => {
  return (
    <div className="cm-search-input-wrap">
      <Search size={18} className="cm-search-icon" />
      <input
        type="text"
        className="cm-search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value ? (
        <button
          type="button"
          className="cm-search-clear"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
        >
          <X size={14} />
        </button>
      ) : showShortcut ? (
        <span className="cm-search-shortcut">Ctrl K</span>
      ) : null}
    </div>
  );
};
