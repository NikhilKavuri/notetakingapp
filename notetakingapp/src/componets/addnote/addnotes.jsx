import React, { useState, useEffect } from 'react';
import './note.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Search from '../addnote/search';

function Note() {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState({});
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const storedNote = localStorage.getItem('note');
    if (storedNote) {
      setSavedNote(JSON.parse(storedNote));
    }

    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('note', JSON.stringify(savedNote));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [savedNote, notes]);

  useEffect(() => {
    if (searchText.length === 0) {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) =>
        note.content.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [notes, searchText]);

  const saveNote = () => {
    const currentDate = new Date().toLocaleDateString('en-US');
    setSavedNote({
      id: Date.now(),
      content: note,
      date: currentDate,
    });
    setNotes([
      ...notes,
      { id: Date.now(), content: note, date: currentDate },
    ]);
    setNote('');
  };

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="note1">
      <Search notes={notes} setFilteredNotes={setFilteredNotes} onSearch={handleSearch} />
      <div className="box-container">
        <div className="note">
          <textarea
            className="text"
            value={note}
            placeholder="Enter Your notes here"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <div className="note-btn">
            <button className="save" onClick={saveNote}>
              Save
            </button>
          </div>
        </div>
        <div className="border-box">
          <div className="notes-container">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="note-content">{note.content}</div>
                  <div className="note-date">{note.date}</div>
                  <div className="note-delete" onClick={() => deleteNote(note.id)}>
                    <DeleteIcon />
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notes">No notes to display</div>
            )}
          </div>
        </div>
      </div>
      </div>
  )
  }
  export default Note;