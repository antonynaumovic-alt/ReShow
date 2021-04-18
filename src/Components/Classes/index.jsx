import React, { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"

// import { adminAuthService } from "../../firebase"

import { useClasses, ClassesProvider } from "../../Contexts/Classes"
import { HomeworkProvider } from "../../Contexts/Homework"
import { useAuth } from "../../Contexts/Authentication"

export const NewClass = () => {
  const { newClass } = useClasses()
  
  const classNameRef = useRef()
  const classDescriptionRef = useRef()
  const classOpenRef = useRef()

  const newClassSubmit = (event) => {
    event.preventDefault()

    const myClass = newClass(classNameRef.current.value, classDescriptionRef.current.value, classOpenRef.current.checked)

    classNameRef.current.value = ""
    classDescriptionRef.current.value = ""
    classOpenRef.current.checked = false

    return myClass
  }

  return (
    <form className="new-class" onSubmit={newClassSubmit}>
      <h2>New Class</h2>

      <input className="new-class-name-input" placeholder="Class name" ref={classNameRef} required/>

      <br />

      <input className="new-class-description-input" placeholder="Class description" ref={classDescriptionRef} />

      <br />

      <label className="new-class-open-title" htmlFor="new-class-open-input">Joinable: </label>
      <input className="new-class-open-input" type="checkbox" ref={classOpenRef} />

      <br />
      <br />
      
      <button className="btn-new-class" type="submit">Create</button>
    </form>
  )
}

export const ClassListElement = (props) => {
  const myClass = props.class
  
  return (
    <li className="class">
      <Link to={`/classes/${myClass.id}`} className="class-name">{myClass.name}</Link>
    </li>
  )
}

export const ClassesList = () => {
  const { getClasses } = useClasses()

  const [classes, setClasses] = useState([])

  useEffect(() => {
    getClasses().then((classesObject) => {
      let newClasses = []

      for (let id in classesObject) {
        classesObject[id]["id"] = id

        newClasses.push(classesObject[id])
      }

      setClasses(newClasses)
    })
  }, [])

  return (
    <div className="classes-list">
      <h2>Your Classes</h2>

      <ul>
        {
          classes.map((myClass) => {
            return <ClassListElement class={myClass} key={myClass.id} />
          })
        }
      </ul>
    </div>
  )
}

export const ClassDetails = (props) => {
  const { currentUser } = useAuth()
  const { getClassDetails, joinClass, leaveClass } = useClasses()

  const [myClass, setMyClass] = useState({})
  const [showJoin, setShowJoin] = useState(false)
  const [showLeave, setShowLeave] = useState(false)

  const joinClassClicked = () => {
    joinClass(myClass.id)
  }

  const leaveClassClicked = () => {
    leaveClass(myClass.id)
  }

  useEffect(() => {
    getClassDetails(props.classId).then((classDetails) => {
      if (classDetails === undefined) {
        classDetails = {
          exists: false
        }
      } else {
        classDetails["id"] = props.classId
        classDetails["exists"] = true
      }
      
      if (classDetails.isOpen === true) {
        if (!(currentUser.uid in classDetails.teachers || currentUser.uid in classDetails.students)) {
          setShowJoin(true)
        }
      }
      
      if ((currentUser.uid in classDetails.teachers && classDetails.teachers[currentUser.uid] !== 1) || currentUser.uid in classDetails.students) {
        setShowLeave(true)
      }
    
      setMyClass(classDetails)
    })
  }, [])

  return (
    <div className="class-details">
      {(myClass.exists) &&
        <>
          <h2>{myClass.name}</h2>

          {showJoin &&
            <button className="join-class-button" onClick={joinClassClicked}>Join</button>
          }

          {showLeave &&
            <button className="leave-class-button" onClick={leaveClassClicked}>Leave</button>
          }

          <p>{myClass.description}</p>

          <Link to={`${myClass.id}/homework`}>Homework</Link>

          <br />

          <Link to={`${myClass.id}/members`}>Members</Link>

          <br />
          <br />

          {(currentUser.uid in myClass.teachers) &&
            <Link to={`${myClass.id}/edit`}>Edit</Link>
          }
        </>
      }

      {(myClass.exists === false) &&
        <p>Class does not exist!</p>
      }
    </div>
  )
}

export const ClassDetailsPage = () => {
  const { classId } = useParams()

  return (
    <ClassesProvider>
      <HomeworkProvider>
        <div className="class-details-page">
          <ClassDetails classId={classId} />
        </div>
      </HomeworkProvider>
    </ClassesProvider>
  )
}

export const ClassEdit = (props) => {
  const { getClassDetails, updateClass, deleteClass } = useClasses()

  const [myClass, setMyClass] = useState([])

  const classNameUpdateRef = useRef()
  const classDescriptionUpdateRef = useRef()
  const classOpenUpdateRef = useRef()

  useEffect(() => {
    getClassDetails(props.classId).then((classDetails) => {
      if (classDetails === undefined) {
        classDetails = {
          exists: false
        }
      } else {
        classDetails["id"] = props.classId
        classDetails["exists"] = true
      }
    
      setMyClass(classDetails)
    })
  }, [])

  const updateClassSubmit = (event) => {
    event.preventDefault()

    const myUpdatedClass = updateClass(myClass.id, classNameUpdateRef.current.value, classDescriptionUpdateRef.current.value, classOpenUpdateRef.current.checked)

    return myUpdatedClass
  }

  const deleteClassSubmit = (event) => {
    event.preventDefault()
    
    deleteClass(myClass.id)
  }

  return (
    <div className="class-edit">
      <form className="update-class" onSubmit={updateClassSubmit}>
        <input className="update-class-name-input" placeholder="Class name" defaultValue={myClass.name} ref={classNameUpdateRef} required/>

        <br />

        <input className="update-class-description-input" placeholder="Class description" defaultValue={myClass.description} ref={classDescriptionUpdateRef}/>

        <br />

        <label className="update-class-open-title" htmlFor="update-class-open-input">Joinable: </label>
        <input className="update-class-open-input" type="checkbox" defaultChecked={myClass.isOpen} ref={classOpenUpdateRef} />

        <br />
        <br />
        
        <button className="btn-update-class" type="submit">Update</button>
      </form>

      <form className="delete-class" onSubmit={deleteClassSubmit}>
        <button className="btn-delete-class" type="submit">Delete</button>
      </form>

      <Link to={`/classes/${myClass.id}`}>Back</Link>
    </div>
  )
}

export const ClassEditPage = () => {
  const { classId } = useParams()

  return (
    <ClassesProvider>
      <div className="class-edit-page">
        <ClassEdit classId={classId} />
      </div>
    </ClassesProvider>
  )
}

export const ClassMembersListElement = (props) => {
  const { currentUser } = useAuth()
  const { removeTeacher, removeStudent } = useClasses()

  const member = props.member

  const removeClicked = () => {
    if (props.memberType === "Teacher") {
      removeTeacher(props.classId, member.id)
    } else if (props.memberType === "Student") {
      removeStudent(props.classId, member.id)
    }
  }

  return (
    <li className="member">
      {member.id}

      {(props.canRemove) &&
        <button className="btn-remove-member" onClick={removeClicked}>X</button>
      }
    </li>
  )
}

export const ClassMembersList = (props) => {
  const { currentUser } = useAuth()
  const { getClassDetails } = useClasses()

  const [isTeacher, setIsTeacher] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [teachers, setTeachers] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    getClassDetails(props.classId).then((myClass) => {
      let newTeachers = []
      let newStudents = []

      for (let id in myClass.teachers) {
        if (id === currentUser.uid) {
          setIsTeacher(true)
          
          if (myClass.teachers[id] === 1) {
            setIsOwner(true)
          }
        }

        let newTeacher = {}

        newTeacher["id"] = id

        newTeachers.push(newTeacher)
      }

      setTeachers(newTeachers)

      for (let id in myClass.students) {
        let newStudent = {}

        newStudent["id"] = id

        newStudents.push(newStudent)
      }

      setStudents(newStudents)
    })
  }, [])

  return (
    <div className="classes-list">
      <h2>Teachers</h2>
      <ul>
        {
          teachers.map((teacher) => {
            const canRemove = isOwner && (teacher.id !== currentUser.uid)

            return <ClassMembersListElement canRemove={canRemove} memberType="Teacher" classId={props.classId} member={teacher} key={teacher.id} />
          })
        }
      </ul>

      <h2>Students</h2>
      <ul>
        {
          students.map((student) => {
            return <ClassMembersListElement canRemove={isTeacher} memberType="Student" classId={props.classId} member={student} key={student.id} />
          })
        }
      </ul>

      {(isTeacher) &&
        <Link to={`/classes/${props.classId}/members/add`}>Add member</Link>
      }

      <br />

      <Link to={`/classes/${props.classId}`}>Back</Link>
    </div>
  )
}

export const ClassMembersPage = () => {
  const { classId } = useParams()

  return (
    <ClassesProvider>
      <div className="class-members-page">
        <ClassMembersList classId={classId} />
      </div>
    </ClassesProvider>
  )
}

export const ClassAddMember = (props) => {
  // const { getUserByEmail } = adminAuthService

  const { addTeacher, addStudent } = useClasses()

  const memberUIDRef = useRef()
  const memberRoleRef = useRef()

  const addMemberSubmit = async (event) => {
    event.preventDefault()

    let addMemberResult

    if (memberRoleRef.current.value === "Teacher") {
      addMemberResult = addTeacher(props.classId, memberUIDRef.current.value)
    } else if (memberRoleRef.current.value === "Student") {
      addMemberResult = addStudent(props.classId, memberUIDRef.current.value)
    }

    memberUIDRef.current.value = ""

    return addMemberResult
  }

  return (
    <>
      <form className="add-member" onSubmit={addMemberSubmit}>
        <input className="add-member-uid" placeholder="UID" ref={memberUIDRef} required/>

        <br />

        <label className="add-member-role-title" htmlFor="new-homework-class-selector">Role: </label>
        <select id="add-member-role-selector" ref={memberRoleRef} required>
          <option key="Student" value="Student">Student</option>
          <option key="Teacher" value="Teacher">Teacher</option>
        </select>

        <br />
        <br />
        
        <button className="btn-add-member" type="submit">Add</button>
      </form>

      <Link to={`/classes/${props.classId}/members`}>Back</Link>
    </>
  )
}

export const ClassAddMemberPage = () => {
  const { classId } = useParams()

  return (
    <ClassesProvider>
      <div className="class-add-member-page">
        <ClassAddMember classId={classId} />
      </div>
    </ClassesProvider>
  )
}

export const ClassesPage = () => {
  return (
    <ClassesProvider>
      <div className="classes-page">
        <NewClass />
        <ClassesList />
      </div>
    </ClassesProvider>
  )
}