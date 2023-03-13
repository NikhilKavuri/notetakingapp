import React, { useState, useEffect } from 'react';
import './note.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Search from '../addnote/search';
function Note() {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedNote = localStorage.getItem("note");
    if (storedNote) {
      setSavedNote(JSON.parse(storedNote));
    }

    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(savedNote));
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [savedNote, notes]);

  useEffect(() => {
    const filteredNotes = notes.filter((note) =>
      note.content.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredNotes(filteredNotes);
  }, [notes, searchText]);

  const saveNote = () => {
    const currentDate = new Date().toLocaleDateString("en-US");
    setSavedNote({
      id: Date.now(),
      content: note,
      date: currentDate,
    });
    setNotes([
      ...notes,
      { id: Date.now(), content: note, date: currentDate },
    ]);
    setNote("");
  };


  return (
    <div className="note1">
      <Search notes={notes} setFilteredNotes={setNotes} setSearchText={setSearchText} />
        <div className="box-container">
          <div className='note'>
            <textarea
             className='text'
              value={note}
              placeholder='Enter Your notes here'
              onChange={(e) => setNote(e.target.value)}
              ></textarea>
            <div className="note-btn">
              <button className='save' onClick={saveNote}>Save</button>
          </div>
            </div>
        <div className='border-box'>
          <div className="notes-container">
            {notes && notes.length > 0 ? notes.map((note) => (
             <div key={note.id} className="note-item">
             <p>{note.content}</p>
               <p className='date'>{note.date}</p>
               <button className='delete' onClick={() => setNotes(notes.filter((n) => n.id !== note.id))}>
                 <DeleteIcon />
               </button>
             </div>         
          )) : <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
