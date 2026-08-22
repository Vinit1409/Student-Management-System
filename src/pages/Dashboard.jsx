import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold text-[#9b333b]">
          Overview
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#292321]">
          Good afternoon, Administrator
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Manage student records and academic information
          from one central portal.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Students"
          value="248"
          description="Registered student records"
          symbol="ST"
          symbolClass="bg-[#f0e1d2] text-[#6d2529]"
        />

        <StatCard
          title="Active Students"
          value="231"
          description="Currently enrolled"
          symbol="AC"
          symbolClass="bg-[#e5efe4] text-[#3c6b42]"
        />

        <StatCard
          title="Departments"
          value="6"
          description="Academic departments"
          symbol="DP"
          symbolClass="bg-[#eee8dc] text-[#705d48]"
        />

        <StatCard
          title="Average CGPA"
          value="8.42"
          description="Across all students"
          symbol="CG"
          symbolClass="bg-[#f1e7cf] text-[#856526]"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-[#ded6ca] bg-white p-6 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-[#332c28]">
                Academic Performance
              </h2>

              <p className="mt-1 text-sm text-[#918478]">
                Average CGPA by department
              </p>
            </div>

            <span className="rounded-full bg-[#f3e9dc] px-3 py-1 text-xs font-semibold text-[#6d2529]">
              2025–26
            </span>
          </div>

          <div className="mt-7 space-y-5">
            <PerformanceRow
              department="Computer Engineering"
              value="9.10"
              width="91%"
            />

            <PerformanceRow
              department="Information Technology"
              value="8.80"
              width="88%"
            />

            <PerformanceRow
              department="Electronics Engineering"
              value="8.40"
              width="84%"
            />

            <PerformanceRow
              department="Mechanical Engineering"
              value="8.10"
              width="81%"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[#ded6ca] bg-[#4b171b] p-6 text-[#f8f1e5]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a66b]">
            Quick Overview
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Student records are up to date.
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#ddcfc0]">
            Use the Students section to search, filter,
            add, edit and manage student information.
          </p>

          <a
            href="/students"
            className="mt-6 inline-block rounded-xl bg-[#c9a66b] px-5 py-3 text-sm font-bold text-[#4b171b] transition hover:bg-[#d6b97f]"
          >
            View Students
          </a>
        </div>
      </section>
    </div>
  );
}

function PerformanceRow({
  department,
  value,
  width,
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-[#554a42]">
          {department}
        </span>

        <span className="font-bold text-[#4b171b]">
          {value}
        </span>
      </div>

      <div className="h-2 rounded-full bg-[#eee7dc]">
        <div
          className="h-2 rounded-full bg-[#8d3b42]"
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default Dashboard;