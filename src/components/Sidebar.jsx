import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const linkClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-[#693438] text-white"
        : "text-[#f1e3dc] hover:bg-[#5b272c]"
    }`;

  return (
    <>
      {/* DESKTOP SIDEBAR */}

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 overflow-y-auto bg-[#4b171b] text-white lg:block">

        <SidebarContent
          linkClass={linkClass}
        />

      </aside>

      {/* MOBILE HEADER */}

      <div className="sticky top-0 z-50 flex h-16 items-center justify-between bg-[#4b171b] px-4 text-white lg:hidden">

        <div>
          <p className="text-sm font-bold">
            Student Management
          </p>

          <p className="text-xs text-[#d8b7a4]">
            Admin Panel
          </p>
        </div>

        <button
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#693438] text-xl"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE DRAWER */}

      {mobileOpen && (
        <>
          <div
            onClick={() =>
              setMobileOpen(false)
            }
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />

          <aside className="fixed left-0 top-0 z-50 h-screen w-72 overflow-y-auto bg-[#4b171b] text-white lg:hidden">

            <div className="flex items-center justify-between border-b border-[#6b282d] p-6">

              <div>
                <h1 className="text-xl font-bold">
                  Student Management
                </h1>

                <p className="mt-1 text-sm text-[#d8b7a4]">
                  Admin Panel
                </p>
              </div>

              <button
                onClick={() =>
                  setMobileOpen(false)
                }
                className="text-xl"
              >
                ✕
              </button>

            </div>

            <SidebarContent
              linkClass={linkClass}
              onNavigate={() =>
                setMobileOpen(false)
              }
            />

          </aside>
        </>
      )}
    </>
  );
}


/* SIDEBAR CONTENT */

function SidebarContent({
  linkClass,
  onNavigate,
}) {
  return (
    <div>

      {/* BRAND */}

      <div className="border-b border-[#6b282d] p-6">

        <h1 className="text-xl font-bold">
          Student Management
        </h1>

        <p className="mt-1 text-sm text-[#d8b7a4]">
          Admin Panel
        </p>

      </div>

      <div className="p-5">

        {/* MAIN */}

        <p className="mb-4 px-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a15f]">
          Main Menu
        </p>

        <nav className="space-y-2">

          <NavLink
            to="/"
            end
            className={linkClass}
            onClick={onNavigate}
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={linkClass}
            onClick={onNavigate}
          >
            👨‍🎓 Students
          </NavLink>

          <NavLink
            to="/departments"
            className={linkClass}
            onClick={onNavigate}
          >
            🏢 Departments
          </NavLink>

        </nav>

        {/* ACADEMICS */}

        <p className="mb-4 mt-10 px-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a15f]">
          Academics
        </p>

        <nav className="space-y-2">

          <NavLink
            to="/timetable"
            className={linkClass}
            onClick={onNavigate}
          >
            🗓️ Timetable
          </NavLink>

          <NavLink
            to="/attendance"
            className={linkClass}
            onClick={onNavigate}
          >
            📅 Attendance
          </NavLink>

          <NavLink
            to="/gradebook"
            className={linkClass}
            onClick={onNavigate}
          >
            📊 Gradebook
          </NavLink>

          <NavLink
            to="/assignments"
            className={linkClass}
            onClick={onNavigate}
          >
            📝 Assignments
          </NavLink>

        </nav>

        {/* ADMINISTRATION */}

        <p className="mb-4 mt-10 px-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a15f]">
          Administration
        </p>

        <nav className="space-y-2">

          <NavLink
            to="/finance"
            className={linkClass}
            onClick={onNavigate}
          >
            💰 Finance
          </NavLink>

          <NavLink
            to="/requests"
            className={linkClass}
            onClick={onNavigate}
          >
            📄 Requests
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
            onClick={onNavigate}
          >
            ⚙️ Settings
          </NavLink>

        </nav>

      </div>

    </div>
  );
}

export default Sidebar;