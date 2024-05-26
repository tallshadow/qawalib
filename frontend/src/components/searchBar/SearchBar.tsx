import React from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string; // Add the placeholder prop
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleInputChange}
      placeholder={placeholder || "ابحث هنا..."} // Use the placeholder prop or a default value
      style={{ direction: "rtl" }}
      className="search-bar"
    />
  );
};

export default SearchBar;
