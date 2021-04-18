import React, { useEffect, useRef, useState } from "react"

import { useNotes, NotesProvider } from "../../Contexts/Notes"

export const NewNote = () => {
  const { newNote } = useNotes()
  
  const noteRef = useRef()

  const newNoteSubmit = (event) => {
    event.preventDefault()

    const note = newNote(noteRef.current.value)

    noteRef.current.value = ""

    return note
  }

  return (
    <form className="new-note" onSubmit={newNoteSubmit}>
      <h2>New Note</h2>

      <input className="new-note-input" placeholder="Note content" ref={noteRef} required/>
      
      <button className="btn-new-note" type="submit">Add</button>
    </form>
  )
}

export const Note = (props) => {
  const { updateNote, deleteNote } = useNotes()

  const note = props.note

  const noteUpdateRef = useRef()

  const updateNoteSubmit = (event) => {
    event.preventDefault()

    const updatedNote = updateNote(note.id, noteUpdateRef.current.value)

    return updatedNote
  }

  const deleteNoteSubmit = (event) => {
    event.preventDefault()
    
    deleteNote(note.id)
  }

  return (
    <li className="note">
      <p className="note-content">{note.content}</p>
      
      <form className="update-note" onSubmit={updateNoteSubmit}>
        <input className="update-note-input" placeholder="Note content" defaultValue={note.content} ref={noteUpdateRef} required/>
        
        <button className="btn-update-note" type="submit">Update</button>
      </form>

      <form className="delete-note" onSubmit={deleteNoteSubmit}>
        <button className="btn-delete-note" type="submit">Delete</button>
      </form>
    </li>
  )
}

export const NotesList = () => {
  const { getNotes } = useNotes()

  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    getNotes().then((notesObject) => {
      let newNotes = []
  
      for (let id in notesObject) {
        notesObject[id]["id"] = id
  
        newNotes.push(notesObject[id])
      }
  
      setNotes(newNotes)
    })
  }, [getNotes])

  return (
    <div className="notes-list">
      <h2>Your Notes</h2>

      <ul>
        {
          notes.map((note) => {
            return <Note note={note} key={note.id} />
          })
        }
      </ul>
    </div>
  )
}

export const NotesPage = () => {
  return (
    <NotesProvider>
      <div className="notes-page">
        <NewNote />
        <NotesList />
      </div>
    </NotesProvider>
  )
}