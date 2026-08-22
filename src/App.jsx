import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StudentForm from "./components/StudentForm";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Departments from "./pages/Departments";
import Settings from "./pages/Settings";
import StudentProfile from "./pages/StudentProfile";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import Gradebook from "./pages/Gradebook";
import Assignments from "./pages/Assignments";
import Finance from "./pages/Finance";
import Requests from "./pages/Requests";

import { initialStudents } from "./data/students";

function App() {
  const [students, setStudents] =
    useState(initialStudents);

  const [showForm, setShowForm] =
    useState(false);

  function addStudent(student) {
    setStudents((current) => [
      student,
      ...current,
    ]);

    setShowForm(false);
  }

  function updateStudent(updatedStudent) {
    setStudents((current) =>
      current.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    );
  }

  function deleteStudent(studentId) {
    setStudents((current) =>
      current.filter(
        (student) =>
          student.id !== studentId
      )
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">

      <Sidebar />

      <div className="lg:ml-72">

        <Header />

        <main className="p-4 md:p-8">

          <Routes>

            {/* DASHBOARD */}
            <Route
              path="/"
              element={
                <Dashboard
                  students={students}
                />
              }
            />

            {/* STUDENTS */}
            <Route
              path="/students"
              element={
                <Students
                  students={students}
                  onAdd={() =>
                    setShowForm(true)
                  }
                  onUpdate={updateStudent}
                  onDelete={deleteStudent}
                />
              }
            />

            {/* STUDENT PROFILE */}
            <Route
              path="/students/:id"
              element={
                <StudentProfile
                  students={students}
                />
              }
            />

            {/* DEPARTMENTS */}
            <Route
              path="/departments"
              element={
                <Departments />
              }
            />

            {/* ACADEMICS */}
            <Route
              path="/timetable"
              element={
                <Timetable />
              }
            />

            <Route
              path="/attendance"
              element={
                <Attendance
                  students={students}
                />
              }
            />

            <Route
              path="/gradebook"
              element={
                <Gradebook
                  students={students}
                />
              }
            />

            <Route
              path="/assignments"
              element={
                <Assignments />
              }
            />

            {/* ADMINISTRATION */}
            <Route
              path="/finance"
              element={
                <Finance />
              }
            />

            <Route
              path="/requests"
              element={
                <Requests />
              }
            />

            <Route
              path="/settings"
              element={
                <Settings />
              }
            />

            {/* FALLBACK */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </main>

      </div>

      {/* ADD STUDENT MODAL */}

      {showForm && (
        <StudentForm
          onClose={() =>
            setShowForm(false)
          }
          onSave={addStudent}
        />
      )}

    </div>
  );
}

export default App;