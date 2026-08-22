import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
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
              element={
                <div className="rounded-2xl bg-white p-8">
                  Students page coming next.
                </div>
              }
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