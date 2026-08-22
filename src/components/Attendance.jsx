import { useStudents } from "../context/StudentContext"

function Attendance() {
  const { students } = useStudents()

  return (
    <div className="space-y-6">

      <div>
        <p className="text-sm font-semibold text-[#9b333b]">
          Academic
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Student Attendance
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          View attendance student-wise.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#ded6ca] bg-white">

        <table className="w-full min-w-[800px]">

          <thead className="bg-[#faf7f1]">

            <tr>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Student ID
              </th>

              <th className="px-6 py-4 text-left">
                Present
              </th>

              <th className="px-6 py-4 text-left">
                Absent
              </th>

              <th className="px-6 py-4 text-left">
                Attendance
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {students.map((student, index) => {

              const present = 72 - index * 3
              const absent = 8 + index
              const percentage = Math.round(
                (present / (present + absent)) * 100
              )

              return (
                <tr key={student.id}>

                  <td className="px-6 py-4 font-semibold">
                    {student.name}
                  </td>

                  <td className="px-6 py-4">
                    {student.studentId}
                  </td>

                  <td className="px-6 py-4 text-green-700">
                    {present}
                  </td>

                  <td className="px-6 py-4 text-red-600">
                    {absent}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        percentage >= 75
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {percentage}%
                    </span>

                  </td>

                </tr>
              )
            })}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Attendance