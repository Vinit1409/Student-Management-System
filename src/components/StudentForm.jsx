import { useEffect, useState } from "react";

function StudentForm({
  onClose,
  onSave,
  student,
}) {
  const isEdit = Boolean(student);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Computer Engineering",
    year: "First Year",
    division: "A",
    cgpa: "",
    status: "Active",
  });

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name,
        email: student.email,
        phone: student.phone,
        department: student.department,
        year: student.year,
        division: student.division,
        cgpa: student.cgpa,
        status: student.status,
      });
    }
  }, [student]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter student name.");
      return;
    }

    if (!form.email.trim()) {
      alert("Please enter email.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter phone number.");
      return;
    }

    if (!form.cgpa) {
      alert("Please enter CGPA.");
      return;
    }

    if (isEdit) {
      onSave({
        ...student,
        ...form,
        cgpa: Number(form.cgpa),
      });
    } else {
      onSave({
        id: Date.now(),
        studentId: `VESIT${new Date().getFullYear()}${String(
          Date.now()
        ).slice(-4)}`,
        ...form,
        cgpa: Number(form.cgpa),
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">

      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-[#e8e0d5] p-6">

          <div>
            <p className="text-sm font-semibold text-[#9b333b]">
              Student Records
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#302925]">
              {isEdit ? "Edit Student" : "Add Student"}
            </h2>

            <p className="mt-1 text-sm text-[#8c7f74]">
              {isEdit
                ? "Update student information."
                : "Create a new student record."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-[#6f6258] hover:bg-[#f5f1e8]"
          >
            ×
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          <div className="grid gap-5 md:grid-cols-2">

            {/* NAME */}
            <FormField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />

            {/* EMAIL */}
            <FormField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@college.edu"
            />

            {/* PHONE */}
            <FormField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10 digit phone number"
            />

            {/* DEPARTMENT */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                Department
              </label>

              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>Computer Engineering</option>
                <option>Information Technology</option>
                <option>Electronics Engineering</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
              </select>
            </div>

            {/* YEAR */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                Year
              </label>

              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
                <option>Final Year</option>
              </select>
            </div>

            {/* DIVISION */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                Division
              </label>

              <select
                name="division"
                value={form.division}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>

            {/* CGPA */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                CGPA
              </label>

              <input
                type="number"
                name="cgpa"
                value={form.cgpa}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                placeholder="8.5"
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

          </div>

          {/* ACTIONS */}
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#ddd3c6] px-5 py-3 text-sm font-semibold text-[#62564d] hover:bg-[#f5f1e8]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#4b171b] px-5 py-3 text-sm font-bold text-white hover:bg-[#641f25]"
            >
              {isEdit
                ? "Save Changes"
                : "Add Student"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#51473f]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
      />
    </div>
  );
}

export default StudentForm;