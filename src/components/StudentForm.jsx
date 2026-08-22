import { useState } from "react";

const defaultForm = {
  studentId: "",
  name: "",
  email: "",
  phone: "",
  department: "Computer Engineering",
  year: "First Year",
  division: "A",
  cgpa: "",
  status: "Active",
};

function StudentForm({ onClose, onSave }) {
  const [form, setForm] = useState(defaultForm);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const student = {
      ...form,
      id: Date.now(),
      cgpa: Number(form.cgpa),
    };

    onSave(student);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211b18]/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[#fffdf9] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e8e0d5] p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9b333b]">
              Student Records
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#302925]">
              Add New Student
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-lg text-[#75685d] hover:bg-[#f3eee6]"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 p-6 md:grid-cols-2"
        >
          <Field
            label="Student ID"
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            placeholder="VESIT2024009"
            required
          />

          <Field
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Student full name"
            required
          />

          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@college.edu"
            required
          />

          <Field
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="9876543210"
            required
          />

          <SelectField
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            options={[
              "Computer Engineering",
              "Information Technology",
              "Electronics Engineering",
              "Mechanical Engineering",
              "Civil Engineering",
            ]}
          />

          <SelectField
            label="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            options={[
              "First Year",
              "Second Year",
              "Third Year",
              "Final Year",
            ]}
          />

          <Field
            label="Division"
            name="division"
            value={form.division}
            onChange={handleChange}
            placeholder="A"
            required
          />

          <Field
            label="CGPA"
            name="cgpa"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={form.cgpa}
            onChange={handleChange}
            placeholder="8.5"
            required
          />

          <div className="flex justify-end gap-3 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#d9cfc3] px-5 py-3 text-sm font-semibold text-[#62564d] hover:bg-[#f4eee5]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#4b171b] px-5 py-3 text-sm font-bold text-white hover:bg-[#641f25]"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  ...props
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-[#544940]">
        {label}
      </span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#dcd2c6] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#8d3b42] focus:ring-2 focus:ring-[#8d3b42]/10"
        {...props}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-semibold text-[#544940]">
        {label}
      </span>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#dcd2c6] bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#8d3b42]"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export default StudentForm;