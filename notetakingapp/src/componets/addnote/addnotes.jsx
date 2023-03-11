import React, { useState, useEffect } from 'react';
import './note.css';
import DeleteIcon from '@mui/icons-material/Delete';

function Note() {
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const storedNote = localStorage.getItem("note");
    if (storedNote) {
      setSavedNote(JSON.parse(storedNote));
    }

    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(savedNote));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [savedNote, notes]);

  const saveNote = () => {
    const currentDate = new Date().toLocaleDateString('en-US');
    setSavedNote({ id: Date.now(), content: note, date: currentDate });
    setNotes([...notes, { id: Date.now(), content: note, date: currentDate }]);
    setNote("");
  };

  return (
    <div className="note1">
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
                 <button className='delete' onClick={() => 
                  setNotes(notes.filter((n) => n.id !== note.id))
                  }>
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
