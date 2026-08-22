import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function Students({ students, onAdd }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("All Departments");
  const [status, setStatus] =
    useState("All Status");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  // =========================
  // DEPARTMENT LIST
  // =========================

  const departments = [
    "All Departments",
    ...new Set(
      students.map(
        (student) => student.department
      )
    ),
  ];

  // =========================
  // FILTER STUDENTS
  // =========================

  const filteredStudents = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    return students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(query) ||
        student.studentId
          .toLowerCase()
          .includes(query) ||
        student.email
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "All Departments" ||
        student.department === department;

      const matchesStatus =
        status === "All Status" ||
        student.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    students,
    search,
    department,
    status,
  ]);

  return (
    <div className="space-y-6">

      {/* ================================= */}
      {/* PAGE HEADER */}
      {/* ================================= */}

      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

        <div>

          {/* BACK TO DASHBOARD */}
          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#6d2529] transition hover:underline"
          >
            ← Dashboard
          </Link>

          <p className="text-sm font-semibold text-[#9b333b]">
            Records
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#302925]">
            Student Directory
          </h1>

          <p className="mt-2 text-sm text-[#84786d]">
            Manage all registered student records.
          </p>

        </div>

        {/* ADD STUDENT */}
        <button
          onClick={onAdd}
          className="rounded-xl bg-[#4b171b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#641f25]"
        >
          + Add Student
        </button>

      </section>

      {/* ================================= */}
      {/* STUDENT TABLE CARD */}
      {/* ================================= */}

      <section className="rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        {/* ================================= */}
        {/* FILTERS */}
        {/* ================================= */}

        <div className="border-b border-[#e8e0d5] p-5">

          <div className="grid gap-3 md:grid-cols-[1fr_220px_160px]">

            {/* SEARCH */}
            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#918478]">
                SEARCH
              </span>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Name, student ID or email..."
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] py-3 pl-20 pr-4 text-sm outline-none transition focus:border-[#8d3b42] focus:ring-2 focus:ring-[#8d3b42]/10"
              />

            </div>

            {/* DEPARTMENT FILTER */}
            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none transition focus:border-[#8d3b42] focus:ring-2 focus:ring-[#8d3b42]/10"
            >
              {departments.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {/* STATUS FILTER */}
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none transition focus:border-[#8d3b42] focus:ring-2 focus:ring-[#8d3b42]/10"
            >
              <option value="All Status">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>

        {/* ================================= */}
        {/* TABLE */}
        {/* ================================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1050px]">

            {/* TABLE HEADER */}
            <thead className="bg-[#faf7f1]">

              <tr>

                {/* STUDENT */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Student
                </th>

                {/* STUDENT ID */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Student ID
                </th>

                {/* DEPARTMENT */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Department
                </th>

                {/* YEAR */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Year
                </th>

                {/* CGPA */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  CGPA
                </th>

                {/* STATUS */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Status
                </th>

                {/* ACTION */}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Action
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-[#eee7dc]">

              {filteredStudents.map(
                (student) => (
                  <tr
                    key={student.id}
                    className="transition hover:bg-[#fcfaf6]"
                  >

                    {/* ========================= */}
                    {/* STUDENT */}
                    {/* ========================= */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        {/* INITIALS */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ead8c5] text-sm font-bold text-[#6d2529]">
                          {getInitials(
                            student.name
                          )}
                        </div>

                        <div>

                          <p className="font-semibold text-[#332c28]">
                            {student.name}
                          </p>

                          <p className="text-xs text-[#95887c]">
                            {student.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ========================= */}
                    {/* STUDENT ID */}
                    {/* ========================= */}

                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-[#f5eee5] px-3 py-2 text-xs font-bold tracking-wide text-[#6d2529]">
                        {student.studentId}
                      </span>

                    </td>

                    {/* ========================= */}
                    {/* DEPARTMENT */}
                    {/* ========================= */}

                    <td className="px-6 py-4 text-sm text-[#51473f]">
                      {student.department}
                    </td>

                    {/* ========================= */}
                    {/* YEAR */}
                    {/* ========================= */}

                    <td className="px-6 py-4 text-sm text-[#665a50]">
                      {student.year}
                      <span className="text-[#9a8d80]">
                        {" "}
                        / {student.division}
                      </span>
                    </td>

                    {/* ========================= */}
                    {/* CGPA */}
                    {/* ========================= */}

                    <td className="px-6 py-4 font-bold text-[#4b171b]">
                      {Number(
                        student.cgpa
                      ).toFixed(1)}
                    </td>

                    {/* ========================= */}
                    {/* STATUS */}
                    {/* ========================= */}

                    <td className="px-6 py-4">

                      <StatusBadge
                        status={
                          student.status
                        }
                      />

                    </td>

                    {/* ========================= */}
                    {/* ACTION */}
                    {/* ========================= */}

                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          setSelectedStudent(
                            student
                          )
                        }
                        className="rounded-lg border border-[#ddd3c6] px-3 py-2 text-xs font-semibold text-[#62564d] transition hover:bg-[#f4eee5] hover:text-[#4b171b]"
                      >
                        View
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* ================================= */}
        {/* NO RESULTS */}
        {/* ================================= */}

        {filteredStudents.length === 0 && (
          <div className="p-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5eee5] text-xl text-[#6d2529]">
              ?
            </div>

            <p className="mt-4 font-semibold text-[#4c433d]">
              No students found
            </p>

            <p className="mt-1 text-sm text-[#92857a]">
              Try a different search term or
              filter.
            </p>

          </div>
        )}

      </section>

      {/* ================================= */}
      {/* STUDENT DETAILS MODAL */}
      {/* ================================= */}

      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() =>
            setSelectedStudent(null)
          }
        />
      )}

    </div>
  );
}


/* ================================= */
/* GET INITIALS */
/* ================================= */

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


/* ================================= */
/* STATUS BADGE */
/* ================================= */

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-[#e8f1e7] text-[#35643b]"
          : "bg-[#f4e4e1] text-[#8b4e47]"
      }`}
    >
      {status}
    </span>
  );
}


/* ================================= */
/* STUDENT DETAILS MODAL */
/* ================================= */

function StudentDetailsModal({
  student,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">

      <div className="my-8 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        {/* MODAL HEADER */}
        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm font-semibold text-[#9b333b]">
              Student Details
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#302925]">
              {student.name}
            </h2>

            <p className="mt-1 text-sm text-[#918478]">
              {student.studentId}
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#6f6258] transition hover:bg-[#f5f1e8]"
          >
            ×
          </button>

        </div>

        {/* DETAILS */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <Detail
            label="Student ID"
            value={student.studentId}
          />

          <Detail
            label="Email"
            value={student.email}
          />

          <Detail
            label="Phone"
            value={student.phone}
          />

          <Detail
            label="Department"
            value={student.department}
          />

          <Detail
            label="Year"
            value={`${student.year} / ${student.division}`}
          />

          <Detail
            label="CGPA"
            value={Number(
              student.cgpa
            ).toFixed(1)}
          />

          <Detail
            label="Status"
            value={student.status}
          />

        </div>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#4b171b] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#641f25]"
        >
          Close
        </button>

      </div>

    </div>
  );
}


/* ================================= */
/* DETAIL ITEM */
/* ================================= */

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-[#faf7f1] p-4">

      <p className="text-xs font-semibold uppercase tracking-wide text-[#918478]">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-[#332c28]">
        {value}
      </p>

    </div>
  );
}

export default Students;