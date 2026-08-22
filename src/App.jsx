import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { TimetableProvider } from "./context/TimetableContext";

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

import {
  StudentProvider,
  useStudents,
} from "./context/StudentContext";


function AppContent() {
  const {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  const [showForm, setShowForm] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#f5f1e8]">

      <Sidebar />

      <div className="lg:ml-72">

        <Header />

        <main className="p-4 md:p-8">

          <Routes>

            {/* =========================
                DASHBOARD
            ========================= */}

            <Route
              path="/"
              element={
                <Dashboard
                  students={students}
                />
              }
            />


            {/* =========================
                STUDENTS
            ========================= */}

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


            {/* =========================
                STUDENT PROFILE
            ========================= */}

            <Route
              path="/students/:id"
              element={
                <StudentProfile
                  students={students}
                />
              }
            />


            {/* =========================
                DEPARTMENTS
            ========================= */}

            <Route
              path="/departments"
              element={
                <Departments />
              }
            />


            {/* =========================
                TIMETABLE
            ========================= */}

            <Route
              path="/timetable"
              element={
                <Timetable />
              }
            />


            {/* =========================
                ATTENDANCE
            ========================= */}

            <Route
              path="/attendance"
              element={
                <Attendance
                  students={students}
                />
              }
            />


            {/* =========================
                GRADEBOOK
            ========================= */}

            <Route
              path="/gradebook"
              element={
                <Gradebook
                  students={students}
                />
              }
            />


            {/* =========================
                ASSIGNMENTS
            ========================= */}

            <Route
              path="/assignments"
              element={
                <Assignments />
              }
            />


            {/* =========================
                FINANCE
            ========================= */}

            <Route
              path="/finance"
              element={
                <Finance
                  students={students}
                />
              }
            />


            {/* =========================
                REQUESTS
            ========================= */}

            <Route
              path="/requests"
              element={
                <Requests />
              }
            />


            {/* =========================
                SETTINGS
            ========================= */}

            <Route
              path="/settings"
              element={
                <Settings />
              }
            />


            {/* =========================
                FALLBACK
            ========================= */}

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


      {/* =========================
          ADD STUDENT MODAL
      ========================= */}

      {showForm && (
        <StudentForm
          onClose={() =>
            setShowForm(false)
          }
          onSave={(student) => {
            addStudent(student);
            setShowForm(false);
          }}
        />
      )}

    </div>
  );
}


/* =========================
   APP PROVIDERS
========================= */

function App() {
  return (
    <StudentProvider>

      <TimetableProvider>

        <AppContent />

      </TimetableProvider>

    </StudentProvider>
  );
}

export default App;