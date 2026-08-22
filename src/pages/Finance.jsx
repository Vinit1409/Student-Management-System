import { useMemo, useState } from "react";
import { useStudents } from "../context/StudentContext";

function Finance() {
  const {
    students,
    fees,
    updateTotalFees,
    setPaidAmount,
  } = useStudents();

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [totalInput, setTotalInput] =
    useState("");

  const [paidInput, setPaidInput] =
    useState("");

  // ==================================================
  // SAME STUDENTS + FEE DATA
  // ==================================================

  const financeStudents =
    useMemo(() => {
      return students
        .map((student) => {

          const fee =
            fees[student.id] || {
              total: 80000,
              paid: 0,
            };

          const total =
            Number(fee.total) || 0;

          const paid =
            Number(fee.paid) || 0;

          const pending =
            Math.max(total - paid, 0);

          const status =
            pending === 0
              ? "Paid"
              : "Pending";

          return {
            ...student,
            totalFees: total,
            paidFees: paid,
            pendingFees: pending,
            feeStatus: status,
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
            student.feeStatus === filter;

          return (
            matchesSearch &&
            matchesFilter
          );
        });
    }, [
      students,
      fees,
      search,
      filter,
    ]);

  // ==================================================
  // SUMMARY
  // ==================================================

  const totalFees =
    students.reduce(
      (sum, student) => {

        const fee =
          fees[student.id] || {
            total: 80000,
            paid: 0,
          };

        return (
          sum +
          Number(fee.total || 0)
        );
      },
      0
    );

  const totalPaid =
    students.reduce(
      (sum, student) => {

        const fee =
          fees[student.id] || {
            total: 80000,
            paid: 0,
          };

        return (
          sum +
          Number(fee.paid || 0)
        );
      },
      0
    );

  const totalPending =
    Math.max(
      totalFees - totalPaid,
      0
    );

  // ==================================================
  // EDIT FEE
  // ==================================================

  function openEdit(student) {
    setEditingStudent(student);

    setTotalInput(
      String(student.totalFees)
    );

    setPaidInput(
      String(student.paidFees)
    );
  }

  function saveFee() {
    if (!editingStudent) return;

    const total =
      Number(totalInput);

    const paid =
      Number(paidInput);

    if (
      Number.isNaN(total) ||
      Number.isNaN(paid) ||
      total < 0 ||
      paid < 0
    ) {
      alert(
        "Please enter valid fee amounts."
      );

      return;
    }

    if (paid > total) {
      alert(
        "Paid amount cannot be greater than total fees."
      );

      return;
    }

    updateTotalFees(
      editingStudent.id,
      total
    );

    setPaidAmount(
      editingStudent.id,
      paid
    );

    setEditingStudent(null);
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <section>

        <p className="text-sm font-semibold text-[#9b333b]">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Finance
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Manage student-wise fees and
          payment records.
        </p>

      </section>

      {/* SUMMARY */}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <SummaryCard
          title="Total Fees"
          value={`₹${totalFees.toLocaleString()}`}
        />

        <SummaryCard
          title="Fees Collected"
          value={`₹${totalPaid.toLocaleString()}`}
          valueClass="text-green-700"
        />

        <SummaryCard
          title="Total Pending"
          value={`₹${totalPending.toLocaleString()}`}
          valueClass="text-red-600"
        />

        <SummaryCard
          title="Students"
          value={students.length}
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

            <option value="Paid">
              Fully Paid
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

        </div>

      </section>

      {/* TABLE */}

      <section className="overflow-x-auto rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        <table className="w-full min-w-[1000px]">

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

              <th className="px-6 py-4 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-[#eee7dc]">

            {financeStudents.map(
              (student) => (

                <tr
                  key={student.id}
                  className="hover:bg-[#fcfaf6]"
                >

                  {/* STUDENT */}

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

                  {/* ID */}

                  <td className="px-6 py-4">

                    <span className="rounded-lg bg-[#f3e9dc] px-3 py-2 text-xs font-bold text-[#6d2529]">
                      {student.studentId}
                    </span>

                  </td>

                  {/* TOTAL */}

                  <td className="px-6 py-4 font-semibold">
                    ₹
                    {student.totalFees.toLocaleString()}
                  </td>

                  {/* PAID */}

                  <td className="px-6 py-4 font-semibold text-green-700">
                    ₹
                    {student.paidFees.toLocaleString()}
                  </td>

                  {/* PENDING */}

                  <td className="px-6 py-4 font-semibold text-red-600">
                    ₹
                    {student.pendingFees.toLocaleString()}
                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        student.feeStatus ===
                        "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {student.feeStatus}
                    </span>

                  </td>

                  {/* ACTION */}

                  <td className="px-6 py-4">

                    <button
                      onClick={() =>
                        openEdit(student)
                      }
                      className="rounded-lg bg-[#4b171b] px-4 py-2 text-xs font-bold text-white hover:bg-[#641f25]"
                    >
                      Manage Fees
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </section>

      {/* EDIT FEE MODAL */}

      {editingStudent && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#e8e0d5] p-6">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-[#9b333b]">
                  Fee Management
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#332c28]">
                  {editingStudent.name}
                </h2>

                <p className="mt-1 text-xs text-[#95887c]">
                  {editingStudent.studentId}
                </p>

              </div>

              <button
                onClick={() =>
                  setEditingStudent(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4eee5]"
              >
                ✕
              </button>

            </div>

            {/* FORM */}

            <div className="space-y-5 p-6">

              {/* TOTAL */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                  Total Fees
                </label>

                <input
                  type="number"
                  min="0"
                  value={totalInput}
                  onChange={(e) =>
                    setTotalInput(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-[#ddd3c6] px-4 py-3 outline-none focus:border-[#8d3b42]"
                />

              </div>

              {/* PAID */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-[#51473f]">
                  Paid Amount
                </label>

                <input
                  type="number"
                  min="0"
                  value={paidInput}
                  onChange={(e) =>
                    setPaidInput(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-[#ddd3c6] px-4 py-3 outline-none focus:border-[#8d3b42]"
                />

              </div>

              {/* PREVIEW */}

              <div className="rounded-xl bg-[#faf7f1] p-4">

                <p className="text-sm text-[#85776b]">
                  Pending Amount
                </p>

                <p className="mt-1 text-2xl font-bold text-red-600">
                  ₹
                  {Math.max(
                    Number(totalInput || 0) -
                      Number(paidInput || 0),
                    0
                  ).toLocaleString()}
                </p>

              </div>

            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 border-t border-[#e8e0d5] p-6">

              <button
                onClick={() =>
                  setEditingStudent(null)
                }
                className="rounded-xl border border-[#ddd3c6] px-4 py-2.5 text-sm font-semibold text-[#62564d]"
              >
                Cancel
              </button>

              <button
                onClick={saveFee}
                className="rounded-xl bg-[#4b171b] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#641f25]"
              >
                Save Fees
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

function SummaryCard({
  title,
  value,
  valueClass = "text-[#4b171b]",
}) {
  return (
    <div className="rounded-2xl border border-[#ded6ca] bg-white p-5 shadow-sm">

      <p className="text-sm text-[#85776b]">
        {title}
      </p>

      <p
        className={`mt-2 text-2xl font-bold ${valueClass}`}
      >
        {value}
      </p>

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

export default Finance;