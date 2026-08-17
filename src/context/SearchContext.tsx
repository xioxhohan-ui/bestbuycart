import React, { createContext, useContext, useState, useEffect } from 'react';
import { SearchResults } from '../types/search';
import { searchService } from '../services/searchService';

interface SearchContextType {
  isSearchModalOpen: boolean;
  searchQuery: string;
  searchResults: SearchResults | null;
  suggestions: string[];
  isLoading: boolean;
  openSearch: (initialQuery?: string) => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
  executeSearch: (query: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQueryState] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Load initial suggestions
    searchService.getSuggestions('').then(setSuggestions);
  }, []);

  const openSearch = (initialQuery?: string) => {
    if (initialQuery !== undefined) {
      setSearchQueryState(initialQuery);
      executeSearch(initialQuery);
    }
    setIsSearchModalOpen(true);
  };

  const closeSearch = () => {
    setIsSearchModalOpen(false);
  };

  const executeSearch = async (query: string) => {
    setSearchQueryState(query);
    if (!query.trim()) {
      setSearchResults(null);
      const sugg = await searchService.getSuggestions('');
      setSuggestions(sugg);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchService.search(query);
      const sugg = await searchService.getSuggestions(query);
      setSearchResults(results);
      setSuggestions(sugg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchModalOpen,
        searchQuery,
        searchResults,
        suggestions,
        isLoading,
        openSearch,
        closeSearch,
        setSearchQuery: setSearchQueryState,
        executeSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
