const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendStudentRegistrationEmail = async (student) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // फिलहाल email apne Gmail pe aayega
    subject: "New Student Registered",
    html: `
      <h2>New Student Added</h2>

      <p><strong>Name:</strong> ${student.name}</p>
      <p><strong>Email:</strong> ${student.email}</p>
      <p><strong>Phone:</strong> ${student.phone}</p>
      <p><strong>Department:</strong> ${student.department}</p>
      <p><strong>Year:</strong> ${student.year}</p>
      <p><strong>Division:</strong> ${student.division}</p>
      <p><strong>CGPA:</strong> ${student.cgpa}</p>
      <p><strong>Status:</strong> ${student.status}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendStudentRegistrationEmail,
};