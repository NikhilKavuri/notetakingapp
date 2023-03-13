import React from 'react';
import './note.css';
function Search({ notes, setFilteredNotes, setSearchText }) {
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const searchValue = event.target.value.trim().toLowerCase();
      setSearchText(searchValue);
      const filteredNotes = notes.filter((note) =>
        note.content.toLowerCase().includes(searchValue)
      );
      setFilteredNotes(filteredNotes);
    }
  };

  return (
    <div>
      <input
      className='search'
        type="text"
        placeholder="Search Notes"
        onKeyDown={handleSearch}
      />
    </div>
  );
}
export default Search;
