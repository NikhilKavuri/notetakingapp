import React, { useState, useEffect } from "react";
import "./note.css";
import * as keycode from 'keycode-js';

function Search({ savedNotes, setFilteredNotes, onSearch }) {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredNotes(savedNotes);
  }, [savedNotes, setFilteredNotes]);

  const handleSearch = (event) => {
    const {
      target: { value },
    } = event;

    const searchValue = value.trim().toLowerCase();
    setSearchText(searchValue);
    onSearch(searchValue); // pass the search value up to parent component

    if (keycode(event) === "backspace" && searchText.length === 1) {
      setFilteredNotes(savedNotes); // display all notes
    } else {
      const filtered = savedNotes.filter((note) =>
        note.content.toLowerCase().includes(searchValue)
      );
      setFilteredNotes(filtered); // display filtered notes
    }
  };
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search Notes"
        value={searchText}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
