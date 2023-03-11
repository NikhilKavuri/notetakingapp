import React from 'react';
import { useState, useEffect } from 'react';

export default function Note1() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    setNotes(savedNotes)

  }, [])
  
  return (
    <div>
      {notes && notes.length > 0 ? notes.map((note) => (
        <div key={note.id}>
          <p>{note.content}</p>
        </div>
      )) : <div>No notes found</div>}
    </div>
  )
}
