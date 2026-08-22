import { useMemo, useState } from "react";
import { initialFinance } from "../data/finance";

function Finance() {
  const [records] = useState(initialFinance);

  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("All Departments");
  const [status, setStatus] =
    useState("All Status");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const departments = [
    "All Departments",
    ...new Set(
      records.map((student) => student.department)
    ),
  ];

  // =========================
  // OVERALL CALCULATIONS
  // =========================

  const totalFee = records.reduce(
    (total, student) =>
      total + student.totalFee,
    0
  );

  const totalPaid = records.reduce(
    (total, student) =>
      total + student.paid,
    0
  );

  const totalDue = records.reduce(
    (total, student) =>
      total + student.due,
    0
  );

  const paidStudents = records.filter(
    (student) => student.status === "Paid"
  ).length;

  const partialStudents = records.filter(
    (student) => student.status === "Partial"
  ).length;

  const pendingStudents = records.filter(
    (student) => student.status === "Pending"
  ).length;

  // =========================
  // FILTER
  // =========================

  const filteredRecords = useMemo(() => {
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
          Finance & Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Fee Management
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          Track student fee payments, pending
          balances and payment history.
        </p>
      </section>

      {/* ========================= */}
      {/* SUMMARY CARDS */}
      {/* ========================= */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <FinanceCard
          title="Total Fees"
          value={formatCurrency(totalFee)}
          description={`${records.length} student records`}
          icon="₹"
          iconClass="bg-[#f0e1d2] text-[#6d2529]"
        />

        <FinanceCard
          title="Fees Collected"
          value={formatCurrency(totalPaid)}
          description={`${paidStudents} students fully paid`}
          icon="✓"
          iconClass="bg-[#e5efe4] text-[#35643b]"
        />

        <FinanceCard
          title="Total Pending"
          value={formatCurrency(totalDue)}
          description={`${pendingStudents + partialStudents} students have dues`}
          icon="!"
          iconClass="bg-[#f4e4e1] text-[#8b4e47]"
        />

        <FinanceCard
          title="Payment Rate"
          value={`${Math.round(
            (totalPaid / totalFee) * 100
          )}%`}
          description="Fees collected so far"
          icon="%"
          iconClass="bg-[#f1e7cf] text-[#856526]"
        />

      </section>

      {/* ========================= */}
      {/* PAYMENT STATUS */}
      {/* ========================= */}

      <section className="grid gap-4 md:grid-cols-3">

        <StatusSummary
          title="Paid Students"
          count={paidStudents}
          amount={records
            .filter(
              (student) =>
                student.status === "Paid"
            )
            .reduce(
              (sum, student) =>
                sum + student.paid,
              0
            )}
          type="paid"
        />

        <StatusSummary
          title="Partially Paid"
          count={partialStudents}
          amount={records
            .filter(
              (student) =>
                student.status === "Partial"
            )
            .reduce(
              (sum, student) =>
                sum + student.due,
              0
            )}
          type="partial"
        />

        <StatusSummary
          title="Pending Students"
          count={pendingStudents}
          amount={records
            .filter(
              (student) =>
                student.status === "Pending"
            )
            .reduce(
              (sum, student) =>
                sum + student.due,
              0
            )}
          type="pending"
        />

      </section>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}

      <section className="overflow-hidden rounded-2xl border border-[#ded6ca] bg-white shadow-sm">

        {/* FILTER BAR */}

        <div className="border-b border-[#e8e0d5] p-5">

          <div className="grid gap-3 md:grid-cols-[1fr_240px_170px]">

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

              <option value="Paid">
                Paid
              </option>

              <option value="Partial">
                Partial
              </option>

              <option value="Pending">
                Pending
              </option>
            </select>

          </div>

        </div>

        {/* DESKTOP TABLE */}

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
                  Total Fee
                </th>

                <th className={thClass}>
                  Paid
                </th>

                <th className={thClass}>
                  Pending
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

              {filteredRecords.map(
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

                          <p className="text-xs text-[#95887c]">
                            {student.lastPayment}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* STUDENT ID */}

                    <td className="px-6 py-4 text-sm font-semibold text-[#51473f]">
                      {student.studentId}
                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-6 py-4 text-sm text-[#665a50]">
                      {student.department}
                    </td>

                    {/* TOTAL */}

                    <td className="px-6 py-4 text-sm font-semibold text-[#332c28]">
                      {formatCurrency(
                        student.totalFee
                      )}
                    </td>

                    {/* PAID */}

                    <td className="px-6 py-4 text-sm font-bold text-[#35643b]">
                      {formatCurrency(
                        student.paid
                      )}
                    </td>

                    {/* PENDING */}

                    <td className="px-6 py-4 text-sm font-bold text-[#8b4e47]">
                      {formatCurrency(
                        student.due
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      <PaymentBadge
                        status={
                          student.status
                        }
                      />
                    </td>

                    {/* VIEW */}

                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          setSelectedStudent(
                            student
                          )
                        }
                        title="View Payment Details"
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

        {/* MOBILE CARDS */}

        <div className="divide-y divide-[#eee7dc] md:hidden">

          {filteredRecords.map(
            (student) => (

              <div
                key={student.id}
                className="p-5"
              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ead8c5] text-sm font-bold text-[#6d2529]">
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

                  <PaymentBadge
                    status={student.status}
                  />

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <MobileInfo
                    label="Department"
                    value={
                      student.department
                    }
                  />

                  <MobileInfo
                    label="Total Fee"
                    value={formatCurrency(
                      student.totalFee
                    )}
                  />

                  <MobileInfo
                    label="Paid"
                    value={formatCurrency(
                      student.paid
                    )}
                  />

                  <MobileInfo
                    label="Pending"
                    value={formatCurrency(
                      student.due
                    )}
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
                  View Payment Details
                </button>

              </div>

            )
          )}

        </div>

        {filteredRecords.length === 0 && (
          <div className="p-12 text-center">

            <p className="font-semibold text-[#4c433d]">
              No payment records found
            </p>

            <p className="mt-1 text-sm text-[#92857a]">
              Try another search or filter.
            </p>

          </div>
        )}

      </section>

      {/* ========================= */}
      {/* PAYMENT MODAL */}
      {/* ========================= */}

      {selectedStudent && (

        <PaymentModal
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
/* FINANCE CARD */
/* ========================= */

function FinanceCard({
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
/* STATUS SUMMARY */
/* ========================= */

function StatusSummary({
  title,
  count,
  amount,
  type,
}) {
  const styles = {
    paid: "border-[#d9e8d7] bg-[#f5faf4]",
    partial:
      "border-[#eadfc9] bg-[#fcf8ef]",
    pending:
      "border-[#ecd9d5] bg-[#fcf5f3]",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${styles[type]}`}
    >

      <div className="flex items-center justify-between">

        <p className="text-sm font-semibold text-[#51473f]">
          {title}
        </p>

        <p className="text-2xl font-bold text-[#332c28]">
          {count}
        </p>

      </div>

      <p className="mt-2 text-sm text-[#85776b]">
        {type === "paid"
          ? "Collected"
          : "Outstanding"}
      </p>

      <p className="mt-1 text-xl font-bold text-[#4b171b]">
        {formatCurrency(amount)}
      </p>

    </div>
  );
}

/* ========================= */
/* BADGE */
/* ========================= */

function PaymentBadge({ status }) {
  const styles = {
    Paid:
      "bg-[#e8f1e7] text-[#35643b]",
    Partial:
      "bg-[#f4e8cc] text-[#806323]",
    Pending:
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

function MobileInfo({ label, value }) {
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
/* PAYMENT MODAL */
/* ========================= */

function PaymentModal({
  student,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#eee7dc] p-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#9b333b]">
              Payment Details
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

        {/* DETAILS */}

        <div className="space-y-4 p-5">

          <div className="rounded-xl bg-[#faf7f1] p-4">

            <p className="text-xs text-[#918478]">
              Department
            </p>

            <p className="mt-1 font-semibold text-[#332c28]">
              {student.department}
            </p>

          </div>

          <div className="grid grid-cols-3 gap-3">

            <AmountBox
              label="Total Fee"
              amount={student.totalFee}
            />

            <AmountBox
              label="Paid"
              amount={student.paid}
            />

            <AmountBox
              label="Pending"
              amount={student.due}
            />

          </div>

          <div className="rounded-xl border border-[#e8e0d5] p-4">

            <div className="flex justify-between">

              <span className="text-sm text-[#85776b]">
                Payment Status
              </span>

              <PaymentBadge
                status={student.status}
              />

            </div>

            <div className="mt-4 flex justify-between text-sm">

              <span className="text-[#85776b]">
                Last Payment
              </span>

              <span className="font-semibold text-[#332c28]">
                {student.lastPayment}
              </span>

            </div>

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
  amount,
}) {
  return (
    <div className="rounded-xl bg-[#faf7f1] p-3 text-center">

      <p className="text-[11px] text-[#918478]">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-[#4b171b]">
        {formatCurrency(amount)}
      </p>

    </div>
  );
}

/* ========================= */
/* HELPERS */
/* ========================= */

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

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

export default Finance;