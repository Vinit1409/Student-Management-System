function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col bg-[#4b171b] text-[#f8f1e5] shadow-xl lg:flex">

      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div>
          <h1 className="text-xl font-bold tracking-wide">
            V-PORTAL
          </h1>

          <p className="mt-1 text-xs text-[#ddcfc0]">
            Student Administration
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9a66b]">
          Main Menu
        </p>

        <a
          href="/"
          className="mb-1 block rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold"
        >
          Dashboard
        </a>

        <a
          href="/students"
          className="mb-1 block rounded-xl px-4 py-3 text-sm text-[#ddcfc0] transition hover:bg-white/10"
        >
          Students
        </a>

        <p className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9a66b]">
          Administration
        </p>

        <button className="mb-1 block w-full rounded-xl px-4 py-3 text-left text-sm text-[#ddcfc0] hover:bg-white/10">
          Departments
        </button>

        <button className="block w-full rounded-xl px-4 py-3 text-left text-sm text-[#ddcfc0] hover:bg-white/10">
          Settings
        </button>
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm font-semibold">
            Admin Office
          </p>

          <p className="mt-1 text-xs text-[#ddcfc0]">
            Administrator
          </p>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;