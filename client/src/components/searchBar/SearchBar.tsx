import React from "react";
import "./SearchBar.css"; // Import the CSS file

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string; // Add the placeholder prop
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder={placeholder || "ابحث هنا..."} // Use the placeholder prop or a default value
        style={{ direction: "rtl" }}
        className="search-bar"
      />
      <div className="search-icon">&#x1F50D;</div>{" "}
      {/* Unicode for magnifying glass */}
    </div>
  );
};

export default SearchBar;
