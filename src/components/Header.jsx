function Header() {
  return (
    <header className="sticky top-0 z-30 hidden h-20 items-center justify-between border-b border-[#ded6ca] bg-[#f8f4ec]/95 px-4 backdrop-blur md:px-8 lg:flex">

      <div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#907d69]">
          Academic Administration
        </p>

        <h2 className="mt-1 text-xl font-bold text-[#292321]">
          Student Management
        </h2>

      </div>

      <div className="flex items-center gap-3">

        <div className="hidden rounded-xl border border-[#ddd3c5] bg-white px-4 py-2 text-sm text-[#81756b] xl:block">
          Academic Year 2025–26
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c9a66b] font-bold text-[#4b171b]">
          AD
        </div>

      </div>

    </header>
  );
}

export default Header;