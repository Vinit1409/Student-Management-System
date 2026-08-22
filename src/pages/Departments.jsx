function Departments() {
  const departments = [
    {
      name: "Computer Engineering",
      code: "COMPS",
      students: 72,
      hod: "Dr. Rajesh Mehta",
      status: "Active",
    },
    {
      name: "Information Technology",
      code: "IT",
      students: 58,
      hod: "Dr. Neha Sharma",
      status: "Active",
    },
    {
      name: "Electronics Engineering",
      code: "EXTC",
      students: 45,
      hod: "Dr. Amit Kulkarni",
      status: "Active",
    },
    {
      name: "Mechanical Engineering",
      code: "MECH",
      students: 36,
      hod: "Dr. Sameer Patil",
      status: "Active",
    },
    {
      name: "Civil Engineering",
      code: "CIVIL",
      students: 25,
      hod: "Dr. Priya Desai",
      status: "Active",
    },
    {
      name: "Artificial Intelligence",
      code: "AI",
      students: 12,
      hod: "Dr. Rohan Joshi",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <section>
        <p className="text-sm font-semibold text-[#9b333b]">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Departments
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Manage academic departments and department information.
        </p>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <SummaryCard
          title="Total Departments"
          value={departments.length}
          description="Academic departments"
          icon="DP"
        />

        <SummaryCard
          title="Total Students"
          value={departments.reduce(
            (total, department) =>
              total + department.students,
            0
          )}
          description="Students across departments"
          icon="ST"
        />

        <SummaryCard
          title="Active Departments"
          value={
            departments.filter(
              (department) =>
                department.status === "Active"
            ).length
          }
          description="Currently active"
          icon="AC"
        />

      </section>

      {/* DEPARTMENT CARDS */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {departments.map((department) => (
          <div
            key={department.code}
            className="rounded-2xl border border-[#ded6ca] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >

            {/* TOP */}
            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0e1d2] font-bold text-[#6d2529]">
                {department.code.slice(0, 2)}
              </div>

              <span className="rounded-full bg-[#e8f1e7] px-3 py-1 text-xs font-semibold text-[#35643b]">
                {department.status}
              </span>

            </div>

            {/* NAME */}
            <h2 className="mt-5 text-lg font-bold text-[#332c28]">
              {department.name}
            </h2>

            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#9a8d80]">
              Department Code: {department.code}
            </p>

            {/* INFO */}
            <div className="mt-5 space-y-3 border-t border-[#eee7dc] pt-4">

              <div className="flex justify-between">
                <span className="text-sm text-[#84786d]">
                  Students
                </span>

                <span className="text-sm font-bold text-[#4b171b]">
                  {department.students}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-sm text-[#84786d]">
                  Head of Department
                </span>

                <span className="text-right text-sm font-semibold text-[#51473f]">
                  {department.hod}
                </span>
              </div>

            </div>

            {/* BUTTON */}
            <button
              className="mt-5 w-full rounded-xl border border-[#ddd3c6] px-4 py-2.5 text-sm font-semibold text-[#62564d] transition hover:bg-[#f5eee5]"
            >
              View Department
            </button>

          </div>
        ))}

      </section>

    </div>
  );
}


/* SUMMARY CARD */

function SummaryCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-[#85776b]">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#292321]">
            {value}
          </h2>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eee8dc] text-sm font-bold text-[#705d48]">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs text-[#9a8d80]">
        {description}
      </p>

    </div>
  );
}

export default Departments;