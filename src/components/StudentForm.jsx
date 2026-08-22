import { useState } from "react";

function StudentForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Computer Engineering",
    year: "First Year",
    division: "A",
    cgpa: "",
    status: "Active",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newStudent = {
      id: Date.now(),
      studentId: `VESIT${new Date().getFullYear()}${String(
        Date.now()
      ).slice(-4)}`,
      ...formData,
      cgpa: Number(formData.cgpa),
    };

    onSave(newStudent);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-[#9b333b]">
              Records
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#302925]">
              Add New Student
            </h2>

            <p className="mt-1 text-sm text-[#84786d]">
              Enter the student's academic information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-xl text-[#6f6258] hover:bg-[#f5f1e8]"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@college.edu"
              required
            />

            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#554a42]">
                Department
              </label>

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>
                  Computer Engineering
                </option>

                <option>
                  Information Technology
                </option>

                <option>
                  Electronics Engineering
                </option>

                <option>
                  Mechanical Engineering
                </option>

                <option>
                  Civil Engineering
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#554a42]">
                Year
              </label>

              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
                <option>Final Year</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#554a42]">
                Division
              </label>

              <select
                name="division"
                value={formData.division}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>

            <Input
              label="CGPA"
              name="cgpa"
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={formData.cgpa}
              onChange={handleChange}
              placeholder="8.5"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#554a42]">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#eee7dc] pt-5 sm:flex-row sm:justify-end">
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
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  step,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#554a42]">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
      />
    </div>
  );
}

export default StudentForm;