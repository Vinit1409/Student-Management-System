import { useStudents } from "../context/StudentContext"

const feeData = {
  STU001: {
    total: 80000,
    paid: 60000,
  },
  STU002: {
    total: 80000,
    paid: 80000,
  },
  STU003: {
    total: 75000,
    paid: 45000,
  },
  STU004: {
    total: 85000,
    paid: 65000,
  },
}

function Finance() {
  const { students } = useStudents()

  const totalPending = students.reduce(
    (sum, student) => {
      const fee = feeData[student.studentId]

      if (!fee) return sum

      return sum + (fee.total - fee.paid)
    },
    0
  )

  const totalCollected = students.reduce(
    (sum, student) => {
      const fee = feeData[student.studentId]

      if (!fee) return sum

      return sum + fee.paid
    },
    0
  )

  return (
    <div className="space-y-6">

      <div>

        <p className="text-sm font-semibold text-[#9b333b]">
          Finance
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Student Fees
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Track student-wise fee payment and pending amounts.
        </p>

      </div>

      {/* SUMMARY */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-5">

          <p className="text-sm text-[#85776b]">
            Total Students
          </p>

          <p className="mt-2 text-2xl font-bold text-[#4b171b]">
            {students.length}
          </p>

        </div>

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-5">

          <p className="text-sm text-[#85776b]">
            Fees Collected
          </p>

          <p className="mt-2 text-2xl font-bold text-green-700">
            ₹{totalCollected.toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl border border-[#ded6ca] bg-white p-5">

          <p className="text-sm text-[#85776b]">
            Total Pending
          </p>

          <p className="mt-2 text-2xl font-bold text-red-600">
            ₹{totalPending.toLocaleString()}
          </p>

        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto rounded-2xl border border-[#ded6ca] bg-white">

        <table className="w-full min-w-[900px]">

          <thead className="bg-[#faf7f1]">

            <tr>

              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Student ID
              </th>

              <th className="px-6 py-4 text-left">
                Total Fees
              </th>

              <th className="px-6 py-4 text-left">
                Paid
              </th>

              <th className="px-6 py-4 text-left">
                Pending
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {students.map((student) => {

              const fee = feeData[student.studentId] || {
                total: 80000,
                paid: 0,
              }

              const pending =
                fee.total - fee.paid

              const paidFully =
                pending === 0

              return (
                <tr key={student.id}>

                  <td className="px-6 py-4 font-semibold">
                    {student.name}
                  </td>

                  <td className="px-6 py-4">
                    {student.studentId}
                  </td>

                  <td className="px-6 py-4">
                    ₹{fee.total.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-green-700 font-semibold">
                    ₹{fee.paid.toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-red-600 font-semibold">
                    ₹{pending.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        paidFully
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {paidFully
                        ? "Paid"
                        : "Pending"}
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

export default Finance