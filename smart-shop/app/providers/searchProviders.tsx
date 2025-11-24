"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  debouncedSearch: string;
  category: string | null;
  setCategory: (value: string | null) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const SearchProvider = ({ children }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, debouncedSearch, category, setCategory }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within a SearchProvider");
  return context;
};
