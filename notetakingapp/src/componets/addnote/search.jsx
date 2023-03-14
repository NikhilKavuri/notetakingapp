import React, { useState } from 'react';
import './note.css';

function Search({ notes, setFilteredNotes }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    const searchValue = event.target.value.trim().toLowerCase();
    setSearchText(searchValue);
    const filtered = notes.filter((note) =>
      note.content.toLowerCase().includes(searchValue)
    );
    setFilteredNotes(filtered);
  };
  
  const handleKeyUp = (event) => {
    if (searchText.length===0) {
      setSearchText('');
      setFilteredNotes(notes);
      console.log(event.key);
  }
  };
  

  return (
    <div>
      <input
        className='search'
        type="text"
        placeholder="Search Notes"
        value={searchText}
        onInput={handleSearch}
        onKeyUp={handleKeyUp}
      />
    </div>
  );
}

export default Search;
