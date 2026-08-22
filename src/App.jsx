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

import { initialStudents } from "./data/students";

function App() {
  const [students, setStudents] =
    useState(initialStudents);

  const [showForm, setShowForm] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
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

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f5f1e8]">

      {/* SIDEBAR */}
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={closeMobileMenu}
      />

      <div className="lg:ml-72">

        {/* HEADER */}
        <Header
          onMenuClick={() =>
            setMobileMenuOpen(true)
          }
        />

        <main className="p-4 md:p-8">
          <Routes>

            {/* DASHBOARD */}
            <Route
              path="/"
              element={<Dashboard />}
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
                />
              }
            />

            {/* INVALID ROUTE */}
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

      {/* ADD STUDENT FORM */}
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