import { useMemo, useState } from "react";
import useTimetable from "../hooks/useTimetable";

const departments = [
  "Computer Engineering",
  "Information Technology",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Artificial Intelligence",
];

const years = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
];

const divisions = ["A", "B", "C"];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const emptyForm = {
  department: "Computer Engineering",
  year: "1st Year",
  division: "A",
  day: "Monday",
  startTime: "08:30",
  endTime: "09:30",
  subject: "",
  faculty: "",
  room: "",
};

function Timetable() {
  const {
    timetable,
    addLecture,
    updateLecture,
    deleteLecture,
  } = useTimetable();

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(emptyForm);

  const [filter, setFilter] = useState({
    department: "Computer Engineering",
    year: "1st Year",
    division: "A",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function openCreateForm() {
    setEditingId(null);

    setForm({
      ...emptyForm,
      department: filter.department,
      year: filter.year,
      division: filter.division,
    });

    setShowForm(true);
  }

  function openEditForm(lecture) {
    setEditingId(lecture.id);
    setForm(lecture);
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.subject ||
      !form.faculty ||
      !form.room
    ) {
      alert("Please fill all lecture details.");
      return;
    }

    if (editingId) {
      updateLecture(form);
    } else {
      addLecture(form);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lecture?"
    );

    if (confirmDelete) {
      deleteLecture(id);
    }
  }

  const filteredTimetable = useMemo(() => {
    return timetable
      .filter(
        (lecture) =>
          lecture.department ===
            filter.department &&
          lecture.year === filter.year &&
          lecture.division === filter.division
      )
      .sort((a, b) => {
        const dayOrder = days.indexOf(a.day) -
          days.indexOf(b.day);

        if (dayOrder !== 0) {
          return dayOrder;
        }

        return a.startTime.localeCompare(
          b.startTime
        );
      });
  }, [timetable, filter]);

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-sm font-semibold text-[#9b333b]">
            Academics
          </p>

          <h1 className="mt-1 text-3xl font-bold text-[#302925]">
            Timetable
          </h1>

          <p className="mt-2 text-sm text-[#84786d]">
            Create and manage department-wise
            and division-wise class schedules.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-xl bg-[#6d2529] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#571d21]"
        >
          + Create Timetable
        </button>

      </section>

      {/* FILTER */}

      <section className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm">

        <h2 className="text-lg font-bold text-[#332c28]">
          Select Class
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">

          <SelectField
            label="Department"
            value={filter.department}
            onChange={(e) =>
              setFilter((current) => ({
                ...current,
                department: e.target.value,
              }))
            }
            options={departments}
          />

          <SelectField
            label="Year"
            value={filter.year}
            onChange={(e) =>
              setFilter((current) => ({
                ...current,
                year: e.target.value,
              }))
            }
            options={years}
          />

          <SelectField
            label="Division"
            value={filter.division}
            onChange={(e) =>
              setFilter((current) => ({
                ...current,
                division: e.target.value,
              }))
            }
            options={divisions}
          />

        </div>

      </section>

      {/* SELECTED CLASS */}

      <div className="rounded-2xl border border-[#ead9c7] bg-[#f8efe5] p-5">

        <p className="text-xs font-semibold uppercase tracking-wider text-[#9a8d80]">
          Current Timetable
        </p>

        <h2 className="mt-1 text-xl font-bold text-[#4b171b]">
          {filter.department}
        </h2>

        <p className="mt-1 text-sm text-[#6f6258]">
          {filter.year} • Division {filter.division}
        </p>

      </div>

      {/* TIMETABLE */}

      {filteredTimetable.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-[#d7cbbd] bg-white p-10 text-center">

          <div className="text-4xl">
            📅
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#332c28]">
            No timetable created
          </h2>

          <p className="mt-2 text-sm text-[#84786d]">
            Create a timetable for this
            department, year and division.
          </p>

          <button
            onClick={openCreateForm}
            className="mt-5 rounded-xl bg-[#6d2529] px-5 py-2.5 text-sm font-semibold text-white"
          >
            + Create First Lecture
          </button>

        </div>

      ) : (

        <section className="space-y-5">

          {days.map((day) => {

            const dayLectures =
              filteredTimetable.filter(
                (lecture) =>
                  lecture.day === day
              );

            if (dayLectures.length === 0) {
              return null;
            }

            return (
              <div
                key={day}
                className="overflow-hidden rounded-2xl border border-[#ded6ca] bg-white shadow-sm"
              >

                <div className="border-b border-[#eee7dc] bg-[#faf6f0] px-5 py-4">
                  <h2 className="font-bold text-[#4b171b]">
                    {day}
                  </h2>
                </div>

                <div className="divide-y divide-[#eee7dc]">

                  {dayLectures.map(
                    (lecture) => (

                      <div
                        key={lecture.id}
                        className="grid gap-4 px-5 py-5 md:grid-cols-[140px_1fr_auto] md:items-center"
                      >

                        {/* TIME */}

                        <div>
                          <p className="text-sm font-bold text-[#6d2529]">
                            {lecture.startTime}
                          </p>

                          <p className="text-xs text-[#9a8d80]">
                            to {lecture.endTime}
                          </p>
                        </div>

                        {/* DETAILS */}

                        <div>

                          <h3 className="font-bold text-[#332c28]">
                            {lecture.subject}
                          </h3>

                          <p className="mt-1 text-sm text-[#71665d]">
                            👨‍🏫 {lecture.faculty}
                          </p>

                          <p className="mt-1 text-xs text-[#9a8d80]">
                            Room: {lecture.room}
                          </p>

                        </div>

                        {/* ACTIONS */}

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              openEditForm(
                                lecture
                              )
                            }
                            className="rounded-lg border border-[#ddd3c6] px-3 py-2 text-xs font-semibold text-[#62564d] hover:bg-[#f5eee5]"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                lecture.id
                              )
                            }
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>
            );
          })}

        </section>

      )}

      {/* CREATE / EDIT MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-[#332c28]">
                  {editingId
                    ? "Edit Lecture"
                    : "Create Lecture"}
                </h2>

                <p className="mt-1 text-sm text-[#84786d]">
                  Add lecture details to the timetable.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="text-xl text-[#84786d]"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >

              <div className="grid gap-4 md:grid-cols-3">

                <SelectField
                  label="Department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  options={departments}
                />

                <SelectField
                  label="Year"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  options={years}
                />

                <SelectField
                  label="Division"
                  name="division"
                  value={form.division}
                  onChange={handleChange}
                  options={divisions}
                />

              </div>

              <div className="grid gap-4 md:grid-cols-3">

                <SelectField
                  label="Day"
                  name="day"
                  value={form.day}
                  onChange={handleChange}
                  options={days}
                />

                <InputField
                  label="Start Time"
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                />

                <InputField
                  label="End Time"
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                />

              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <InputField
                  label="Subject"
                  name="subject"
                  placeholder="e.g. Database Management"
                  value={form.subject}
                  onChange={handleChange}
                />

                <InputField
                  label="Faculty"
                  name="faculty"
                  placeholder="e.g. Prof. Sharma"
                  value={form.faculty}
                  onChange={handleChange}
                />

              </div>

              <InputField
                label="Room / Lab"
                name="room"
                placeholder="e.g. Room 301 / Lab 2"
                value={form.room}
                onChange={handleChange}
              />

              <div className="flex justify-end gap-3 border-t border-[#eee7dc] pt-5">

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="rounded-xl border border-[#ddd3c6] px-5 py-2.5 text-sm font-semibold text-[#62564d]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#6d2529] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {editingId
                    ? "Update Lecture"
                    : "Add Lecture"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================
   SELECT FIELD
========================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#51473f]">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#dcd2c5] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#9b333b]"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}


/* =========================
   INPUT FIELD
========================= */

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-[#51473f]">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#dcd2c5] px-4 py-2.5 text-sm outline-none focus:border-[#9b333b]"
      />
    </div>
  );
}

export default Timetable;