import React, { useContext } from "react"

import { firestore, firestoreService } from "../../firebase"

import { useAuth } from "../Authentication"
import { useClasses } from "../Classes"

const HomeworkContext = React.createContext()

export const useHomework = () => {
  return useContext(HomeworkContext)
}

export const HomeworkProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const { getClasses, getClassDetails } = useClasses()

  if (!currentUser) {
    return ""
  }

  const homeworkCollection = firestoreService.collection("homework")
  const classesCollection = firestoreService.collection("classes")

  const getHomework = async (classId) => {
    let classesDetails
    let homeworkIds = {}

    if (classId !== undefined) {
      classesDetails = {
        classId: await getClassDetails(classId)
      }
    } else {
      classesDetails = await getClasses()
    }

    for (let classId in classesDetails) {
      for (let homeworkDocumentReference of classesDetails[classId].homework) {
        homeworkDocumentReference = homeworkCollection.doc(homeworkDocumentReference.id)

        const homeworkDocumentSnapshot = await homeworkDocumentReference.get()

        homeworkIds[homeworkDocumentReference.id] = homeworkDocumentSnapshot.data()
      }
    }

    return homeworkIds
  }

  const getHomeworkDetails = async (homeworkId) => {
    const homeworkDocument = homeworkCollection.doc(homeworkId)
    const homeworkSnapshot = await homeworkDocument.get()

    return homeworkSnapshot.data()
  }

  const getHomeworkSubmissions = async (homeworkId) => {
    const submissionIds = {}

    const homeworkDocument = homeworkCollection.doc(homeworkId)
    const homeworkSnapshot = await homeworkDocument.get()
    const homeworkSubmissionsCollection = homeworkDocument.collection("submissions")
    const classDocument = homeworkSnapshot.data().class
    const classSnapshot = await classDocument.get()

    let homeworkSubmissionsQuery;
    
    if (currentUser.uid in classSnapshot.data().teachers) {
      homeworkSubmissionsQuery = await homeworkSubmissionsCollection.get()
    } else {
      homeworkSubmissionsQuery = await homeworkSubmissionsCollection.where("student", "==", currentUser.uid).get()
    }
    
    homeworkSubmissionsQuery.forEach((homeworkSubmissionDocumentSnapshot) => {
      submissionIds[homeworkSubmissionDocumentSnapshot.id] = homeworkSubmissionDocumentSnapshot.data()
    })

    return submissionIds
  }

  const getHomeworkSubmissionDetails = async (homeworkId, submissionId) => {
    const homeworkDocument = homeworkCollection.doc(homeworkId)
    const homeworkSubmissionsCollection = homeworkDocument.collection("submissions")
    const homeworkSubmissionDocument = homeworkSubmissionsCollection.doc(submissionId)
    const homeworkSubmissionSnapshot = await homeworkSubmissionDocument.get()

    return homeworkSubmissionSnapshot.data()
  }

  const newHomework = (classId, name, description, files, due) => {
    const homeworkDocument = homeworkCollection.doc()
    const classDocument = classesCollection.doc(classId)
    const timestamp = firestore.FieldValue.serverTimestamp()
    
    const newFields = {
      "name": name,
      "description": description ?? "",
      "files": [],//files,
      "due": due,
      "class": classDocument,
      "teacher": currentUser.uid,
      "set": timestamp,
      "updated": timestamp
    }

    homeworkDocument.set(newFields)
    classDocument.update({
      "homework": firestore.FieldValue.arrayUnion(homeworkDocument)
    })

    return homeworkDocument
  }
  
  const updateHomework = (homeworkId, name, description, files, due) => {
    const homeworkDocument = homeworkCollection.doc(homeworkId)
    const timestamp = firestore.FieldValue.serverTimestamp()

    const newFields = {
      "name": name,
      "description": description ?? "",
      "files": files,
      "due": due,
      "updated": timestamp
    }

    return homeworkDocument.update(newFields)
  }
  
  const deleteHomework = async (homeworkId) => {
    const homeworkDocument = homeworkCollection.doc(homeworkId)
    const homeworkSnapshot = await homeworkDocument.get()
    const classDocument = homeworkSnapshot.get("class")

    classDocument.update({
      "homework": firestore.FieldValue.arrayRemove(homeworkDocument)
    })

    return homeworkDocument.delete()
  }

  const submitHomework = (homeworkId, comment, files) => {
    const homeworkDocument = homeworkCollection.doc(homeworkId)
    const submissionsCollection = homeworkDocument.collection("submissions")
    const submissionDocument = submissionsCollection.doc()
    const timestamp = firestore.FieldValue.serverTimestamp()

    const newFields = {
      "comment": comment ?? "",
      "files": [], //files,
      "student": currentUser.uid,
      "submitted": timestamp
    }

    return submissionDocument.set(newFields)
  }

  const respondToSubmission = (homeworkId, submissionId, percentage, comment, files) => {
    const homeworkDocument = homeworkCollection.doc(homeworkId)
    const submissionsCollection = homeworkDocument.collection("submissions")
    const submissionDocument = submissionsCollection.doc(submissionId)
    const timestamp = firestore.FieldValue.serverTimestamp()

    const newFields = {
      "feedback": {
        "percentage": percentage,
        "comment": comment,
        "files": [], //files,
        "responded": timestamp
      }
    }

    return submissionDocument.update(newFields)
  }
  
  const value = {
    getHomework,
    getHomeworkDetails,
    getHomeworkSubmissions,
    getHomeworkSubmissionDetails,
    newHomework,
    updateHomework,
    deleteHomework,
    submitHomework,
    respondToSubmission
  }

  return (
    <HomeworkContext.Provider value={value}>
      {children}
    </HomeworkContext.Provider>
  )
}