import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Genre } from '../types';

interface FilterBarProps {
  genres: Genre[];
  selectedGenre: number | null;
  selectedYear: number | null;
  onGenreChange: (genreId: number | null) => void;
  onYearChange: (year: number | null) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  genres,
  selectedGenre,
  selectedYear,
  onGenreChange,
  onYearChange,
  onClearFilters,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const hasActiveFilters = selectedGenre !== null || selectedYear !== null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          hasActiveFilters
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Filter size={16} />
        {t('filterBy')}
        {hasActiveFilters && (
          <span className="ml-1 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
            {(selectedGenre ? 1 : 0) + (selectedYear ? 1 : 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-gray-900">{t('genre')}</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onGenreChange(null)}
                className={`rounded px-3 py-1 text-xs ${
                  selectedGenre === null
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t('allGenres')}
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => onGenreChange(genre.id)}
                  className={`rounded px-3 py-1 text-xs ${
                    selectedGenre === genre.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-gray-900">{t('year')}</h3>
            <select
              value={selectedYear || ''}
              onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value="">{t('allYears')}</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 rounded bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              <X size={14} />
              {t('clearFilters')}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 rounded bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
            >
              {t('applyFilters')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;