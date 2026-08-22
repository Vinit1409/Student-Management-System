import { useMemo, useState } from "react";

const timetable = [
  {
    id: 1,
    day: "Monday",
    time: "09:00 - 10:00",
    subject: "Data Structures",
    code: "CS301",
    faculty: "Dr. Rahul Mehta",
    room: "Lab 204",
    type: "Lecture",
  },
  {
    id: 2,
    day: "Monday",
    time: "10:15 - 11:15",
    subject: "Database Management",
    code: "CS302",
    faculty: "Prof. Neha Shah",
    room: "Room 305",
    type: "Lecture",
  },
  {
    id: 3,
    day: "Monday",
    time: "12:00 - 01:00",
    subject: "Operating Systems",
    code: "CS303",
    faculty: "Dr. Amit Joshi",
    room: "Room 201",
    type: "Lecture",
  },

  {
    id: 4,
    day: "Tuesday",
    time: "09:00 - 10:00",
    subject: "Computer Networks",
    code: "CS304",
    faculty: "Prof. Priya Nair",
    room: "Room 302",
    type: "Lecture",
  },
  {
    id: 5,
    day: "Tuesday",
    time: "10:15 - 12:15",
    subject: "Web Development",
    code: "CS305",
    faculty: "Prof. Karan Patel",
    room: "Lab 101",
    type: "Practical",
  },
  {
    id: 6,
    day: "Tuesday",
    time: "01:00 - 02:00",
    subject: "Software Engineering",
    code: "CS306",
    faculty: "Dr. Sneha Kulkarni",
    room: "Room 205",
    type: "Lecture",
  },

  {
    id: 7,
    day: "Wednesday",
    time: "09:00 - 10:00",
    subject: "Database Management",
    code: "CS302",
    faculty: "Prof. Neha Shah",
    room: "Room 305",
    type: "Lecture",
  },
  {
    id: 8,
    day: "Wednesday",
    time: "10:15 - 11:15",
    subject: "Data Structures",
    code: "CS301",
    faculty: "Dr. Rahul Mehta",
    room: "Room 204",
    type: "Lecture",
  },
  {
    id: 9,
    day: "Wednesday",
    time: "12:00 - 02:00",
    subject: "Computer Networks Lab",
    code: "CS304L",
    faculty: "Prof. Priya Nair",
    room: "Lab 202",
    type: "Practical",
  },

  {
    id: 10,
    day: "Thursday",
    time: "09:00 - 10:00",
    subject: "Operating Systems",
    code: "CS303",
    faculty: "Dr. Amit Joshi",
    room: "Room 201",
    type: "Lecture",
  },
  {
    id: 11,
    day: "Thursday",
    time: "10:15 - 11:15",
    subject: "Software Engineering",
    code: "CS306",
    faculty: "Dr. Sneha Kulkarni",
    room: "Room 205",
    type: "Lecture",
  },
  {
    id: 12,
    day: "Thursday",
    time: "12:00 - 02:00",
    subject: "Web Development Lab",
    code: "CS305L",
    faculty: "Prof. Karan Patel",
    room: "Lab 101",
    type: "Practical",
  },

  {
    id: 13,
    day: "Friday",
    time: "09:00 - 10:00",
    subject: "Computer Networks",
    code: "CS304",
    faculty: "Prof. Priya Nair",
    room: "Room 302",
    type: "Lecture",
  },
  {
    id: 14,
    day: "Friday",
    time: "10:15 - 11:15",
    subject: "Data Structures",
    code: "CS301",
    faculty: "Dr. Rahul Mehta",
    room: "Room 204",
    type: "Lecture",
  },
  {
    id: 15,
    day: "Friday",
    time: "12:00 - 01:00",
    subject: "Project / Mentoring",
    code: "PRJ401",
    faculty: "Department Faculty",
    room: "Seminar Hall",
    type: "Project",
  },
];

const days = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

function Timetable() {
  const [selectedDay, setSelectedDay] = useState("All");

  const filteredClasses = useMemo(() => {
    if (selectedDay === "All") {
      return timetable;
    }

    return timetable.filter(
      (item) => item.day === selectedDay
    );
  }, [selectedDay]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayClasses = timetable.filter(
    (item) => item.day === today
  );

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <section>
        <p className="text-sm font-semibold text-[#9b333b]">
          Academics
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Class Timetable
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          View weekly class schedules, faculty, rooms and
          practical sessions.
        </p>
      </section>

      {/* SUMMARY CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          title="Weekly Classes"
          value={timetable.length}
          description="Scheduled sessions"
          symbol="CL"
        />

        <SummaryCard
          title="Today"
          value={todayClasses.length}
          description={`${today} classes`}
          symbol="TD"
        />

        <SummaryCard
          title="Lectures"
          value={
            timetable.filter(
              (item) => item.type === "Lecture"
            ).length
          }
          description="Regular lectures"
          symbol="LE"
        />

        <SummaryCard
          title="Practicals"
          value={
            timetable.filter(
              (item) => item.type === "Practical"
            ).length
          }
          description="Lab sessions"
          symbol="PR"
        />

      </section>

      {/* DAY FILTER */}
      <section className="rounded-2xl border border-[#ded6ca] bg-white p-4 shadow-sm">

        <div className="flex flex-wrap gap-2">

          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                selectedDay === day
                  ? "bg-[#4b171b] text-white shadow-sm"
                  : "bg-[#f8f4ec] text-[#65594f] hover:bg-[#eee5d8]"
              }`}
            >
              {day}
            </button>
          ))}

        </div>

      </section>

      {/* TIMETABLE */}
      <section className="overflow-hidden rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        <div className="border-b border-[#e8e0d5] p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
              <h2 className="font-bold text-[#332c28]">
                Weekly Schedule
              </h2>

              <p className="mt-1 text-sm text-[#918478]">
                Academic Year 2025–26
              </p>
            </div>

            <span className="rounded-full bg-[#f3e9dc] px-3 py-1.5 text-xs font-semibold text-[#6d2529]">
              {filteredClasses.length} Classes
            </span>

          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-[#faf7f1]">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#87796c]">
                  Day
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#87796c]">
                  Time
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#87796c]">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#87796c]">
                  Faculty
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#87796c]">
                  Room
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-[#87796c]">
                  Type
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-[#eee7dc]">

              {filteredClasses.map((item) => (

                <tr
                  key={item.id}
                  className={`transition hover:bg-[#fcfaf6] ${
                    item.day === today
                      ? "bg-[#fffaf2]"
                      : ""
                  }`}
                >

                  {/* DAY */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      {item.day === today && (
                        <span className="h-2 w-2 rounded-full bg-[#9b333b]" />
                      )}

                      <span className="font-semibold text-[#4b4038]">
                        {item.day}
                      </span>

                    </div>

                  </td>

                  {/* TIME */}
                  <td className="px-6 py-5">

                    <span className="rounded-lg bg-[#f4eee5] px-3 py-2 text-xs font-bold text-[#6d2529]">
                      {item.time}
                    </span>

                  </td>

                  {/* SUBJECT */}
                  <td className="px-6 py-5">

                    <p className="font-semibold text-[#332c28]">
                      {item.subject}
                    </p>

                    <p className="mt-1 text-xs text-[#95887c]">
                      {item.code}
                    </p>

                  </td>

                  {/* FACULTY */}
                  <td className="px-6 py-5 text-sm text-[#51473f]">
                    {item.faculty}
                  </td>

                  {/* ROOM */}
                  <td className="px-6 py-5">

                    <span className="text-sm font-medium text-[#665a50]">
                      {item.room}
                    </span>

                  </td>

                  {/* TYPE */}
                  <td className="px-6 py-5">

                    <TypeBadge type={item.type} />

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredClasses.length === 0 && (
          <div className="p-12 text-center">

            <p className="font-semibold text-[#4c433d]">
              No classes scheduled
            </p>

            <p className="mt-1 text-sm text-[#92857a]">
              There are no classes for this day.
            </p>

          </div>
        )}

      </section>

      {/* TODAY'S CLASSES */}
      <section className="rounded-2xl border border-[#ded6ca] bg-[#4b171b] p-6 text-white">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c9a66b]">
              Today
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {today}
            </h2>

            <p className="mt-2 text-sm text-[#ddcfc0]">
              {todayClasses.length > 0
                ? `You have ${todayClasses.length} scheduled classes today.`
                : "No classes scheduled for today."}
            </p>

          </div>

          <div className="rounded-xl bg-[#693438] px-5 py-4 text-center">

            <p className="text-2xl font-bold">
              {todayClasses.length}
            </p>

            <p className="text-xs text-[#ddcfc0]">
              Classes Today
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}


/* SUMMARY CARD */

function SummaryCard({
  title,
  value,
  description,
  symbol,
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-[#85776b]">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-[#292321]">
            {value}
          </h3>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0e1d2] text-sm font-bold text-[#6d2529]">
          {symbol}
        </div>

      </div>

      <p className="mt-4 text-xs text-[#9a8d80]">
        {description}
      </p>

    </div>
  );
}


/* TYPE BADGE */

function TypeBadge({ type }) {

  const classes = {
    Lecture:
      "bg-[#eee8dc] text-[#705d48]",

    Practical:
      "bg-[#e5efe4] text-[#35643b]",

    Project:
      "bg-[#f1e7cf] text-[#856526]",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        classes[type] || "bg-gray-100 text-gray-600"
      }`}
    >
      {type}
    </span>
  );
}

export default Timetable;