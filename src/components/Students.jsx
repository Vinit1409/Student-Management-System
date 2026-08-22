import { useMemo, useState } from "react"
import { useStudents } from "../context/StudentContext"

function Students() {
  const {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudents()

  const [search, setSearch] = useState("")
  const [department, setDepartment] =
    useState("All Departments")
  const [status, setStatus] =
    useState("All Status")

  const [selectedStudent, setSelectedStudent] =
    useState(null)

  // =========================
  // DEPARTMENTS
  // =========================

  const departments = [
    "All Departments",
    ...new Set(
      students.map(
        (student) => student.department
      )
    ),
  ]

  // =========================
  // FILTER STUDENTS
  // =========================

  const filteredStudents = useMemo(() => {
    const query = search.toLowerCase().trim()

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
          .includes(query) ||
        student.phone
          .toLowerCase()
          .includes(query)

      const matchesDepartment =
        department === "All Departments" ||
        student.department === department

      const matchesStatus =
        status === "All Status" ||
        student.status === status

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      )
    })
  }, [
    students,
    search,
    department,
    status,
  ])

  // =========================
  // DELETE
  // =========================

  function handleDelete(student) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    )

    if (confirmed) {
      deleteStudent(student.id)
      setSelectedStudent(null)
    }
  }

  // =========================
  // ADD DEMO STUDENT
  // =========================

  function handleAddStudent() {
    const newStudent = {
      name: "New Student",
      studentId: `STU${String(
        students.length + 1
      ).padStart(3, "0")}`,
      email: "newstudent@gmail.com",
      phone: "9999999999",
      department: "Computer Science",
      year: "1st Year",
      division: "A",
      cgpa: 8.0,
      status: "Active",
    }

    addStudent(newStudent)
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

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
          onClick={handleAddStudent}
          className="rounded-xl bg-[#4b171b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#641f25]"
        >
          + Add Student
        </button>

      </section>

      {/* SUMMARY */}

      <section className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-5">
          <p className="text-sm text-[#85776b]">
            Total Students
          </p>

          <p className="mt-2 text-2xl font-bold text-[#4b171b]">
            {students.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-5">
          <p className="text-sm text-[#85776b]">
            Active Students
          </p>

          <p className="mt-2 text-2xl font-bold text-[#35643b]">
            {
              students.filter(
                (student) =>
                  student.status === "Active"
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-5">
          <p className="text-sm text-[#85776b]">
            Showing Results
          </p>

          <p className="mt-2 text-2xl font-bold text-[#705d48]">
            {filteredStudents.length}
          </p>
        </div>

      </section>

      {/* TABLE */}

      <section className="rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        {/* FILTERS */}

        <div className="border-b border-[#e8e0d5] p-5">

          <div className="grid gap-3 md:grid-cols-[1fr_220px_160px]">

            {/* SEARCH */}

            <div className="relative">

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search name, ID, email or phone..."
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none transition focus:border-[#8d3b42]"
              />

            </div>

            {/* DEPARTMENT */}

            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none"
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

            {/* STATUS */}

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none"
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

          <table className="w-full min-w-[1000px]">

            <thead className="bg-[#faf7f1]">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Year / Div
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

              {filteredStudents.map(
                (student) => (

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
                            {student.email}
                          </p>

                          <p className="text-xs text-[#aaa096]">
                            {student.phone}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ID */}

                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-[#f3e9dc] px-3 py-2 text-xs font-bold text-[#6d2529]">
                        {student.studentId}
                      </span>

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

                    <td className="px-6 py-4">

                      <span className="font-bold text-[#4b171b]">
                        {Number(student.cgpa).toFixed(1)}
                      </span>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <StatusBadge
                        status={student.status}
                      />
                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            setSelectedStudent(student)
                          }
                          className="rounded-lg border border-[#ddd3c6] px-3 py-2 text-xs font-semibold text-[#62564d] hover:bg-[#f4eee5]"
                        >
                          View
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(student)
                          }
                          className="rounded-lg border border-[#ead0cc] px-3 py-2 text-xs font-semibold text-[#8b4e47] hover:bg-[#f8e9e6]"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* NO RESULTS */}

        {filteredStudents.length === 0 && (

          <div className="p-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e9dc] text-xl">
              🔍
            </div>

            <p className="mt-4 font-semibold text-[#4c433d]">
              No students found
            </p>

            <p className="mt-1 text-sm text-[#92857a]">
              Try a different search or filter.
            </p>

          </div>

        )}

      </section>

      {/* DETAILS MODAL */}

      {selectedStudent && (

        <StudentDetails
          student={selectedStudent}
          onClose={() =>
            setSelectedStudent(null)
          }
          onDelete={() =>
            handleDelete(selectedStudent)
          }
        />

      )}

    </div>
  )
}

// =========================
// INITIALS
// =========================

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

// =========================
// STATUS BADGE
// =========================

function StatusBadge({ status }) {
  const active = status === "Active"

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
  )
}

// =========================
// STUDENT DETAILS
// =========================

function StudentDetails({
  student,
  onClose,
  onDelete,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-[#e8e0d5] p-6">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9b333b]">
              Student Profile
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#332c28]">
              {student.name}
            </h2>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4eee5] text-[#62564d]"
          >
            ✕
          </button>

        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">

          <Detail
            label="Student ID"
            value={student.studentId}
          />

          <Detail
            label="Status"
            value={student.status}
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
            value={Number(student.cgpa).toFixed(1)}
          />

        </div>

        <div className="flex justify-end gap-3 border-t border-[#e8e0d5] p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-[#ddd3c6] px-4 py-2.5 text-sm font-semibold text-[#62564d]"
          >
            Close
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-[#8b4e47] px-4 py-2.5 text-sm font-bold text-white"
          >
            Delete Student
          </button>

        </div>

      </div>

    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl bg-[#faf7f1] p-4">

      <p className="text-xs font-semibold uppercase tracking-wide text-[#918478]">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-[#403731]">
        {value}
      </p>

    </div>
  )
}

export default Students