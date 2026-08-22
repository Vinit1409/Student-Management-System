import { createContext, useContext, useEffect, useState } from "react";

const TimetableContext = createContext();

export function TimetableProvider({ children }) {
  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("student_timetable");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "student_timetable",
      JSON.stringify(timetable)
    );
  }, [timetable]);

  function addLecture(lecture) {
    const newLecture = {
      ...lecture,
      id: Date.now(),
    };

    setTimetable((current) => [
      ...current,
      newLecture,
    ]);
  }

  function updateLecture(updatedLecture) {
    setTimetable((current) =>
      current.map((lecture) =>
        lecture.id === updatedLecture.id
          ? updatedLecture
          : lecture
      )
    );
  }

  function deleteLecture(id) {
    setTimetable((current) =>
      current.filter(
        (lecture) => lecture.id !== id
      )
    );
  }

  function getTimetable(
    department,
    year,
    division
  ) {
    return timetable.filter(
      (lecture) =>
        lecture.department === department &&
        lecture.year === year &&
        lecture.division === division
    );
  }

  return (
    <TimetableContext.Provider
      value={{
        timetable,
        addLecture,
        updateLecture,
        deleteLecture,
        getTimetable,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetable() {
  const context = useContext(TimetableContext);

  if (!context) {
    throw new Error(
      "useTimetable must be used inside TimetableProvider"
    );
  }

  return context;
}