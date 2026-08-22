import { useState } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import { initialStudents } from "./data/students";

function App() {
  const [students] = useState(initialStudents);

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      <Sidebar />

      <div className="lg:ml-72">
        <Header />

        <main className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route
              path="/students"
              element={<Students students={students} />}
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;