import React from "react";
import "../styles/FilterBar.css";

interface FilterBarProps {
  category: string;
  setCategory: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ category, setCategory, searchQuery, setSearchQuery }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="books">Books</option>
        <option value="movies">Movies</option>
      </select>
    </div>
  );
};

export default FilterBar;
