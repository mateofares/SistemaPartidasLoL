import { useState } from "react";

function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || loading) {
      return;
    }
    onSearch(trimmed);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="search-icon" aria-hidden="true" />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search summoner name"
        aria-label="Search summoner"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
