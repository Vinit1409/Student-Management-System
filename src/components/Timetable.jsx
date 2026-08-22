import { useMemo, useState } from "react";

function Timetable() {
  const [department, setDepartment] =
    useState("Computer Engineering");

  const [year, setYear] =
    useState("2nd Year");

  const [semester, setSemester] =
    useState("Semester 3");

  // =====================================================
  // DEPARTMENTS
  // SAME DEPARTMENTS AS DEPARTMENTS PAGE
  // =====================================================

  const departments = [
    {
      name: "Computer Engineering",
      code: "COMPS",
    },
    {
      name: "Information Technology",
      code: "IT",
    },
    {
      name: "Electronics Engineering",
      code: "EXTC",
    },
    {
      name: "Mechanical Engineering",
      code: "MECH",
    },
    {
      name: "Civil Engineering",
      code: "CIVIL",
    },
    {
      name: "Artificial Intelligence",
      code: "AI",
    },
  ];

  // =====================================================
  // TIMETABLE DATA
  // =====================================================

  const timetableData = [

    // ===================================================
    // COMPUTER ENGINEERING
    // 2ND YEAR - SEMESTER 3
    // ===================================================

    {
      id: 1,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "08:30 - 09:30",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Mehta",
      room: "COMPS-201",
    },

    {
      id: 2,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "09:30 - 10:30",
      subject: "Database Management",
      faculty: "Prof. Neha Shah",
      room: "COMPS-201",
    },

    {
      id: 3,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "10:45 - 11:45",
      subject: "Operating Systems",
      faculty: "Dr. Amit Joshi",
      room: "COMPS-202",
    },

    {
      id: 4,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "11:45 - 12:45",
      subject: "Computer Networks",
      faculty: "Prof. Rohan Patil",
      room: "COMPS-203",
    },

    {
      id: 5,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "01:30 - 02:30",
      subject: "Web Development",
      faculty: "Prof. Sneha Kulkarni",
      room: "LAB-1",
    },

    {
      id: 6,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "02:30 - 03:30",
      subject: "Web Development Lab",
      faculty: "Prof. Sneha Kulkarni",
      room: "LAB-1",
    },

    // Tuesday

    {
      id: 7,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "08:30 - 09:30",
      subject: "Operating Systems",
      faculty: "Dr. Amit Joshi",
      room: "COMPS-202",
    },

    {
      id: 8,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "09:30 - 10:30",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Mehta",
      room: "COMPS-201",
    },

    {
      id: 9,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "10:45 - 11:45",
      subject: "Database Management",
      faculty: "Prof. Neha Shah",
      room: "COMPS-201",
    },

    {
      id: 10,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "11:45 - 12:45",
      subject: "Computer Networks",
      faculty: "Prof. Rohan Patil",
      room: "COMPS-203",
    },

    {
      id: 11,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "01:30 - 02:30",
      subject: "Data Structures Lab",
      faculty: "Dr. Rajesh Mehta",
      room: "LAB-2",
    },

    // Wednesday

    {
      id: 12,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "08:30 - 09:30",
      subject: "Computer Networks",
      faculty: "Prof. Rohan Patil",
      room: "COMPS-203",
    },

    {
      id: 13,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "09:30 - 10:30",
      subject: "Web Development",
      faculty: "Prof. Sneha Kulkarni",
      room: "COMPS-204",
    },

    {
      id: 14,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "10:45 - 11:45",
      subject: "Operating Systems",
      faculty: "Dr. Amit Joshi",
      room: "COMPS-202",
    },

    {
      id: 15,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "11:45 - 12:45",
      subject: "Database Management",
      faculty: "Prof. Neha Shah",
      room: "COMPS-201",
    },

    // Thursday - LONG DAY

    {
      id: 16,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "08:30 - 09:30",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Mehta",
      room: "COMPS-201",
    },

    {
      id: 17,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "09:30 - 10:30",
      subject: "Computer Networks",
      faculty: "Prof. Rohan Patil",
      room: "COMPS-203",
    },

    {
      id: 18,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "10:45 - 11:45",
      subject: "Operating Systems",
      faculty: "Dr. Amit Joshi",
      room: "COMPS-202",
    },

    {
      id: 19,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "11:45 - 12:45",
      subject: "Database Management",
      faculty: "Prof. Neha Shah",
      room: "COMPS-201",
    },

    {
      id: 20,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "01:30 - 02:30",
      subject: "Computer Programming Lab",
      faculty: "Prof. Sneha Kulkarni",
      room: "LAB-1",
    },

    {
      id: 21,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "02:30 - 03:30",
      subject: "Computer Programming Lab",
      faculty: "Prof. Sneha Kulkarni",
      room: "LAB-1",
    },

    // Friday

    {
      id: 22,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "08:30 - 09:30",
      subject: "Database Management",
      faculty: "Prof. Neha Shah",
      room: "COMPS-201",
    },

    {
      id: 23,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "09:30 - 10:30",
      subject: "Data Structures",
      faculty: "Dr. Rajesh Mehta",
      room: "COMPS-201",
    },

    {
      id: 24,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "10:45 - 11:45",
      subject: "Web Development",
      faculty: "Prof. Sneha Kulkarni",
      room: "COMPS-204",
    },

    {
      id: 25,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "11:45 - 12:45",
      subject: "Operating Systems",
      faculty: "Dr. Amit Joshi",
      room: "COMPS-202",
    },

    // Saturday

    {
      id: 26,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "08:30 - 09:30",
      subject: "Computer Networks",
      faculty: "Prof. Rohan Patil",
      room: "COMPS-203",
    },

    {
      id: 27,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "09:30 - 10:30",
      subject: "Web Development",
      faculty: "Prof. Sneha Kulkarni",
      room: "COMPS-204",
    },

    {
      id: 28,
      department: "Computer Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "10:45 - 11:45",
      subject: "Project Work",
      faculty: "Dr. Rajesh Mehta",
      room: "COMPS-LAB",
    },

    // ===================================================
    // INFORMATION TECHNOLOGY
    // ===================================================

    {
      id: 101,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "08:30 - 09:30",
      subject: "Object Oriented Programming",
      faculty: "Dr. Neha Sharma",
      room: "IT-201",
    },

    {
      id: 102,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "09:30 - 10:30",
      subject: "Database Management",
      faculty: "Prof. Amit Shah",
      room: "IT-202",
    },

    {
      id: 103,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "10:45 - 11:45",
      subject: "Computer Networks",
      faculty: "Dr. Rohan Patil",
      room: "IT-203",
    },

    {
      id: 104,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "11:45 - 12:45",
      subject: "Software Engineering",
      faculty: "Prof. Priya Desai",
      room: "IT-204",
    },

    {
      id: 105,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "01:30 - 02:30",
      subject: "Web Technologies",
      faculty: "Prof. Neha Sharma",
      room: "IT-LAB",
    },

    {
      id: 106,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "02:30 - 03:30",
      subject: "Web Technologies Lab",
      faculty: "Prof. Neha Sharma",
      room: "IT-LAB",
    },

    {
      id: 107,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "08:30 - 09:30",
      subject: "Database Management",
      faculty: "Prof. Amit Shah",
      room: "IT-202",
    },

    {
      id: 108,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "09:30 - 10:30",
      subject: "Operating Systems",
      faculty: "Dr. Rohan Patil",
      room: "IT-203",
    },

    {
      id: 109,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "10:45 - 11:45",
      subject: "Object Oriented Programming",
      faculty: "Dr. Neha Sharma",
      room: "IT-201",
    },

    {
      id: 110,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "08:30 - 09:30",
      subject: "Software Engineering",
      faculty: "Prof. Priya Desai",
      room: "IT-204",
    },

    {
      id: 111,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "09:30 - 10:30",
      subject: "Computer Networks",
      faculty: "Dr. Rohan Patil",
      room: "IT-203",
    },

    {
      id: 112,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "10:45 - 11:45",
      subject: "Database Lab",
      faculty: "Prof. Amit Shah",
      room: "IT-LAB",
    },

    {
      id: 113,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "11:45 - 12:45",
      subject: "Database Lab",
      faculty: "Prof. Amit Shah",
      room: "IT-LAB",
    },

    {
      id: 114,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "08:30 - 09:30",
      subject: "Operating Systems",
      faculty: "Dr. Rohan Patil",
      room: "IT-203",
    },

    {
      id: 115,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "09:30 - 10:30",
      subject: "Web Technologies",
      faculty: "Prof. Neha Sharma",
      room: "IT-204",
    },

    {
      id: 116,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "10:45 - 11:45",
      subject: "Object Oriented Programming",
      faculty: "Dr. Neha Sharma",
      room: "IT-201",
    },

    {
      id: 117,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "11:45 - 12:45",
      subject: "Computer Networks",
      faculty: "Dr. Rohan Patil",
      room: "IT-203",
    },

    {
      id: 118,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "01:30 - 02:30",
      subject: "Project Lab",
      faculty: "Prof. Priya Desai",
      room: "IT-LAB",
    },

    {
      id: 119,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "02:30 - 03:30",
      subject: "Project Lab",
      faculty: "Prof. Priya Desai",
      room: "IT-LAB",
    },

    {
      id: 120,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "08:30 - 09:30",
      subject: "Software Engineering",
      faculty: "Prof. Priya Desai",
      room: "IT-204",
    },

    {
      id: 121,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "09:30 - 10:30",
      subject: "Database Management",
      faculty: "Prof. Amit Shah",
      room: "IT-202",
    },

    {
      id: 122,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "10:45 - 11:45",
      subject: "Web Technologies",
      faculty: "Prof. Neha Sharma",
      room: "IT-204",
    },

    {
      id: 123,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "08:30 - 09:30",
      subject: "Computer Networks",
      faculty: "Dr. Rohan Patil",
      room: "IT-203",
    },

    {
      id: 124,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "09:30 - 10:30",
      subject: "OOP Lab",
      faculty: "Dr. Neha Sharma",
      room: "IT-LAB",
    },

    {
      id: 125,
      department: "Information Technology",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "10:45 - 11:45",
      subject: "Project Work",
      faculty: "Prof. Priya Desai",
      room: "IT-LAB",
    },

    // ===================================================
    // ELECTRONICS ENGINEERING
    // ===================================================

    {
      id: 201,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "08:30 - 09:30",
      subject: "Electronic Devices",
      faculty: "Dr. Amit Kulkarni",
      room: "EXTC-201",
    },

    {
      id: 202,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "09:30 - 10:30",
      subject: "Digital Electronics",
      faculty: "Prof. Sneha Patil",
      room: "EXTC-202",
    },

    {
      id: 203,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "10:45 - 11:45",
      subject: "Signals and Systems",
      faculty: "Dr. Rohan Joshi",
      room: "EXTC-203",
    },

    {
      id: 204,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "11:45 - 12:45",
      subject: "Network Theory",
      faculty: "Prof. Kavita Shah",
      room: "EXTC-204",
    },

    {
      id: 205,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "08:30 - 09:30",
      subject: "Digital Electronics",
      faculty: "Prof. Sneha Patil",
      room: "EXTC-202",
    },

    {
      id: 206,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "09:30 - 10:30",
      subject: "Electronic Devices",
      faculty: "Dr. Amit Kulkarni",
      room: "EXTC-201",
    },

    {
      id: 207,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "10:45 - 11:45",
      subject: "Electronics Lab",
      faculty: "Dr. Amit Kulkarni",
      room: "EXTC-LAB",
    },

    {
      id: 208,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "11:45 - 12:45",
      subject: "Electronics Lab",
      faculty: "Dr. Amit Kulkarni",
      room: "EXTC-LAB",
    },

    {
      id: 209,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "08:30 - 09:30",
      subject: "Signals and Systems",
      faculty: "Dr. Rohan Joshi",
      room: "EXTC-203",
    },

    {
      id: 210,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "09:30 - 10:30",
      subject: "Network Theory",
      faculty: "Prof. Kavita Shah",
      room: "EXTC-204",
    },

    {
      id: 211,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "10:45 - 11:45",
      subject: "Microprocessors",
      faculty: "Prof. Amit Shah",
      room: "EXTC-205",
    },

    {
      id: 212,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "11:45 - 12:45",
      subject: "Microprocessors Lab",
      faculty: "Prof. Amit Shah",
      room: "EXTC-LAB",
    },

    {
      id: 213,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "08:30 - 09:30",
      subject: "Electronic Devices",
      faculty: "Dr. Amit Kulkarni",
      room: "EXTC-201",
    },

    {
      id: 214,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "09:30 - 10:30",
      subject: "Digital Electronics",
      faculty: "Prof. Sneha Patil",
      room: "EXTC-202",
    },

    {
      id: 215,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "10:45 - 11:45",
      subject: "Signals and Systems",
      faculty: "Dr. Rohan Joshi",
      room: "EXTC-203",
    },

    {
      id: 216,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "11:45 - 12:45",
      subject: "Project Lab",
      faculty: "Dr. Amit Kulkarni",
      room: "EXTC-LAB",
    },

    {
      id: 217,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "01:30 - 02:30",
      subject: "Communication Systems",
      faculty: "Prof. Kavita Shah",
      room: "EXTC-206",
    },

    {
      id: 218,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "02:30 - 03:30",
      subject: "Communication Systems Lab",
      faculty: "Prof. Kavita Shah",
      room: "EXTC-LAB",
    },

    {
      id: 219,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "08:30 - 09:30",
      subject: "Network Theory",
      faculty: "Prof. Kavita Shah",
      room: "EXTC-204",
    },

    {
      id: 220,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "09:30 - 10:30",
      subject: "Microprocessors",
      faculty: "Prof. Amit Shah",
      room: "EXTC-205",
    },

    {
      id: 221,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "08:30 - 09:30",
      subject: "Digital Electronics",
      faculty: "Prof. Sneha Patil",
      room: "EXTC-202",
    },

    {
      id: 222,
      department: "Electronics Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "09:30 - 10:30",
      subject: "Project Work",
      faculty: "Dr. Amit Kulkarni",
      room: "EXTC-LAB",
    },

    // ===================================================
    // MECHANICAL ENGINEERING
    // ===================================================

    {
      id: 301,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "08:30 - 09:30",
      subject: "Thermodynamics",
      faculty: "Dr. Sameer Patil",
      room: "MECH-201",
    },

    {
      id: 302,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "09:30 - 10:30",
      subject: "Fluid Mechanics",
      faculty: "Prof. Amit Desai",
      room: "MECH-202",
    },

    {
      id: 303,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "10:45 - 11:45",
      subject: "Manufacturing Processes",
      faculty: "Dr. Rahul Shah",
      room: "MECH-203",
    },

    {
      id: 304,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "11:45 - 12:45",
      subject: "Engineering Mechanics",
      faculty: "Prof. Nitin Joshi",
      room: "MECH-204",
    },

    {
      id: 305,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "08:30 - 09:30",
      subject: "Engineering Mechanics",
      faculty: "Prof. Nitin Joshi",
      room: "MECH-204",
    },

    {
      id: 306,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "09:30 - 10:30",
      subject: "Thermodynamics",
      faculty: "Dr. Sameer Patil",
      room: "MECH-201",
    },

    {
      id: 307,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "10:45 - 11:45",
      subject: "Mechanical Workshop",
      faculty: "Prof. Amit Desai",
      room: "WORKSHOP",
    },

    {
      id: 308,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "11:45 - 12:45",
      subject: "Mechanical Workshop",
      faculty: "Prof. Amit Desai",
      room: "WORKSHOP",
    },

    {
      id: 309,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "08:30 - 09:30",
      subject: "Fluid Mechanics",
      faculty: "Prof. Amit Desai",
      room: "MECH-202",
    },

    {
      id: 310,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "09:30 - 10:30",
      subject: "Machine Design",
      faculty: "Dr. Rahul Shah",
      room: "MECH-205",
    },

    {
      id: 311,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "10:45 - 11:45",
      subject: "Manufacturing Processes",
      faculty: "Dr. Rahul Shah",
      room: "MECH-203",
    },

    {
      id: 312,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "08:30 - 09:30",
      subject: "Thermodynamics",
      faculty: "Dr. Sameer Patil",
      room: "MECH-201",
    },

    {
      id: 313,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "09:30 - 10:30",
      subject: "Machine Design",
      faculty: "Dr. Rahul Shah",
      room: "MECH-205",
    },

    {
      id: 314,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "10:45 - 11:45",
      subject: "CAD Lab",
      faculty: "Prof. Nitin Joshi",
      room: "CAD-LAB",
    },

    {
      id: 315,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "11:45 - 12:45",
      subject: "CAD Lab",
      faculty: "Prof. Nitin Joshi",
      room: "CAD-LAB",
    },

    {
      id: 316,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "01:30 - 02:30",
      subject: "Manufacturing Lab",
      faculty: "Dr. Rahul Shah",
      room: "MECH-LAB",
    },

    {
      id: 317,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "02:30 - 03:30",
      subject: "Manufacturing Lab",
      faculty: "Dr. Rahul Shah",
      room: "MECH-LAB",
    },

    {
      id: 318,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "08:30 - 09:30",
      subject: "Fluid Mechanics",
      faculty: "Prof. Amit Desai",
      room: "MECH-202",
    },

    {
      id: 319,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "09:30 - 10:30",
      subject: "Engineering Mechanics",
      faculty: "Prof. Nitin Joshi",
      room: "MECH-204",
    },

    {
      id: 320,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "08:30 - 09:30",
      subject: "Machine Design",
      faculty: "Dr. Rahul Shah",
      room: "MECH-205",
    },

    {
      id: 321,
      department: "Mechanical Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "09:30 - 10:30",
      subject: "Project Work",
      faculty: "Dr. Sameer Patil",
      room: "MECH-LAB",
    },

    // ===================================================
    // CIVIL ENGINEERING
    // ===================================================

    {
      id: 401,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "08:30 - 09:30",
      subject: "Structural Analysis",
      faculty: "Dr. Priya Desai",
      room: "CIVIL-201",
    },

    {
      id: 402,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "09:30 - 10:30",
      subject: "Fluid Mechanics",
      faculty: "Prof. Rahul Patil",
      room: "CIVIL-202",
    },

    {
      id: 403,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "10:45 - 11:45",
      subject: "Surveying",
      faculty: "Dr. Amit Shah",
      room: "CIVIL-203",
    },

    {
      id: 404,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "11:45 - 12:45",
      subject: "Concrete Technology",
      faculty: "Prof. Neha Joshi",
      room: "CIVIL-204",
    },

    {
      id: 405,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "08:30 - 09:30",
      subject: "Surveying",
      faculty: "Dr. Amit Shah",
      room: "CIVIL-203",
    },

    {
      id: 406,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "09:30 - 10:30",
      subject: "Structural Analysis",
      faculty: "Dr. Priya Desai",
      room: "CIVIL-201",
    },

    {
      id: 407,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "10:45 - 11:45",
      subject: "Surveying Lab",
      faculty: "Dr. Amit Shah",
      room: "SURVEY-LAB",
    },

    {
      id: 408,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "11:45 - 12:45",
      subject: "Surveying Lab",
      faculty: "Dr. Amit Shah",
      room: "SURVEY-LAB",
    },

    {
      id: 409,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "08:30 - 09:30",
      subject: "Concrete Technology",
      faculty: "Prof. Neha Joshi",
      room: "CIVIL-204",
    },

    {
      id: 410,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "09:30 - 10:30",
      subject: "Geotechnical Engineering",
      faculty: "Dr. Rahul Patil",
      room: "CIVIL-205",
    },

    {
      id: 411,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "10:45 - 11:45",
      subject: "Environmental Engineering",
      faculty: "Prof. Amit Shah",
      room: "CIVIL-206",
    },

    {
      id: 412,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "08:30 - 09:30",
      subject: "Structural Analysis",
      faculty: "Dr. Priya Desai",
      room: "CIVIL-201",
    },

    {
      id: 413,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "09:30 - 10:30",
      subject: "Fluid Mechanics",
      faculty: "Prof. Rahul Patil",
      room: "CIVIL-202",
    },

    {
      id: 414,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "10:45 - 11:45",
      subject: "Civil Engineering Lab",
      faculty: "Dr. Priya Desai",
      room: "CIVIL-LAB",
    },

    {
      id: 415,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "11:45 - 12:45",
      subject: "Civil Engineering Lab",
      faculty: "Dr. Priya Desai",
      room: "CIVIL-LAB",
    },

    {
      id: 416,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "01:30 - 02:30",
      subject: "Construction Practice",
      faculty: "Prof. Neha Joshi",
      room: "CIVIL-LAB",
    },

    {
      id: 417,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "02:30 - 03:30",
      subject: "Construction Practice",
      faculty: "Prof. Neha Joshi",
      room: "CIVIL-LAB",
    },

    {
      id: 418,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "08:30 - 09:30",
      subject: "Geotechnical Engineering",
      faculty: "Dr. Rahul Patil",
      room: "CIVIL-205",
    },

    {
      id: 419,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "09:30 - 10:30",
      subject: "Concrete Technology",
      faculty: "Prof. Neha Joshi",
      room: "CIVIL-204",
    },

    {
      id: 420,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "08:30 - 09:30",
      subject: "Environmental Engineering",
      faculty: "Prof. Amit Shah",
      room: "CIVIL-206",
    },

    {
      id: 421,
      department: "Civil Engineering",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "09:30 - 10:30",
      subject: "Project Work",
      faculty: "Dr. Priya Desai",
      room: "CIVIL-LAB",
    },

    // ===================================================
    // ARTIFICIAL INTELLIGENCE
    // ===================================================

    {
      id: 501,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "08:30 - 09:30",
      subject: "Machine Learning",
      faculty: "Dr. Rohan Joshi",
      room: "AI-201",
    },

    {
      id: 502,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "09:30 - 10:30",
      subject: "Artificial Intelligence",
      faculty: "Prof. Neha Sharma",
      room: "AI-202",
    },

    {
      id: 503,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "10:45 - 11:45",
      subject: "Data Science",
      faculty: "Dr. Amit Kulkarni",
      room: "AI-203",
    },

    {
      id: 504,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "11:45 - 12:45",
      subject: "Deep Learning",
      faculty: "Prof. Rohan Patil",
      room: "AI-204",
    },

    {
      id: 505,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "01:30 - 02:30",
      subject: "Machine Learning Lab",
      faculty: "Dr. Rohan Joshi",
      room: "AI-LAB",
    },

    {
      id: 506,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Monday",
      time: "02:30 - 03:30",
      subject: "Machine Learning Lab",
      faculty: "Dr. Rohan Joshi",
      room: "AI-LAB",
    },

    {
      id: 507,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "08:30 - 09:30",
      subject: "Artificial Intelligence",
      faculty: "Prof. Neha Sharma",
      room: "AI-202",
    },

    {
      id: 508,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "09:30 - 10:30",
      subject: "Data Science",
      faculty: "Dr. Amit Kulkarni",
      room: "AI-203",
    },

    {
      id: 509,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Tuesday",
      time: "10:45 - 11:45",
      subject: "Python for AI",
      faculty: "Prof. Rohan Patil",
      room: "AI-205",
    },

    {
      id: 510,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "08:30 - 09:30",
      subject: "Deep Learning",
      faculty: "Prof. Rohan Patil",
      room: "AI-204",
    },

    {
      id: 511,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "09:30 - 10:30",
      subject: "Machine Learning",
      faculty: "Dr. Rohan Joshi",
      room: "AI-201",
    },

    {
      id: 512,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "10:45 - 11:45",
      subject: "AI Lab",
      faculty: "Prof. Neha Sharma",
      room: "AI-LAB",
    },

    {
      id: 513,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Wednesday",
      time: "11:45 - 12:45",
      subject: "AI Lab",
      faculty: "Prof. Neha Sharma",
      room: "AI-LAB",
    },

    {
      id: 514,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "08:30 - 09:30",
      subject: "Data Science",
      faculty: "Dr. Amit Kulkarni",
      room: "AI-203",
    },

    {
      id: 515,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "09:30 - 10:30",
      subject: "Python for AI",
      faculty: "Prof. Rohan Patil",
      room: "AI-205",
    },

    {
      id: 516,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "10:45 - 11:45",
      subject: "Deep Learning",
      faculty: "Prof. Rohan Patil",
      room: "AI-204",
    },

    {
      id: 517,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "11:45 - 12:45",
      subject: "AI Project",
      faculty: "Dr. Rohan Joshi",
      room: "AI-LAB",
    },

    {
      id: 518,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "01:30 - 02:30",
      subject: "Data Science Lab",
      faculty: "Dr. Amit Kulkarni",
      room: "AI-LAB",
    },

    {
      id: 519,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Thursday",
      time: "02:30 - 03:30",
      subject: "Data Science Lab",
      faculty: "Dr. Amit Kulkarni",
      room: "AI-LAB",
    },

    {
      id: 520,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "08:30 - 09:30",
      subject: "Machine Learning",
      faculty: "Dr. Rohan Joshi",
      room: "AI-201",
    },

    {
      id: 521,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Friday",
      time: "09:30 - 10:30",
      subject: "Artificial Intelligence",
      faculty: "Prof. Neha Sharma",
      room: "AI-202",
    },

    {
      id: 522,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "08:30 - 09:30",
      subject: "Deep Learning",
      faculty: "Prof. Rohan Patil",
      room: "AI-204",
    },

    {
      id: 523,
      department: "Artificial Intelligence",
      year: "2nd Year",
      semester: "Semester 3",
      day: "Saturday",
      time: "09:30 - 10:30",
      subject: "AI Project",
      faculty: "Dr. Rohan Joshi",
      room: "AI-LAB",
    },
  ];

  // =====================================================
  // FILTER
  // =====================================================

  const filteredTimetable = useMemo(() => {
    return timetableData.filter(
      (item) =>
        item.department === department &&
        item.year === year &&
        item.semester === semester
    );
  }, [
    department,
    year,
    semester,
  ]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getDaySchedule(day) {
    return filteredTimetable.filter(
      (item) => item.day === day
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <section>

        <p className="text-sm font-semibold text-[#9b333b]">
          Academics
        </p>

        <h1 className="mt-1 text-3xl font-bold text-[#302925]">
          Timetable
        </h1>

        <p className="mt-2 text-sm text-[#84786d]">
          View class schedules by department,
          year and semester.
        </p>

      </section>

      {/* FILTER */}

      <section className="rounded-2xl border border-[#ded6ca] bg-white p-6 shadow-sm">

        <div className="grid gap-4 md:grid-cols-3">

          {/* DEPARTMENT */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-[#51473f]">
              Department
            </label>

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm font-medium outline-none focus:border-[#8d3b42]"
            >

              {departments.map(
                (item) => (
                  <option
                    key={item.code}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                )
              )}

            </select>

          </div>

          {/* YEAR */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-[#51473f]">
              Year
            </label>

            <select
              value={year}
              onChange={(e) =>
                setYear(e.target.value)
              }
              className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm font-medium outline-none focus:border-[#8d3b42]"
            >

              <option value="1st Year">
                1st Year
              </option>

              <option value="2nd Year">
                2nd Year
              </option>

              <option value="3rd Year">
                3rd Year
              </option>

              <option value="4th Year">
                4th Year
              </option>

            </select>

          </div>

          {/* SEMESTER */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-[#51473f]">
              Semester
            </label>

            <select
              value={semester}
              onChange={(e) =>
                setSemester(e.target.value)
              }
              className="w-full rounded-xl border border-[#ddd3c6] bg-[#fcfaf6] px-4 py-3 text-sm font-medium outline-none focus:border-[#8d3b42]"
            >

              <option value="Semester 1">
                Semester 1
              </option>

              <option value="Semester 2">
                Semester 2
              </option>

              <option value="Semester 3">
                Semester 3
              </option>

              <option value="Semester 4">
                Semester 4
              </option>

              <option value="Semester 5">
                Semester 5
              </option>

              <option value="Semester 6">
                Semester 6
              </option>

              <option value="Semester 7">
                Semester 7
              </option>

              <option value="Semester 8">
                Semester 8
              </option>

            </select>

          </div>

        </div>

      </section>

      {/* CURRENT SELECTION */}

      <section className="rounded-2xl border border-[#d9c5aa] bg-[#f8efe3] p-5">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-[#967c65]">
              Current Timetable
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#4b171b]">
              {department}
              {" • "}
              {year}
              {" • "}
              {semester}
            </h2>

          </div>

          <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6d2529] shadow-sm">
            {filteredTimetable.length} Classes
          </div>

        </div>

      </section>

      {/* DAILY TIMETABLE */}

      <section className="space-y-5">

        {days.map((day) => {

          const schedule =
            getDaySchedule(day);

          return (
            <div
              key={day}
              className="overflow-hidden rounded-2xl border border-[#ded6ca] bg-white shadow-sm"
            >

              {/* DAY HEADER */}

              <div className="flex items-center justify-between border-b border-[#e8e0d5] bg-[#faf7f1] px-6 py-4">

                <h3 className="font-bold text-[#4b171b]">
                  {day}
                </h3>

                <span className="text-xs font-semibold text-[#95887c]">
                  {schedule.length}{" "}
                  {schedule.length === 1
                    ? "Lecture"
                    : "Lectures"}
                </span>

              </div>

              {/* CLASSES */}

              {schedule.length > 0 ? (

                <div className="divide-y divide-[#eee7dc]">

                  {schedule.map(
                    (item) => (

                      <div
                        key={item.id}
                        className="grid gap-4 px-6 py-5 md:grid-cols-[160px_1fr_180px_110px] md:items-center"
                      >

                        {/* TIME */}

                        <div>

                          <p className="text-sm font-bold text-[#6d2529]">
                            {item.time}
                          </p>

                        </div>

                        {/* SUBJECT */}

                        <div>

                          <p className="font-bold text-[#332c28]">
                            {item.subject}
                          </p>

                          <p className="mt-1 text-xs text-[#95887c]">
                            {item.faculty}
                          </p>

                        </div>

                        {/* FACULTY */}

                        <div>

                          <p className="text-xs uppercase tracking-wide text-[#9a8d81]">
                            Faculty
                          </p>

                          <p className="mt-1 text-sm font-semibold text-[#51473f]">
                            {item.faculty}
                          </p>

                        </div>

                        {/* ROOM */}

                        <div>

                          <span className="rounded-lg bg-[#f3e9dc] px-3 py-2 text-xs font-bold text-[#6d2529]">
                            {item.room}
                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="px-6 py-10 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e9dc] text-[#6d2529]">
                    —
                  </div>

                  <p className="mt-3 font-semibold text-[#51473f]">
                    No classes scheduled
                  </p>

                  <p className="mt-1 text-sm text-[#95887c]">
                    No timetable has been added
                    for this department, year
                    and semester.
                  </p>

                </div>

              )}

            </div>
          );
        })}

      </section>

    </div>
  );
}

export default Timetable;