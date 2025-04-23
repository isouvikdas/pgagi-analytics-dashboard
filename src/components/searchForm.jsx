import React, { useEffect, useRef, useState } from "react";

export default function SearchForm({ search, setSearch, handleSearch, suggestions, onSelectSuggestion }) {
  const inputRef = useRef(null);

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={onSearch} className="w-full flex items-center relative">
      <input
        type="text"
        placeholder="Search for cities"
        ref={inputRef}
        value={search}
        onInput={(e) => setSearch(e.target.value)}
        className="flex-grow bg-gray-200 dark:bg-gray-800 dark:text-white dark:placeholder-gray-300 rounded-2xl py-3 px-4 focus:outline-none shadow-md"
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
