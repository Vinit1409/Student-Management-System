import { useMemo, useState } from "react";
import { initialAttendance } from "../data/attendance";

function Attendance() {
  const [records] = useState(initialAttendance);

  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("All Departments");

  const [status, setStatus] =
    useState("All Status");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  // =========================
  // OVERALL ATTENDANCE
  // =========================

  const totalClasses = records.reduce(
    (sum, student) =>
      sum + student.totalClasses,
    0
  );

  const totalPresent = records.reduce(
    (sum, student) =>
      sum + student.present,
    0
  );

  const totalAbsent = records.reduce(
    (sum, student) =>
      sum + student.absent,
    0
  );

  const overallPercentage =
    totalClasses > 0
      ? ((totalPresent / totalClasses) * 100).toFixed(1)
      : 0;

  const goodStudents = records.filter(
    (student) =>
      student.percentage >= 85
  ).length;

  const warningStudents = records.filter(
    (student) =>
      student.percentage >= 75 &&
      student.percentage < 85
  ).length;

  const criticalStudents = records.filter(
    (student) =>
      student.percentage < 75
  ).length;

  // =========================
  // DEPARTMENTS
  // =========================

  const departments = [
    "All Departments",
    ...new Set(
      records.map(
        (student) => student.department
      )
    ),
  ];

  // =========================
  // FILTER
  // =========================

  const filteredStudents = useMemo(() => {
    const query = search
      .toLowerCase()
      .trim();

    return records.filter((student) => {
      const matchesSearch =
        student.student
          .toLowerCase()
          .includes(query) ||
        student.studentId
          .toLowerCase()
          .includes(query) ||
        student.department
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
    records,
    search,
    department,
    status,
  ]);

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <section>
        <p className="text-sm font-semibold text-[#9b333b]">
          Academics
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Attendance Management
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Monitor student-wise attendance,
          presence and absence records.
        </p>
      </section>

      {/* ========================= */}
      {/* SUMMARY */}
      {/* ========================= */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <AttendanceCard
          title="Overall Attendance"
          value={`${overallPercentage}%`}
          description="Across all students"
          icon="%"
          iconClass="bg-[#f1e7cf] text-[#856526]"
        />

        <AttendanceCard
          title="Good Attendance"
          value={goodStudents}
          description="85% or above"
          icon="✓"
          iconClass="bg-[#e5efe4] text-[#35643b]"
        />

        <AttendanceCard
          title="Warning"
          value={warningStudents}
          description="75% – 84%"
          icon="!"
          iconClass="bg-[#f4e8cc] text-[#806323]"
        />

        <AttendanceCard
          title="Critical"
          value={criticalStudents}
          description="Below 75%"
          icon="!"
          iconClass="bg-[#f4e4e1] text-[#8b4e47]"
        />

      </section>

      {/* ========================= */}
      {/* ATTENDANCE SUMMARY */}
      {/* ========================= */}

      <section className="grid gap-4 md:grid-cols-3">

        <SummaryBox
          title="Total Classes"
          value={totalClasses}
          description="Classes conducted"
        />

        <SummaryBox
          title="Total Present"
          value={totalPresent}
          description="Present records"
        />

        <SummaryBox
          title="Total Absent"
          value={totalAbsent}
          description="Absent records"
        />

      </section>

      {/* ========================= */}
      {/* TABLE CARD */}
      {/* ========================= */}

      <section className="overflow-hidden rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        {/* FILTERS */}

        <div className="border-b border-[#e8e0d5] p-5">

          <div className="grid gap-3 md:grid-cols-[1fr_250px_180px]">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search student, ID or department..."
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none transition focus:border-[#8d3b42]"
            />

            <select
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none focus:border-[#8d3b42]"
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

              <option value="Excellent">
                Excellent
              </option>

              <option value="Good">
                Good
              </option>

              <option value="Warning">
                Warning
              </option>

              <option value="Critical">
                Critical
              </option>
            </select>

          </div>

        </div>

        {/* ========================= */}
        {/* DESKTOP TABLE */}
        {/* ========================= */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full min-w-[1050px]">

            <thead className="bg-[#faf7f1]">

              <tr>

                <th className={thClass}>
                  Student
                </th>

                <th className={thClass}>
                  Student ID
                </th>

                <th className={thClass}>
                  Department
                </th>

                <th className={thClass}>
                  Total Classes
                </th>

                <th className={thClass}>
                  Present
                </th>

                <th className={thClass}>
                  Absent
                </th>

                <th className={thClass}>
                  Attendance
                </th>

                <th className={thClass}>
                  Status
                </th>

                <th className={thClass}>
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
                          {getInitials(
                            student.student
                          )}
                        </div>

                        <div>

                          <p className="font-semibold text-[#332c28]">
                            {student.student}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* ID */}

                    <td className="px-6 py-4 text-sm font-semibold text-[#51473f]">
                      {student.studentId}
                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-6 py-4 text-sm text-[#665a50]">
                      {student.department}
                    </td>

                    {/* TOTAL */}

                    <td className="px-6 py-4 text-sm font-semibold text-[#51473f]">
                      {student.totalClasses}
                    </td>

                    {/* PRESENT */}

                    <td className="px-6 py-4 text-sm font-bold text-[#35643b]">
                      {student.present}
                    </td>

                    {/* ABSENT */}

                    <td className="px-6 py-4 text-sm font-bold text-[#8b4e47]">
                      {student.absent}
                    </td>

                    {/* ATTENDANCE */}

                    <td className="px-6 py-4">

                      <div className="min-w-[130px]">

                        <div className="mb-1 flex justify-between">

                          <span className="text-sm font-bold text-[#4b171b]">
                            {student.percentage}%
                          </span>

                        </div>

                        <div className="h-2 rounded-full bg-[#eee7dc]">

                          <div
                            className={`h-2 rounded-full ${
                              student.percentage >= 85
                                ? "bg-[#5d8a61]"
                                : student.percentage >= 75
                                ? "bg-[#c49b4d]"
                                : "bg-[#a45d55]"
                            }`}
                            style={{
                              width: `${Math.min(
                                student.percentage,
                                100
                              )}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">

                      <AttendanceBadge
                        status={
                          student.status
                        }
                      />

                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          setSelectedStudent(
                            student
                          )
                        }
                        title="View Attendance Details"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ddd3c6] text-[#62564d] transition hover:bg-[#f4eee5] hover:text-[#4b171b]"
                      >
                        👁
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* ========================= */}
        {/* MOBILE CARDS */}
        {/* ========================= */}

        <div className="divide-y divide-[#eee7dc] md:hidden">

          {filteredStudents.map(
            (student) => (

              <div
                key={student.id}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ead8c5] text-sm font-bold text-[#6d2529]">
                      {getInitials(
                        student.student
                      )}
                    </div>

                    <div>

                      <p className="font-semibold text-[#332c28]">
                        {student.student}
                      </p>

                      <p className="text-xs text-[#95887c]">
                        {student.studentId}
                      </p>

                    </div>

                  </div>

                  <AttendanceBadge
                    status={
                      student.status
                    }
                  />

                </div>

                {/* PROGRESS */}

                <div className="mt-5">

                  <div className="mb-2 flex justify-between">

                    <span className="text-sm font-medium text-[#85776b]">
                      Attendance
                    </span>

                    <span className="font-bold text-[#4b171b]">
                      {student.percentage}%
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-[#eee7dc]">

                    <div
                      className={`h-2 rounded-full ${
                        student.percentage >= 85
                          ? "bg-[#5d8a61]"
                          : student.percentage >= 75
                          ? "bg-[#c49b4d]"
                          : "bg-[#a45d55]"
                      }`}
                      style={{
                        width: `${Math.min(
                          student.percentage,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* INFO */}

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <MobileInfo
                    label="Department"
                    value={
                      student.department
                    }
                  />

                  <MobileInfo
                    label="Total Classes"
                    value={
                      student.totalClasses
                    }
                  />

                  <MobileInfo
                    label="Present"
                    value={
                      student.present
                    }
                  />

                  <MobileInfo
                    label="Absent"
                    value={
                      student.absent
                    }
                  />

                </div>

                <button
                  onClick={() =>
                    setSelectedStudent(
                      student
                    )
                  }
                  className="mt-4 w-full rounded-xl border border-[#ddd3c6] py-2.5 text-sm font-semibold text-[#4b171b] transition hover:bg-[#f4eee5]"
                >
                  View Attendance Details
                </button>

              </div>

            )
          )}

        </div>

        {/* NO RESULTS */}

        {filteredStudents.length === 0 && (
          <div className="p-12 text-center">

            <p className="font-semibold text-[#4c433d]">
              No students found
            </p>

            <p className="mt-1 text-sm text-[#92857a]">
              Try another search or filter.
            </p>

          </div>
        )}

      </section>

      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}

      {selectedStudent && (
        <AttendanceModal
          student={selectedStudent}
          onClose={() =>
            setSelectedStudent(null)
          }
        />
      )}

    </div>
  );
}

/* ========================= */
/* ATTENDANCE CARD */
/* ========================= */

function AttendanceCard({
  title,
  value,
  description,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-[#85776b]">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-[#292321]">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs text-[#9a8d80]">
        {description}
      </p>

    </div>
  );
}

/* ========================= */
/* SUMMARY BOX */
/* ========================= */

function SummaryBox({
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5">

      <p className="text-sm text-[#85776b]">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-[#4b171b]">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#9a8d80]">
        {description}
      </p>

    </div>
  );
}

/* ========================= */
/* BADGE */
/* ========================= */

function AttendanceBadge({ status }) {
  const styles = {
    Excellent:
      "bg-[#e5efe4] text-[#35643b]",

    Good:
      "bg-[#e8f1e7] text-[#35643b]",

    Warning:
      "bg-[#f4e8cc] text-[#806323]",

    Critical:
      "bg-[#f4e4e1] text-[#8b4e47]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ========================= */
/* MOBILE INFO */
/* ========================= */

function MobileInfo({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-[#faf7f1] p-3">

      <p className="text-[11px] uppercase tracking-wide text-[#918478]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#4b171b]">
        {value}
      </p>

    </div>
  );
}

/* ========================= */
/* MODAL */
/* ========================= */

function AttendanceModal({
  student,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-[#eee7dc] p-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9b333b]">
              Student Attendance
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#292321]">
              {student.student}
            </h2>

            <p className="text-sm text-[#918478]">
              {student.studentId}
            </p>

          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f4eee5] text-lg text-[#4b171b] hover:bg-[#eadfd1]"
          >
            ×
          </button>

        </div>

        {/* SUMMARY */}

        <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-4">

          <AmountBox
            label="Attendance"
            value={`${student.percentage}%`}
          />

          <AmountBox
            label="Total Classes"
            value={student.totalClasses}
          />

          <AmountBox
            label="Present"
            value={student.present}
          />

          <AmountBox
            label="Absent"
            value={student.absent}
          />

        </div>

        {/* PROGRESS */}

        <div className="px-5">

          <div className="mb-2 flex justify-between">

            <span className="text-sm font-medium text-[#85776b]">
              Attendance Percentage
            </span>

            <span className="font-bold text-[#4b171b]">
              {student.percentage}%
            </span>

          </div>

          <div className="h-3 rounded-full bg-[#eee7dc]">

            <div
              className={`h-3 rounded-full ${
                student.percentage >= 85
                  ? "bg-[#5d8a61]"
                  : student.percentage >= 75
                  ? "bg-[#c49b4d]"
                  : "bg-[#a45d55]"
              }`}
              style={{
                width: `${Math.min(
                  student.percentage,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

        {/* HISTORY */}

        <div className="p-5">

          <h3 className="font-bold text-[#332c28]">
            Attendance History
          </h3>

          <p className="mt-1 text-sm text-[#918478]">
            Recent attendance records
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-[#e8e0d5]">

            {student.history.map(
              (record, index) => (

                <div
                  key={index}
                  className="flex flex-col gap-2 border-b border-[#eee7dc] p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>

                    <p className="text-sm font-semibold text-[#332c28]">
                      {record.subject}
                    </p>

                    <p className="mt-1 text-xs text-[#95887c]">
                      {record.date}
                    </p>

                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      record.status === "Present"
                        ? "bg-[#e5efe4] text-[#35643b]"
                        : "bg-[#f4e4e1] text-[#8b4e47]"
                    }`}
                  >
                    {record.status}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

        {/* FOOTER */}

        <div className="border-t border-[#eee7dc] p-5">

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#4b171b] py-3 text-sm font-bold text-white transition hover:bg-[#641f25]"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

/* ========================= */
/* AMOUNT BOX */
/* ========================= */

function AmountBox({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-[#faf7f1] p-3 text-center">

      <p className="text-[11px] text-[#918478]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#4b171b]">
        {value}
      </p>

    </div>
  );
}

/* ========================= */
/* HELPERS */
/* ========================= */

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const thClass =
  "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]";

export default Attendance;