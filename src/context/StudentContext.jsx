import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const StudentContext = createContext(null);

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState(() => {
    const savedAttendance = localStorage.getItem(
      "student-management-attendance" 
    );

    return savedAttendance
      ? JSON.parse(savedAttendance)
      : {};
  });

  const [fees, setFees] = useState(() => {
    const savedFees = localStorage.getItem(
      "student-management-fees"
    );

    return savedFees
      ? JSON.parse(savedFees)
      : {};
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const response = await api.get("/students");

      console.log("Students from API:", response.data);

      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  

  useEffect(() => {
    localStorage.setItem(
      "student-management-attendance",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(
      "student-management-fees",
      JSON.stringify(fees)
    );
  }, [fees]);

  async function addStudent(student) {
    try {
      console.log("Student Data:", student);
  
      const response = await api.post("/students", student);
  
      setStudents((current) => [
        response.data,
        ...current,
      ]);
  
      setAttendance((current) => ({
        ...current,
        [response.data._id]: {
          present: 0,
          absent: 0,
        },
      }));
  
      setFees((current) => ({
        ...current,
        [response.data._id]: {
          total: 80000,
          paid: 0,
        },
      }));
    } catch (error) {
      console.error("Add Student Error:", error);
  
      if (error.response) {
        console.log("Response Data:", error.response.data);
      }
  
      alert("Failed to add student");
    }
  }

  async function updateStudent(updatedStudent) {
    try {
      const response = await api.put(
        `/students/${updatedStudent._id}`,
        updatedStudent
      );

      setStudents((current) =>
        current.map((student) =>
          student._id === updatedStudent._id
            ? response.data
            : student
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    }
  }
  async function deleteStudent(studentId) {
    console.log("DELETE ID =", studentId);

    try {
      await api.delete(`/students/${studentId}`);

      setStudents((current) =>
        current.filter(
          (student) => student._id !== studentId
        )
      );

      setAttendance((current) => {
        const updated = { ...current };
        delete updated[studentId];
        return updated;
      });

      setFees((current) => {
        const updated = { ...current };
        delete updated[studentId];
        return updated;
      });
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
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

  function updateTotalFees(studentId, total) {
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

  function addFeePayment(studentId, amount) {
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
          paid: Math.min(newPaid, oldData.total),
        },
      };
    });
  }

  // ==================================================
  // SET PAID AMOUNT
  // ==================================================

  function setPaidAmount(studentId, amount) {
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

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudents must be used inside StudentProvider"
    );
  }

  return context;
}
