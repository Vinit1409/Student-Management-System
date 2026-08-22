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

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Sidebar />

      <div className="lg:ml-72">
        <Header />

        <main className="p-4 md:p-8">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/students"
              element={
                <Students
                  students={students}
                  onAdd={() => setShowForm(true)}
                  onUpdate={updateStudent}
                />
              }
            />

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

      {showForm && (
        <StudentForm
          onClose={() => setShowForm(false)}
          onSave={addStudent}
        />
      )}
    </div>
  );
}

export default App;