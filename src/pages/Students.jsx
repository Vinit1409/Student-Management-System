import { useMemo, useState } from "react";

function Students({ students, onAdd, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [status, setStatus] = useState("All Status");

  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const departments = [
    "All Departments",
    ...new Set(students.map((student) => student.department)),
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

  function handleDelete(student) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (confirmDelete) {
      onDelete(student.id);
    }
  }

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
          <table className="w-full min-w-[1050px]">

            {/* HEADER */}
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
                  Year
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  CGPA
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Actions
                </th>

              </tr>
            </thead>

            {/* BODY */}
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
                          {student.email}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* STUDENT ID */}
                  <td className="px-6 py-4">
                    <span className="rounded-lg bg-[#f5eee4] px-3 py-1.5 text-xs font-semibold text-[#5e5147]">
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
                  <td className="px-6 py-4 font-bold text-[#4b171b]">
                    {Number(student.cgpa).toFixed(1)}
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <StatusBadge status={student.status} />
                  </td>

                  {/* ACTION ICONS */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">

                      {/* VIEW */}
                      <button
                        onClick={() =>
                          setViewingStudent(student)
                        }
                        title="View Student"
                        aria-label="View Student"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ddd3c6] bg-white text-[#665a50] transition hover:border-[#c9a66b] hover:bg-[#f8f0e3] hover:text-[#4b171b]"
                      >
                        {/* Eye */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12s3.5-6 9.75-6 9.75 6 9.75 6-3.5 6-9.75 6-9.75-6-9.75-6Z"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="2.5"
                          />
                        </svg>
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          setEditingStudent(student)
                        }
                        title="Edit Student"
                        aria-label="Edit Student"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ddd3c6] bg-white text-[#665a50] transition hover:border-[#8d3b42] hover:bg-[#f6e9e6] hover:text-[#8d3b42]"
                      >
                        {/* Pencil */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20h9"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
                          />
                        </svg>
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(student)
                        }
                        title="Delete Student"
                        aria-label="Delete Student"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ead2cf] bg-white text-[#a05b54] transition hover:border-[#b65d57] hover:bg-[#f8e5e2] hover:text-[#8b302b]"
                      >
                        {/* Trash */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 6h18"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 6V4h8v2"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 6l-1 14H6L5 6"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 11v5M14 11v5"
                          />
                        </svg>
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* NO RESULTS */}
        {filteredStudents.length === 0 && (
          <div className="p-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4eee5] text-[#8d3b42]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />
                <path
                  strokeLinecap="round"
                  d="m20 20-4-4"
                />
              </svg>
            </div>

            <p className="mt-4 font-semibold text-[#4c433d]">
              No students found
            </p>

            <p className="mt-1 text-sm text-[#92857a]">
              Try a different search term or filter.
            </p>

          </div>
        )}

      </section>

      {/* VIEW MODAL */}
      {viewingStudent && (
        <StudentDetailsModal
          student={viewingStudent}
          onClose={() =>
            setViewingStudent(null)
          }
        />
      )}

      {/* EDIT MODAL */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() =>
            setEditingStudent(null)
          }
          onSave={(updatedStudent) => {
            onUpdate(updatedStudent);
            setEditingStudent(null);
          }}
        />
      )}

    </div>
  );
}


/* =====================================================
   INITIALS
===================================================== */

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}


/* =====================================================
   STATUS BADGE
===================================================== */

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


/* =====================================================
   VIEW STUDENT MODAL
===================================================== */

function StudentDetailsModal({
  student,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#e8e0d5] p-6">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#9b333b]">
              Student Profile
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#302925]">
              {student.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#76695e] hover:bg-[#f5eee5]"
          >
            ×
          </button>

        </div>

        {/* CONTENT */}
        <div className="grid gap-5 p-6 sm:grid-cols-2">

          <InfoItem
            label="Student ID"
            value={student.studentId}
          />

          <InfoItem
            label="Email"
            value={student.email}
          />

          <InfoItem
            label="Phone"
            value={student.phone}
          />

          <InfoItem
            label="Department"
            value={student.department}
          />

          <InfoItem
            label="Year"
            value={`${student.year} / Division ${student.division}`}
          />

          <InfoItem
            label="CGPA"
            value={Number(student.cgpa).toFixed(1)}
          />

          <InfoItem
            label="Status"
            value={student.status}
          />

        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t border-[#e8e0d5] p-5">

          <button
            onClick={onClose}
            className="rounded-xl bg-[#4b171b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#641f25]"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}


/* =====================================================
   INFO ITEM
===================================================== */

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl bg-[#faf7f1] p-4">

      <p className="text-xs font-semibold uppercase tracking-wider text-[#95887c]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#332c28]">
        {value}
      </p>

    </div>
  );
}


/* =====================================================
   EDIT STUDENT MODAL
===================================================== */

function EditStudentModal({
  student,
  onClose,
  onSave,
}) {
  const [form, setForm] = useState({
    ...student,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      ...form,
      cgpa: Number(form.cgpa),
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm">

      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#e8e0d5] p-6">

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#9b333b]">
              Student Management
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#302925]">
              Edit Student
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#76695e] hover:bg-[#f5eee5]"
          >
            ×
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          <div className="grid gap-4 sm:grid-cols-2">

            <FormField
              label="Student Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <FormField
              label="Student ID"
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
            />

            <FormField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <FormField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <FormField
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />

            <FormField
              label="Year"
              name="year"
              value={form.year}
              onChange={handleChange}
            />

            <FormField
              label="Division"
              name="division"
              value={form.division}
              onChange={handleChange}
            />

            <FormField
              label="CGPA"
              name="cgpa"
              type="number"
              step="0.1"
              value={form.cgpa}
              onChange={handleChange}
            />

          </div>

          {/* STATUS */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-[#51473f]">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 border-t border-[#e8e0d5] pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#ddd3c6] px-5 py-2.5 text-sm font-semibold text-[#62564d] hover:bg-[#f5eee5]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#4b171b] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#641f25]"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}


/* =====================================================
   FORM FIELD
===================================================== */

function FormField({
  label,
  name,
  type = "text",
  step,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#51473f]">
        {label}
      </label>

      <input
        name={name}
        type={type}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
      />
    </div>
  );
}

export default Students;