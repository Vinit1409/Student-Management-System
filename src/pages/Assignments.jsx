function Assignments() {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-8">
      <p className="text-sm font-semibold text-[#9b333b]">
        Academics
      </p>

      <h1 className="mt-1 text-3xl font-bold text-[#302925]">
        Assignments
      </h1>

      <p className="mt-2 text-sm text-[#84786d]">
        Manage assignments, due dates and submissions.
      </p>

      <div className="mt-8 rounded-2xl border-2 border-dashed border-[#d8cbbb] bg-[#fcfaf6] p-10 text-center">
        <div className="text-4xl">📤</div>

        <h2 className="mt-4 font-bold text-[#332c28]">
          Assignment Upload
        </h2>

        <p className="mt-2 text-sm text-[#918478]">
          Drag and drop assignment files here
          or choose a file.
        </p>

        <button className="mt-5 rounded-xl bg-[#4b171b] px-5 py-3 text-sm font-bold text-white">
          Choose File
        </button>
      </div>
    </div>
  );
}

export default Assignments;