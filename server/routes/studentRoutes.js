const express = require("express");

const router = express.Router();

// Get all students
router.get("/", (req, res) => {
  res.send("Get all students");
});

// Get single student
router.get("/:id", (req, res) => {
  res.send(`Get student ${req.params.id}`);
});

// Add new student
router.post("/", (req, res) => {
  res.send("Add new student");
});

// Update student
router.put("/:id", (req, res) => {
  res.send(`Update student ${req.params.id}`);
});

// Delete student
router.delete("/:id", (req, res) => {
  res.send(`Delete student ${req.params.id}`);
});

module.exports = router;