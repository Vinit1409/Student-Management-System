import { useMemo, useState } from "react";

function Students({ students, onAdd }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("All Departments");
  const [status, setStatus] =
    useState("All Status");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const departments = [
    "All Departments",
    ...new Set(
      students.map((student) => student.department)
    ),
  ];

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase().trim();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.studentId.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query);

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
  }, [students, search, department, status]);

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
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

        <button
          onClick={onAdd}
          className="rounded-xl bg-[#4b171b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#641f25]"
        >
          + Add Student
        </button>
      </section>

      {/* TABLE CARD */}
      <section className="rounded-2xl border border-[#ded6ca] bg-white shadow-sm">
        {/* FILTERS */}
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
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] py-3 pl-20 pr-4 text-sm outline-none focus:border-[#8d3b42]"
              />
            </div>

            {/* DEPARTMENT */}
            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
            >
              {departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* STATUS */}
            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
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

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-[#faf7f1]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Year
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  CGPA
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eee7dc]">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-[#fcfaf6]"
                >
                  {/* STUDENT */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ead8c5] text-sm font-bold text-[#6d2529]">
                        {getInitials(student.name)}
                      </div>

                      <div>
                        <p className="font-semibold text-[#332c28]">
                          {student.name}
                        </p>

                        <p className="text-xs text-[#95887c]">
                          {student.studentId}
                        </p>

                        <p className="text-xs text-[#aaa096]">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DEPARTMENT */}
                  <td className="px-6 py-4 text-sm text-[#51473f]">
                    {student.department}
                  </td>

                  {/* YEAR */}
                  <td className="px-6 py-4 text-sm text-[#665a50]">
                    {student.year} / {student.division}
                  </td>

                  {/* CGPA */}
                  <td className="px-6 py-4 font-bold text-[#4b171b]">
                    {Number(student.cgpa).toFixed(1)}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <StatusBadge
                      status={student.status}
                    />
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setSelectedStudent(student)
                      }
                      className="rounded-lg border border-[#ddd3c6] px-3 py-2 text-xs font-semibold text-[#62564d] transition hover:bg-[#f4eee5]"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NO RESULTS */}
        {filteredStudents.length === 0 && (
          <div className="p-12 text-center">
            <p className="font-semibold text-[#4c433d]">
              No students found
            </p>

            <p className="mt-1 text-sm text-[#92857a]">
              Try a different search term.
            </p>
          </div>
        )}
      </section>

      {/* VIEW STUDENT MODAL */}
      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

/* INITIALS */
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* STATUS */
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

/* DETAILS MODAL */
function StudentDetailsModal({ student, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-[#9b333b]">
              Student Details
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#302925]">
              {student.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xl text-[#6f6258] hover:bg-[#f5f1e8]"
          >
            ×
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Detail label="Student ID" value={student.studentId} />
          <Detail label="Email" value={student.email} />
          <Detail label="Phone" value={student.phone} />
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
            value={Number(student.cgpa).toFixed(1)}
          />
          <Detail label="Status" value={student.status} />
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#4b171b] px-4 py-3 text-sm font-bold text-white hover:bg-[#641f25]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

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