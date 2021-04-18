import React, { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"

import { useClasses, ClassesProvider } from "../../Contexts/Classes"
import { useHomework, HomeworkProvider } from "../../Contexts/Homework"
import { useAuth } from "../../Contexts/Authentication"

export const NewHomework = (props) => {
  const { getTeacherClasses, getTeacherClassIds } = useClasses()
  const { newHomework } = useHomework()

  const [ shouldDisplay, setShouldDisplay ] = useState(false)
  
  const homeworkNameRef = useRef()
  const homeworkDescriptionRef = useRef()
  const homeworkFilesRef = useRef()
  const homeworkDueDateRef = useRef()
  const homeworkClassRef = useRef({ value: props.classId })

  const newHomeworkSubmit = (event) => {
    event.preventDefault()

    const homework = newHomework(
      homeworkClassRef.current.value,
      homeworkNameRef.current.value,
      homeworkDescriptionRef.current.value,
      homeworkFilesRef.current.files,
      homeworkDueDateRef.current.value
    )

    homeworkNameRef.current.value = ""
    homeworkDescriptionRef.current.value = ""
    homeworkFilesRef.current.value = ""
    homeworkDueDateRef.current.value = ""
    homeworkClassRef.current.value = ""

    return homework
  }

  const [classes, setClasses] = useState([])

  useEffect(() => {
    if (props.classId === undefined) {
      setShouldDisplay(true)

      getTeacherClasses().then((classesDetails) => {
        let newClasses = []
  
        for (let classId in classesDetails) {
          newClasses.push({
            id: classId,
            name: classesDetails[classId].name
          })
        }
    
        setClasses(newClasses)
      })
    } else {
      getTeacherClassIds().then((classIds) => {
        if (classIds.indexOf(props.classId) >= 0) {
          setShouldDisplay(true)
        }
      })
    }
  }, [])

  return ((shouldDisplay) &&
    <form className="new-homework" onSubmit={newHomeworkSubmit}>
      <h2>New Homework</h2> 
      <input className="new-homework-name-input" placeholder="Homework name" ref={homeworkNameRef} required/>

      <br />

      <input className="new-homework-description-input" placeholder="Homework description" ref={homeworkDescriptionRef} required/>

      <br />
      <br />

      <label className="new-homework-files-title" htmlFor="new-homework-files-selector">Homework files: </label>
      <br />
      <input id="new-homework-files-selector" type="file" name="files" ref={homeworkFilesRef} multiple />

      <br />
      <br />

      <label className="new-homework-datetime-title" htmlFor="new-homework-datetime-selector">Due date: </label>
      <br />
      <input id="new-homework-datetime-selector" type="datetime-local" ref={homeworkDueDateRef} required />

      <br />
      <br />

      {(props.classId === undefined) &&
        <>
          <label className="new-homework-class-title" htmlFor="new-homework-class-selector">Select a class: </label>
          <select id="new-homework-class-selector" ref={homeworkClassRef} defaultValue="" required>
            <option disabled hidden value="" />
            {
              classes.map((classDetails) => {
                return <option key={classDetails.id} value={classDetails.id}>{classDetails.name}</option>
              })
            }
          </select>

          <br />
          <br />
        </>
      }
      
      <button className="btn-new-homework" type="submit">Add</button>
    </form>
  )
}

export const HomeworkListElement = (props) => {
  const homework = props.homework

  return (
    <li className="homework">
      <Link to={`/homework/${homework.id}`} className="homework-title">{homework.name}</Link>
    </li>
  )
}

export const HomeworkList = (props) => {
  const { getHomework } = useHomework()

  const [homework, setHomework] = useState([])
  
  useEffect(() => {
    getHomework(props.classId).then((homeworkObject) => {
      let newHomework = []
  
      for (let id in homeworkObject) {
        homeworkObject[id]["id"] = id

        newHomework.push(homeworkObject[id])
      }
  
      setHomework(newHomework)
    })
  }, [])

  return (
    <div className="homework-list">
      <h2>Homework List</h2> 

      <ul>
        {
          homework.map((homework) => {
            return <HomeworkListElement homework={homework} key={homework.id} />
          })
        }
      </ul>
    </div>
  )
}

export const HomeworkDetails = (props) => {
  const { currentUser } = useAuth()
  const { getHomeworkDetails } = useHomework()

  const [homework, setHomework] = useState({})

  useEffect(() => {
    getHomeworkDetails(props.homeworkId).then((homeworkDetails) => {
      if (homeworkDetails === undefined) {
        homeworkDetails = {
          exists: false
        }
      } else {
        homeworkDetails["id"] = props.homeworkId
        homeworkDetails["exists"] = true
      }
    
      setHomework(homeworkDetails)
    })
  }, [])

  return (
    <div className="homework-details">
      {(homework.exists) &&
        <>
          <h2>{homework.name}</h2>

          <p>{homework.description}</p>

          <p>Due: {homework.due}</p>

          <Link to={`${homework.id}/submit`}>Submit</Link>
          
          <br />

          <Link to={`${homework.id}/submissions`}>Submissions</Link>
          
          {(homework.teacher === currentUser.uid) &&
            <>
              <br />

              <Link to={`${homework.id}/edit`}>Edit</Link>
            </>
          }

          <br />

          <Link to={`/classes/${homework.class.id}/homework`}>Back</Link>
        </>
      }
      
      {(homework.exists === false) &&
        <p>Homework does not exist!</p>
      }
    </div>
  )
}

export const HomeworkDetailsPage = (props) => {
  const { homeworkId } = useParams()

  return (
    <ClassesProvider>
      <HomeworkProvider>
        <div className="homework-details-page">
          <HomeworkDetails homeworkId={homeworkId} />
        </div>
      </HomeworkProvider>
    </ClassesProvider>
  )
}

export const HomeworkEdit = (props) => {
  const { getHomeworkDetails, updateHomework, deleteHomework } = useHomework()

  const [homework, setHomework] = useState([])

  const homeworkNameUpdateRef = useRef()
  const homeworkDescriptionUpdateRef = useRef()
  const homeworkFilesUpdateRef = useRef()
  const homeworkDueDateUpdateRef = useRef()


  useEffect(() => {
    getHomeworkDetails(props.homeworkId).then((homeworkDetails) => {
      if (homeworkDetails === undefined) {
        homeworkDetails = {
          exists: false
        }
      } else {
        homeworkDetails["id"] = props.homeworkId
        homeworkDetails["exists"] = true
      }
    
      setHomework(homeworkDetails)
    })
  }, [])

  const updateHomeworkSubmit = (event) => {
    event.preventDefault()

    const updatedHomework = updateHomework(homework.id, homeworkNameUpdateRef.current.value, homeworkDescriptionUpdateRef.current.value)

    return updatedHomework
  }

  const deleteHomeworkSubmit = (event) => {
    event.preventDefault()
    
    deleteHomework(homework.id)
  }

  return (
    <div className="homework-edit">
      <form className="update-homework" onSubmit={updateHomeworkSubmit}>
        <input className="update-homework-name-input" placeholder="Homework name" defaultValue={homework.name} ref={homeworkNameUpdateRef} required/>

        <br />

        <input className="update-homework-description-input" placeholder="Homework description" defaultValue={homework.description} ref={homeworkDescriptionUpdateRef} required/>

        <br />
        <br />

        <label className="update-homework-files-title" htmlFor="update-homework-files-selector">Homework files: </label>
        <br />
        <input id="update-homework-files-selector" type="file" name="files" ref={homeworkFilesUpdateRef} multiple />

        <br />
        <br />

        <label className="update-homework-datetime-title" htmlFor="update-homework-datetime-selector">Due date: </label>
        <br />
        <input id="update-homework-datetime-selector" type="datetime-local" defaultValue={homework.due} ref={homeworkDueDateUpdateRef} required />

        <br />
        <br />
        
        <button className="btn-update-homework" type="submit">Update</button>
      </form>

      <form className="delete-homework" onSubmit={deleteHomeworkSubmit}>
        <button className="btn-delete-homework" type="submit">Delete</button>
      </form>

      <Link to={`/homework/${homework.id}`}>Back</Link>
    </div>
  )
}

export const HomeworkEditPage = (props) => {
  const { homeworkId } = useParams()

  return (
    <ClassesProvider>
      <HomeworkProvider>
        <div className="homework-edit-page">
         <HomeworkEdit homeworkId={homeworkId} />
        </div>
      </HomeworkProvider>
    </ClassesProvider>
  )
}

export const HomeworkPage = () => {
  const { classId } = useParams()

  return (
    <ClassesProvider>
      <HomeworkProvider>
        <div className="homework-page">
          <NewHomework classId={classId} />
          <HomeworkList classId={classId} />
          { (classId) &&
            <Link to={`/classes/${classId}`}>Back</Link>
          }
        </div>
      </HomeworkProvider>
    </ClassesProvider>
  )
}

export const HomeworkSubmit = (props) => {
  const { getHomeworkDetails, submitHomework } = useHomework()

  const [homework, setHomework] = useState({})

  const homeworkSubmitContentRef = useRef()
  const homeworkSubmitFilesRef = useRef()

  const homeworkId = props.homeworkId

  const onHomeworkSubmit = (event) => {
    event.preventDefault()

    const submission = submitHomework(
      homeworkId,
      homeworkSubmitContentRef.current.value,
      homeworkSubmitFilesRef.current.files
    )

    homeworkSubmitContentRef.current.value = ""
    homeworkSubmitFilesRef.current.value = ""
    
    return submission
  }

  useEffect(() => {
    getHomeworkDetails(props.homeworkId).then((homeworkDetails) => {
      if (homeworkDetails === undefined) {
        homeworkDetails = {
          exists: false
        }
      } else {
        homeworkDetails["id"] = props.homeworkId
        homeworkDetails["exists"] = true
      }
    
      setHomework(homeworkDetails)
    })
  }, [])

  return (
    <>
      {(homework.exists) &&
        <form className="homework-submit" onSubmit={onHomeworkSubmit}>
          <h2>Submit Homework</h2> 
          <textarea className="homework-submit-content" placeholder="Submission content" ref={homeworkSubmitContentRef} required/>

          <br />
          <br />

          <label className="homework-submit-files-title" htmlFor="homework-submit-files-selector">Submission files: </label>
          <br />
          <input id="homework-submit-files-selector" type="file" name="files" ref={homeworkSubmitFilesRef} multiple />
          
          <br />
          <br />
          
          <button className="btn-submit-homework" type="submit">Submit</button>

          <br />

          <Link to={`/homework/${homeworkId}`}>Back</Link>
        </form>
      }
      
      {(homework.exists === false) &&
        <p>Homework does not exist!</p>
      }
    </>
  )
}

export const HomeworkSubmitPage = () => {
  const { homeworkId } = useParams()

  return (
    <ClassesProvider>
      <HomeworkProvider>
        <div className="homework-submit-page">
          <HomeworkSubmit homeworkId={homeworkId} />
        </div>
      </HomeworkProvider>
    </ClassesProvider>
  )
}

export const HomeworkSubmissionsListElement = (props) => {
  const submission = props.submission

  return (
    <li className="homework-submission">
      <Link to={`./submission/${submission.id}`} className="homework-submission-title">{submission.student} ({submission.submitted})</Link>
    </li>
  )
}

export const HomeworkSubmissions = (props) => {
  const { getHomeworkSubmissions } = useHomework()

  const [submissions, setSubmissions] = useState([])

  const homeworkId = props.homeworkId

  useEffect(() => {
    getHomeworkSubmissions(homeworkId).then((submissions) => {
      let newSubmissions = []

      for (let submissionId in submissions) {
        let newSubmission = {}
        
        newSubmission["id"] = submissionId
        newSubmission["student"] = submissions[submissionId]["student"]
        newSubmission["submitted"] = submissions[submissionId]["submitted"].toLocaleString()

        newSubmissions.push(newSubmission)
      }
    
      setSubmissions(newSubmissions)
    })
  }, [])

  return (
    <>
      <div className="homework-submissions">
        <h2>Submissions</h2>

        <ul>
          {
            submissions.map((submission) => {
              return <HomeworkSubmissionsListElement submission={submission} key={submission.id} />
            })
          }
        </ul>

        <Link to={`/homework/${homeworkId}`}>Back</Link>
      </div>
    </>
  )
}

export const HomeworkSubmissionsPage = () => {
  const { homeworkId } = useParams()

  return (
    <ClassesProvider>
      <HomeworkProvider>
        <div className="homework-submissions-page">
          <HomeworkSubmissions homeworkId={homeworkId} />
        </div>
      </HomeworkProvider>
    </ClassesProvider>
  )
}

export const HomeworkSubmission = (props) => {
  const { getHomeworkSubmissionDetails, getHomeworkDetails, respondToSubmission } = useHomework()
  const { getTeacherClassIds } = useClasses()

  const [isTeacher, setIsTeacher] = useState()
  const [submission, setSubmission] = useState({})

  const feedbackCommentRef = useRef()
  const feedbackFilesRef = useRef()
  const feedbackScoreRef = useRef()

  const feedbackSubmit = (event) => {
    event.preventDefault()

    return respondToSubmission(
      props.homeworkId,
      props.submissionId,
      feedbackScoreRef.current.value,
      feedbackCommentRef.current.value,
      feedbackFilesRef.current.files
    )
  }

  useEffect(() => {
    getHomeworkSubmissionDetails(props.homeworkId, props.submissionId).then((submissionData) => {
      if (submissionData === undefined) {
        submissionData = {
          exists: false
        }
      } else {
        submissionData["homeworkId"] = props.homeworkId
        submissionData["id"] = props.submissionId
        submissionData["exists"] = true
      }

      setSubmission(submissionData)
    })

    getTeacherClassIds().then((classIds) => {
      getHomeworkDetails(props.homeworkId).then((homeworkDetails) => {
        if (classIds.indexOf(homeworkDetails.class.id) >= 0) {
          setIsTeacher(true)
        } else {
          setIsTeacher(false)
        }
      })
    })
  }, [])

  return (
    <div className="homework-submission">
      {(submission.exists) &&
        <>
          <h2>Submission</h2>
          {submission.time}

          <p><b>By:</b> {submission.student}</p>
          <p><b>At:</b> {submission.submitted.toLocaleString()}</p>

          <p>{submission.comment}</p>

          <h3>Feedback</h3>

          {(isTeacher === true) &&
            <form className="feedback" onSubmit={feedbackSubmit}>
              <textarea className="feedback-content" placeholder="Comment" defaultValue={submission.feedback.comment} ref={feedbackCommentRef} required/>

              <br />
              <br />

              <label className="feedback-files-title" htmlFor="feedback-files-selector">Feedback files: </label>
              <br />
              <input id="feedback-files-selector" type="file" name="files" ref={feedbackFilesRef} multiple />

              <br />
              <br />
              
              <label className="feedback-score-title" htmlFor="feedback-score-range">Score: </label>
              <input id="feedback-score-range-box" type="number" min="0" max="100" defaultValue={submission.feedback.percentage} ref={feedbackScoreRef} required/>%

              <br />
              <br />

              <button className="btn-submit-feedback" type="submit">Submit</button>
            </form>
          }

          {(isTeacher === false) &&
            <>
              {(submission.feedback !== undefined) ?
                <>
                  <p><b>Comment:</b> {submission.feedback.comment}</p>
                  <p><b>Score:</b> {submission.feedback.percentage}%</p>
                  <p><b>At:</b> {submission.feedback.responded.toLocaleString()}</p>
                </>

                :

                <p>Still awaiting feedback.</p>
              }
            </>
          }
          
          <br />

          <Link to={`../submissions`}>Back</Link>
        </>
      }

      {(submission.exists === false) &&
        <p>Submission does not exist!</p>
      }
    </div>
  )
}

export const HomeworkSubmissionPage = () => {
  const { homeworkId, submissionId } = useParams()

  return (
    <ClassesProvider>
      <HomeworkProvider>
        <div className="homework-submission-page">
          <HomeworkSubmission homeworkId={homeworkId} submissionId={submissionId} />
        </div>
      </HomeworkProvider>
    </ClassesProvider>
  )
}