import { useMemo, useState } from "react";
import { useStudents } from "../context/StudentContext";

function Attendance() {
  const {
    students,
    attendance,
    markPresent,
    markAbsent,
    resetAttendance,
  } = useStudents();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const attendanceStudents =
    useMemo(() => {
      return students
        .map((student) => {
          const data =
            attendance[student.id] || {
              present: 0,
              absent: 0,
            };

          const total =
            data.present + data.absent;

          const percentage =
            total > 0
              ? Math.round(
                  (data.present / total) * 100
                )
              : 0;

          let status = "No Data";

          if (total > 0) {
            status =
              percentage >= 75
                ? "Good"
                : "Low";
          }

          return {
            ...student,
            present: data.present,
            absent: data.absent,
            total,
            percentage,
            status,
          };
        })
        .filter((student) => {
          const query =
            search.toLowerCase();

          const matchesSearch =
            student.name
              .toLowerCase()
              .includes(query) ||
            student.studentId
              .toLowerCase()
              .includes(query);

          const matchesFilter =
            filter === "All" ||
            student.status === filter;

          return (
            matchesSearch &&
            matchesFilter
          );
        });
    }, [
      students,
      attendance,
      search,
      filter,
    ]);

  // ==================================================
  // SUMMARY
  // ==================================================

  const goodStudents =
    students.filter((student) => {
      const data =
        attendance[student.id];

      if (!data) return false;

      const total =
        data.present + data.absent;

      if (total === 0) return false;

      return (
        (data.present / total) * 100 >=
        75
      );
    }).length;

  const lowStudents =
    students.filter((student) => {
      const data =
        attendance[student.id];

      if (!data) return false;

      const total =
        data.present + data.absent;

      if (total === 0) return false;

      return (
        (data.present / total) * 100 <
        75
      );
    }).length;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <section>

        <p className="text-sm font-semibold text-[#9b333b]">
          Academics
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Attendance
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Manage student-wise attendance.
        </p>

      </section>

      {/* SUMMARY */}

      <section className="grid gap-4 sm:grid-cols-3">

        <SummaryCard
          title="Total Students"
          value={students.length}
        />

        <SummaryCard
          title="Good Attendance"
          value={goodStudents}
          subtitle="75% or above"
          valueClass="text-green-700"
        />

        <SummaryCard
          title="Low Attendance"
          value={lowStudents}
          subtitle="Below 75%"
          valueClass="text-red-600"
        />

      </section>

      {/* SEARCH */}

      <section className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm">

        <div className="grid gap-3 md:grid-cols-[1fr_200px]">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search student name or ID..."
            className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm outline-none"
          >

            <option value="All">
              All Students
            </option>

            <option value="Good">
              Good Attendance
            </option>

            <option value="Low">
              Low Attendance
            </option>

            <option value="No Data">
              No Data
            </option>

          </select>

        </div>

      </section>

      {/* TABLE */}

      <section className="overflow-x-auto rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-[#faf7f1]">

            <tr>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                ID
              </th>

              <th className="px-6 py-4 text-left">
                Present
              </th>

              <th className="px-6 py-4 text-left">
                Absent
              </th>

              <th className="px-6 py-4 text-left">
                Total
              </th>

              <th className="px-6 py-4 text-left">
                Attendance
              </th>

              <th className="px-6 py-4 text-left">
                Mark Attendance
              </th>

              <th className="px-6 py-4 text-left">
                Reset
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-[#eee7dc]">

            {attendanceStudents.map(
              (student) => (

                <tr
                  key={student.id}
                  className="hover:bg-[#fcfaf6]"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ead8c5] text-sm font-bold text-[#6d2529]">
                        {getInitials(
                          student.name
                        )}
                      </div>

                      <div>

                        <p className="font-semibold text-[#332c28]">
                          {student.name}
                        </p>

                        <p className="text-xs text-[#95887c]">
                          {student.department}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <span className="rounded-lg bg-[#f3e9dc] px-3 py-2 text-xs font-bold text-[#6d2529]">
                      {student.studentId}
                    </span>

                  </td>

                  <td className="px-6 py-4 font-bold text-green-700">
                    {student.present}
                  </td>

                  <td className="px-6 py-4 font-bold text-red-600">
                    {student.absent}
                  </td>

                  <td className="px-6 py-4">
                    {student.total}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      <div className="h-2 w-20 overflow-hidden rounded-full bg-[#eee7dc]">

                        <div
                          className={`h-full ${
                            student.percentage >=
                            75
                              ? "bg-green-600"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${student.percentage}%`,
                          }}
                        />

                      </div>

                      <span className="font-bold">
                        {student.percentage}%
                      </span>

                    </div>

                  </td>

                  {/* BUTTONS */}

                  <td className="px-6 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          markPresent(
                            student.id
                          )
                        }
                        className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
                      >
                        Present
                      </button>

                      <button
                        onClick={() =>
                          markAbsent(
                            student.id
                          )
                        }
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
                      >
                        Absent
                      </button>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        resetAttendance(
                          student.id
                        )
                      }
                      className="rounded-lg border border-[#ddd3c6] px-3 py-2 text-xs font-semibold text-[#62564d] hover:bg-[#f4eee5]"
                    >
                      Reset
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </section>

    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  valueClass = "text-[#4b171b]",
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm">

      <p className="text-sm text-[#85776b]">
        {title}
      </p>

      <p
        className={`mt-2 text-3xl font-bold ${valueClass}`}
      >
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-xs text-[#918478]">
          {subtitle}
        </p>
      )}

    </div>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default Attendance;