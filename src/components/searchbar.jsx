import React, { useState } from "react";
import "../style/searchbar.css";

export default function SearchBar({
  onSubmitSearch = (e) => {},
  favLink = "",
  initialValue = "",
}) {
  const [searchbarValue, setSearchbarValue] = useState(initialValue);

  return (
    <div className="search-bar">
      <input
        className="search"
        type="text"
        name="name"
        value={searchbarValue}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setSearchbarValue(e.target.value)}
      />
      <div>
        <button onClick={() => onSubmitSearch(searchbarValue)}>Search</button>
      </div>

      {favLink === "" ? (
        <></>
      ) : (
        <a href={favLink} rel="noreferrer" target="_blank">
          <button>View Favourite</button>
        </a>
      )}
    </div>
  );
}
