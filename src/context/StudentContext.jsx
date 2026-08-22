import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { initialStudents } from "../data/students";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  // ==================================================
  // STUDENTS
  // ==================================================

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem(
      "student-management-students"
    );

    return savedStudents
      ? JSON.parse(savedStudents)
      : initialStudents;
  });

  // ==================================================
  // ATTENDANCE
  // ==================================================

  const [attendance, setAttendance] = useState(() => {
    const savedAttendance = localStorage.getItem(
      "student-management-attendance"
    );

    return savedAttendance
      ? JSON.parse(savedAttendance)
      : {};
  });

  // ==================================================
  // FEES
  // ==================================================

  const [fees, setFees] = useState(() => {
    const savedFees = localStorage.getItem(
      "student-management-fees"
    );

    return savedFees
      ? JSON.parse(savedFees)
      : {};
  });

  // ==================================================
  // useEffect - STUDENTS
  // ==================================================

  useEffect(() => {
    localStorage.setItem(
      "student-management-students",
      JSON.stringify(students)
    );
  }, [students]);

  // ==================================================
  // useEffect - ATTENDANCE
  // ==================================================

  useEffect(() => {
    localStorage.setItem(
      "student-management-attendance",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  // ==================================================
  // useEffect - FEES
  // ==================================================

  useEffect(() => {
    localStorage.setItem(
      "student-management-fees",
      JSON.stringify(fees)
    );
  }, [fees]);

  // ==================================================
  // ADD STUDENT
  // ==================================================

  function addStudent(student) {
    const newStudent = {
      ...student,
      id: Date.now(),
    };

    setStudents((current) => [
      newStudent,
      ...current,
    ]);

    // New student ka attendance initially empty
    setAttendance((current) => ({
      ...current,
      [newStudent.id]: {
        present: 0,
        absent: 0,
      },
    }));

    // New student ka fee record
    setFees((current) => ({
      ...current,
      [newStudent.id]: {
        total: 80000,
        paid: 0,
      },
    }));
  }

  // ==================================================
  // UPDATE STUDENT
  // ==================================================

  function updateStudent(updatedStudent) {
    setStudents((current) =>
      current.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    );
  }

  // ==================================================
  // DELETE STUDENT
  // ==================================================

  function deleteStudent(studentId) {
    setStudents((current) =>
      current.filter(
        (student) =>
          student.id !== studentId
      )
    );

    // Delete attendance record
    setAttendance((current) => {
      const updated = { ...current };

      delete updated[studentId];

      return updated;
    });

    // Delete fee record
    setFees((current) => {
      const updated = { ...current };

      delete updated[studentId];

      return updated;
    });
  }

  // ==================================================
  // MARK PRESENT
  // ==================================================

  function markPresent(studentId) {
    setAttendance((current) => {
      const oldData = current[studentId] || {
        present: 0,
        absent: 0,
      };

      return {
        ...current,
        [studentId]: {
          ...oldData,
          present: oldData.present + 1,
        },
      };
    });
  }

  // ==================================================
  // MARK ABSENT
  // ==================================================

  function markAbsent(studentId) {
    setAttendance((current) => {
      const oldData = current[studentId] || {
        present: 0,
        absent: 0,
      };

      return {
        ...current,
        [studentId]: {
          ...oldData,
          absent: oldData.absent + 1,
        },
      };
    });
  }

  // ==================================================
  // RESET ATTENDANCE
  // ==================================================

  function resetAttendance(studentId) {
    setAttendance((current) => ({
      ...current,
      [studentId]: {
        present: 0,
        absent: 0,
      },
    }));
  }

  // ==================================================
  // UPDATE TOTAL FEES
  // ==================================================

  function updateTotalFees(
    studentId,
    total
  ) {
    setFees((current) => {
      const oldData = current[studentId] || {
        total: 0,
        paid: 0,
      };

      return {
        ...current,
        [studentId]: {
          ...oldData,
          total: Number(total),
        },
      };
    });
  }

  // ==================================================
  // ADD FEE PAYMENT
  // ==================================================

  function addFeePayment(
    studentId,
    amount
  ) {
    setFees((current) => {
      const oldData = current[studentId] || {
        total: 80000,
        paid: 0,
      };

      const newPaid =
        oldData.paid + Number(amount);

      return {
        ...current,
        [studentId]: {
          ...oldData,
          paid: Math.min(
            newPaid,
            oldData.total
          ),
        },
      };
    });
  }

  // ==================================================
  // SET PAID AMOUNT
  // ==================================================

  function setPaidAmount(
    studentId,
    amount
  ) {
    setFees((current) => {
      const oldData = current[studentId] || {
        total: 80000,
        paid: 0,
      };

      return {
        ...current,
        [studentId]: {
          ...oldData,
          paid: Math.min(
            Number(amount),
            oldData.total
          ),
        },
      };
    });
  }

  // ==================================================
  // CONTEXT VALUE
  // ==================================================

  return (
    <StudentContext.Provider
      value={{
        students,

        addStudent,
        updateStudent,
        deleteStudent,

        attendance,
        markPresent,
        markAbsent,
        resetAttendance,

        fees,
        updateTotalFees,
        addFeePayment,
        setPaidAmount,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

// ==================================================
// CUSTOM HOOK
// ==================================================

export function useStudents() {
  const context =
    useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudents must be used inside StudentProvider"
    );
  }

  return context;
}