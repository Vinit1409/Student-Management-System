import { Link } from "react-router-dom";

function Dashboard({ students = [] }) {

  const totalStudents = students.length;

  const activeStudents =
    students.filter(
      (student) =>
        student.status === "Active"
    ).length;

  const averageCGPA =
    students.length > 0
      ? (
          students.reduce(
            (total, student) =>
              total +
              Number(student.cgpa),
            0
          ) / students.length
        ).toFixed(2)
      : "0.00";

  const departments =
    new Set(
      students.map(
        (student) =>
          student.department
      )
    ).size;

  return (
    <div className="space-y-8">

      {/* WELCOME */}

      <section className="rounded-2xl bg-[#4b171b] p-6 text-white shadow-sm md:p-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-sm font-semibold text-[#c9a66b]">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Good afternoon, Administrator
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#ddcfc0]">
              Manage student records, academic
              information and administration from
              one central portal.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#c9a66b] text-xl font-bold text-[#4b171b]">
              AD
            </div>

            <div>
              <p className="font-bold">
                Administrator
              </p>

              <p className="text-sm text-[#ddcfc0]">
                System Admin
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* QUICK STATS */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Stat
          title="Total Students"
          value={totalStudents}
          icon="ST"
        />

        <Stat
          title="Active Students"
          value={activeStudents}
          icon="AC"
        />

        <Stat
          title="Departments"
          value={departments}
          icon="DP"
        />

        <Stat
          title="Average CGPA"
          value={averageCGPA}
          icon="CG"
        />

      </section>


      {/* MAIN GRID */}

      <section className="grid gap-6 xl:grid-cols-3">

        {/* PERFORMANCE */}

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-6 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-bold text-[#332c28]">
                Academic Performance
              </h2>

              <p className="mt-1 text-sm text-[#918478]">
                Student performance overview
              </p>
            </div>

            <span className="rounded-full bg-[#f3e9dc] px-3 py-1 text-xs font-semibold text-[#6d2529]">
              2025–26
            </span>

          </div>

          <div className="mt-7 space-y-6">

            <Performance
              name="Computer Engineering"
              value="9.10"
              width="91%"
            />

            <Performance
              name="Information Technology"
              value="8.80"
              width="88%"
            />

            <Performance
              name="Electronics Engineering"
              value="8.40"
              width="84%"
            />

            <Performance
              name="Mechanical Engineering"
              value="8.10"
              width="81%"
            />

          </div>

        </div>


        {/* NOTIFICATIONS */}

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <h2 className="font-bold text-[#332c28]">
              Notifications
            </h2>

            <span className="rounded-full bg-[#f4e4e1] px-2.5 py-1 text-xs font-bold text-[#8b4e47]">
              3 New
            </span>

          </div>

          <div className="mt-5 space-y-4">

            <Notification
              title="Attendance update"
              text="Attendance records need review."
              type="!"
            />

            <Notification
              title="New student records"
              text="5 records were added today."
              type="+"
            />

            <Notification
              title="System message"
              text="Academic data backup completed."
              type="✓"
            />

          </div>

        </div>

      </section>


      {/* QUICK ACTIONS */}

      <section>

        <div className="mb-4">

          <h2 className="text-lg font-bold text-[#332c28]">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-[#918478]">
            Frequently used administrative actions
          </p>

        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <Action
            to="/students"
            icon="👨‍🎓"
            title="Manage Students"
            text="View and manage records"
          />

          <Action
            to="/attendance"
            icon="📅"
            title="Attendance"
            text="Track student attendance"
          />

          <Action
            to="/gradebook"
            icon="📊"
            title="Gradebook"
            text="View academic grades"
          />

          <Action
            to="/requests"
            icon="📄"
            title="Requests"
            text="Manage student requests"
          />

        </div>

      </section>


      {/* RECENT STUDENTS */}

      <section className="rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-[#eee7dc] p-6">

          <div>
            <h2 className="font-bold text-[#332c28]">
              Recent Students
            </h2>

            <p className="mt-1 text-sm text-[#918478]">
              Latest student records
            </p>
          </div>

          <Link
            to="/students"
            className="text-sm font-bold text-[#8d3b42] hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead className="bg-[#faf7f1]">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#87796c]">
                  CGPA
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-[#eee7dc]">

              {students.slice(0, 5).map(
                (student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-[#fcfaf6]"
                  >

                    <td className="px-6 py-4 text-sm font-semibold text-[#4b171b]">
                      {student.studentId}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ead8c5] text-xs font-bold text-[#6d2529]">
                          {getInitials(
                            student.name
                          )}
                        </div>

                        <span className="text-sm font-semibold text-[#332c28]">
                          {student.name}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-sm text-[#665a50]">
                      {student.department}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-[#4b171b]">
                      {Number(
                        student.cgpa
                      ).toFixed(1)}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}


/* STAT */

function Stat({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-[#85776b]">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#292321]">
            {value}
          </h3>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0e1d2] text-sm font-bold text-[#6d2529]">
          {icon}
        </div>

      </div>

    </div>
  );
}


/* PERFORMANCE */

function Performance({
  name,
  value,
  width,
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between gap-4">

        <span className="text-sm font-medium text-[#554a42]">
          {name}
        </span>

        <span className="text-sm font-bold text-[#4b171b]">
          {value}
        </span>

      </div>

      <div className="h-2 rounded-full bg-[#eee7dc]">

        <div
          className="h-2 rounded-full bg-[#8d3b42]"
          style={{
            width,
          }}
        />

      </div>

    </div>
  );
}


/* NOTIFICATION */

function Notification({
  title,
  text,
  type,
}) {
  return (
    <div className="flex gap-3 rounded-xl bg-[#faf7f1] p-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0e1d2] text-sm font-bold text-[#6d2529]">
        {type}
      </div>

      <div>

        <p className="text-sm font-semibold text-[#332c28]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[#918478]">
          {text}
        </p>

      </div>

    </div>
  );
}


/* QUICK ACTION */

function Action({
  to,
  icon,
  title,
  text,
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#c9a66b] hover:shadow-md"
    >

      <div className="text-2xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-[#332c28]">
        {title}
      </h3>

      <p className="mt-1 text-sm text-[#918478]">
        {text}
      </p>

      <p className="mt-4 text-sm font-bold text-[#8d3b42]">
        Open →
      </p>

    </Link>
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

export default Dashboard;