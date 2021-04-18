import { BrowserRouter, Switch, Route } from "react-router-dom"

import { AuthProvider } from "../../Contexts/Authentication"

import { Header } from "../Header"
import { AuthPage } from "../Authentication"
import { NotesPage } from "../Notes"
import { HomeworkPage, HomeworkDetailsPage, HomeworkEditPage, HomeworkSubmitPage, HomeworkSubmissionsPage, HomeworkSubmissionPage } from "../Homework"
import { ClassesPage, ClassDetailsPage, ClassEditPage, ClassMembersPage, ClassAddMemberPage } from "../Classes"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AuthProvider>
          <Switch>
            <Route path="/auth" exact>
              <AuthPage />
            </Route>
            <Route path="/notes" exact>
              <NotesPage />
            </Route>
            <Route path="/classes" exact>
              <ClassesPage />
            </Route>
            <Route path="/classes/:classId" exact>
              <ClassDetailsPage />
            </Route>
            <Route path="/classes/:classId/edit" exact>
              <ClassEditPage />
            </Route>
            <Route path="/classes/:classId/homework" exact>
              <HomeworkPage />
            </Route>
            <Route path="/classes/:classId/members" exact>
              <ClassMembersPage />
            </Route>
            <Route path="/classes/:classId/members/add" exact>
              <ClassAddMemberPage />
            </Route>
            <Route path="/homework" exact>
              <HomeworkPage />
            </Route>
            <Route path="/homework/:homeworkId" exact>
              <HomeworkDetailsPage />
            </Route>
            <Route path="/homework/:homeworkId/edit" exact>
              <HomeworkEditPage />
            </Route>
            <Route path="/homework/:homeworkId/submit" exact>
              <HomeworkSubmitPage />
            </Route>
            <Route path="/homework/:homeworkId/submissions" exact>
              <HomeworkSubmissionsPage />
            </Route>
            <Route path="/homework/:homeworkId/submission/:submissionId" exact>
              <HomeworkSubmissionPage />
            </Route>
          </Switch>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App