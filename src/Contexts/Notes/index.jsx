import React, { useContext } from "react"
import { v4 as uuidv4 } from "uuid"

import { firestore, firestoreService } from "../../firebase"

import { useAuth } from "../Authentication"

const NotesContext = React.createContext()

export const useNotes = () => {
  return useContext(NotesContext)
}

export const NotesProvider = ({ children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return ""
  }

  const notesCollection = firestoreService.collection("notes")
  const userDocument = notesCollection.doc(currentUser.uid)

  const getNotes = async () => {
    const notesSnapshot = await userDocument.get()

    return notesSnapshot.data()
  }

  const newNote = (content) => {
    const noteId = uuidv4()

    const timestamp = firestore.FieldValue.serverTimestamp()
    
    const newFields = {
      [noteId]: {
        "content": content,
        "created": timestamp,
        "updated": timestamp
      }
    }

    return userDocument.set(newFields, { merge: true })
  }
  
  const updateNote = (noteId, content) => {
    const timestamp = firestore.FieldValue.serverTimestamp()

    const newFields = {
      [`${noteId}.content`]: content,
      [`${noteId}.updated`]: timestamp
    }

    return userDocument.update(newFields)
  }
  
  const deleteNote = (noteId) => {
    const newFields = {
      [noteId]: firestore.FieldValue.delete()
    }

    return userDocument.update(newFields)
  }
  
  const value = {
    getNotes,
    newNote,
    updateNote,
    deleteNote
  }

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  )
}