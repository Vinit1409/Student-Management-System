function StudentProfile({ students = [] }) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-8">
      <h1 className="text-3xl font-bold text-[#302925]">
        Student Profile
      </h1>

      <p className="mt-2 text-sm text-[#84786d]">
        Detailed student information will appear here.
      </p>

      <p className="mt-6 text-sm text-[#665a50]">
        Total students: {students.length}
      </p>
    </div>
  );
}

export default StudentProfile;