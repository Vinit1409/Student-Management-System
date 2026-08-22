function Gradebook({ students = [] }) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-8">
      <p className="text-sm font-semibold text-[#9b333b]">
        Academics
      </p>

      <h1 className="mt-1 text-3xl font-bold text-[#302925]">
        Gradebook
      </h1>

      <p className="mt-2 text-sm text-[#84786d]">
        Manage grades, marks and academic performance.
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-[#faf7f1]">
            <tr>
              <th className="px-5 py-3 text-left text-xs">
                Student
              </th>

              <th className="px-5 py-3 text-left text-xs">
                ID
              </th>

              <th className="px-5 py-3 text-left text-xs">
                CGPA
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-5 py-3 text-sm font-semibold">
                  {student.name}
                </td>

                <td className="px-5 py-3 text-sm">
                  {student.studentId}
                </td>

                <td className="px-5 py-3 text-sm font-bold text-[#4b171b]">
                  {student.cgpa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Gradebook;