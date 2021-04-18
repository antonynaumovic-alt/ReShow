import React, { useContext } from "react"

import { firestore, firestoreService } from "../../firebase"

import { useAuth } from "../Authentication"

const ClassesContext = React.createContext()

export const useClasses = () => {
  return useContext(ClassesContext)
}

export const ClassesProvider = ({ children }) => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return ""
  }

  const classesCollection = firestoreService.collection("classes")
  const homeworkCollection = firestoreService.collection("homework")

  const getClasses = async () => {
    const teacherClasses = await getTeacherClasses()
    const studentClasses = await getStudentClasses()
    
    return Object.assign(teacherClasses, studentClasses)
  }

  const getTeacherClasses = async () => {
    const teacherClasses = {}

    const teacherClassesQuerySnapshot = await classesCollection.where(`teachers.${currentUser.uid}`, ">=", 0).get()

    teacherClassesQuerySnapshot.forEach((teacherClassQueryDocumentSnapshot) => {
      teacherClasses[teacherClassQueryDocumentSnapshot.id] = teacherClassQueryDocumentSnapshot.data()
    })

    return teacherClasses
  }

  const getStudentClasses = async () => {
    const studentClasses = {}

    const studentClassesQuerySnapshot = await classesCollection.where(`students.${currentUser.uid}`, ">=", 0).get()

    studentClassesQuerySnapshot.forEach((studentClassQueryDocumentSnapshot) => {
      studentClasses[studentClassQueryDocumentSnapshot.id] = studentClassQueryDocumentSnapshot.data()
    })

    return studentClasses
  }

  const getClassIds = async () => {
    const classes = await getClasses()

    return [...Object.keys(classes)]
  }

  const getTeacherClassIds = async () => {
    const teacherClasses = await getTeacherClasses()

    return [...Object.keys(teacherClasses)]
  }

  const getStudentClassIds = async () => {
    const studentClasses = await getStudentClasses()

    return [...Object.keys(studentClasses)]
  }

  const getClassDetails = async (classId) => {
    const classDocument = classesCollection.doc(classId)
    const classSnapshot = await classDocument.get()

    return classSnapshot.data()
  }

  const newClass = (name, description, isOpen) => {
    const classDocument = classesCollection.doc()
    const timestamp = firestore.FieldValue.serverTimestamp()
    
    const newFields = {
      "name": name,
      "description": description ?? "",
      "isOpen": isOpen,
      "teachers": {[currentUser.uid]: 1},
      "students": {},
      "homework": [],
      "created": timestamp,
      "updated": timestamp
    }

    classDocument.set(newFields)

    return classDocument
  }
  
  const updateClass = (classId, name, description, isOpen) => {
    const classDocument = classesCollection.doc(classId)
    const timestamp = firestore.FieldValue.serverTimestamp()

    const newFields = {
      "name": name,
      "description": description ?? "",
      "isOpen": isOpen,
      "updated": timestamp
    }

    return classDocument.update(newFields)
  }
  
  const addTeacher = async (classId, teacherId) => {
    const classDocument = classesCollection.doc(classId)
    const classSnapshot = await classDocument.get()
    const classData = classSnapshot.data()

    if (classData.teachers[currentUser.uid] !== 1) {
      return false
    }

    if (teacherId in classData.teachers) {
      return false
    } else if (teacherId in classData.students) {
      return false
    }

    const newFields = {
      [`teachers.${teacherId}`]: 0
    }

    classDocument.update(newFields)

    return true
  }
  
  const addStudent = async (classId, studentId) => {
    const classDocument = classesCollection.doc(classId)
    const classSnapshot = await classDocument.get()
    const classData = classSnapshot.data()

    if (!(currentUser.uid in classData.teachers)) {
      return false
    }

    if (studentId in classData.teachers) {
      return false
    } else if (studentId in classData.students) {
      return false
    }

    const newFields = {
      [`students.${studentId}`]: 1
    }

    classDocument.update(newFields)

    return true
  }
  
  const removeTeacher = async (classId, teacherId) => {
    const classDocument = classesCollection.doc(classId)
    const classSnapshot = await classDocument.get()
    const classData = classSnapshot.data()

    if (classData.teachers[currentUser.uid] !== 1) {
      return false
    }

    if (!(teacherId in classData.teachers)) {
      return false
    }

    const newFields = {
      [`teachers.${teacherId}`]: firestore.FieldValue.delete()
    }
  
    classDocument.update(newFields)

    return true
  }
  
  const removeStudent = async (classId, studentId) => {
    const classDocument = classesCollection.doc(classId)
    const classSnapshot = await classDocument.get()
    const classData = classSnapshot.data()

    if (!(currentUser.uid in classData.teachers)) {
      return false
    }

    if (!(studentId in classData.students)) {
      return false
    }

    const newFields = {
      [`students.${studentId}`]: firestore.FieldValue.delete()
    }
  
    classDocument.update(newFields)

    return true
  }
  
  const joinClass = async (classId) => {
    const classDocument = classesCollection.doc(classId)
    const classSnapshot = await classDocument.get()
    const classData = classSnapshot.data()

    if (classData.isOpen !== true) {
      return false
    } else if (currentUser.uid in classData.teachers) {
      return false
    } else if (currentUser.uid in classData.students) {
      return false
    }

    const newFields = {
      [`students.${currentUser.uid}`]: 0
    }

    classDocument.update(newFields)

    return true
  }
  
  const leaveClass = async (classId) => {
    const classDocument = classesCollection.doc(classId)
    const classSnapshot = await classDocument.get()
    const classData = classSnapshot.data()
    
    const newFields = {}

    if (currentUser.uid in classData.teachers) {
      if (classData.teachers[currentUser.uid] === 1) {
        // Must make someone else owner of class, or delete it

        return false
      }

      newFields[`teachers.${currentUser.uid}`] = firestore.FieldValue.delete()
    } else if (currentUser.uid in classData.students) {
      // if (classData.students[currentUser.uid] !== 0) {
      //   // Can't leave class if you didn't join it when open
      
      //   return false
      // }

      newFields[`students.${currentUser.uid}`] = firestore.FieldValue.delete()
    }
  
    classDocument.update(newFields)

    return true
  }
  
  const setOpenStatus = (classId, openStatus) => {
    const classDocument = classesCollection.doc(classId)

    const newFields = {
      "isOpen": openStatus === true
    }

    return classDocument.update(newFields)
  }
  
  const setHomework = (classId, homeworkId) => {
    const classDocument = classesCollection.doc(classId)
    const homeworkDocument = homeworkCollection.doc(homeworkId)

    const newFields = {
      "homework": firestore.FieldValue.arrayUnion(homeworkDocument)
    }

    return classDocument.update(newFields)
  }
  
  const deleteClass = (classId) => {
    const classDocument = classesCollection.doc(classId)

    return classDocument.delete()
  }
  
  const value = {
    getClasses,
    getTeacherClasses,
    getStudentClasses,
    getClassIds,
    getTeacherClassIds,
    getStudentClassIds,
    getClassDetails,
    newClass,
    updateClass,
    addTeacher,
    addStudent,
    removeTeacher,
    removeStudent,
    joinClass,
    leaveClass,
    setOpenStatus,
    setHomework,
    deleteClass
  }

  return (
    <ClassesContext.Provider value={value}>
      {children}
    </ClassesContext.Provider>
  )
}