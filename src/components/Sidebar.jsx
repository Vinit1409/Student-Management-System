import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 bg-[#4b171b] text-white lg:block">
      {/* LOGO / TITLE */}
      <div className="border-b border-[#6b282d] p-6">
        <h1 className="text-xl font-bold">
          Student Management
        </h1>

        <p className="mt-1 text-sm text-[#d8b7a4]">
          Admin Panel
        </p>
      </div>

      <div className="p-5">
        {/* MAIN MENU */}
        <p className="mb-4 px-4 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a15f]">
          Main Menu
        </p>

        <nav className="space-y-2">
          {/* DASHBOARD */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block rounded-xl px-5 py-4 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#693438] text-white"
                  : "text-[#f1e3dc] hover:bg-[#5b272c]"
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* STUDENTS */}
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `block rounded-xl px-5 py-4 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#693438] text-white"
                  : "text-[#f1e3dc] hover:bg-[#5b272c]"
              }`
            }
          >
            Students
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;