import { NavLink } from "react-router-dom";

function Sidebar({ mobileOpen, onClose }) {
  const linkClass = ({ isActive }) =>
    `block rounded-xl px-5 py-4 text-sm font-semibold transition ${
      isActive
        ? "bg-[#693438] text-white"
        : "text-[#f1e3dc] hover:bg-[#5b272c]"
    }`;

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 bg-[#4b171b] text-white lg:block">
        <div className="border-b border-[#6b282d] p-6">
          <h1 className="text-xl font-bold">
            Student Management
          </h1>

          <p className="mt-1 text-sm text-[#d8b7a4]">
            Admin Panel
          </p>
        </div>

        <div className="p-5">
          <p className="mb-4 px-4 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a15f]">
            Main Menu
          </p>

          <nav className="space-y-2">
            <NavLink
              to="/"
              end
              className={linkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/students"
              className={linkClass}
            >
              Students
            </NavLink>
          </nav>
        </div>
      </aside>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#4b171b] text-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#6b282d] p-6">
          <div>
            <h1 className="text-xl font-bold">
              Student Management
            </h1>

            <p className="mt-1 text-sm text-[#d8b7a4]">
              Admin Panel
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-white transition hover:bg-[#693438]"
          >
            ×
          </button>
        </div>

        <div className="p-5">
          <p className="mb-4 px-4 text-xs font-bold uppercase tracking-[0.2em] text-[#c9a15f]">
            Main Menu
          </p>

          <nav className="space-y-2">
            {/* DASHBOARD */}
            <NavLink
              to="/"
              end
              onClick={onClose}
              className={linkClass}
            >
              Dashboard
            </NavLink>

            {/* STUDENTS */}
            <NavLink
              to="/students"
              onClick={onClose}
              className={linkClass}
            >
              Students
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;