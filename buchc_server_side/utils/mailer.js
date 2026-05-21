import nodemailer from "nodemailer";

const createTransport = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE === "true";

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

let transport = null;

const getTransport = () => {
  if (!transport) {
    transport = createTransport();
  }

  return transport;
};

export const sendRegistrationCompleteMail = async ({
  to,
  name,
  studentId,
  currentSemester,
  registrationSemester,
}) => {
  const activeTransport = getTransport();

  if (!activeTransport) {
    return { skipped: true };
  }

  const mailOptions = {
    from:
      process.env.MAIL_FROM ||
      `Brac University Chess Club <${process.env.SMTP_USER || "noreply@buchc.com"}>`,
    replyTo: process.env.MAIL_REPLY_TO || "noreply@buchc.com",
    to,
    subject: "BUCHC Registration Completed",
    text: [
      `Hello ${name},`,
      "",
      "Your BUCHC registration has been completed successfully.",
      "",
      `Student ID: ${studentId}`,
      `Current Semester: ${currentSemester}`,
      `Registration Semester: ${registrationSemester}`,
      "",
      "Thank you for registering with BUCHC.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">BUCHC Registration Completed</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your BUCHC registration has been completed successfully.</p>
        
        
        <p>Thank you for registering with BUCHC.</p>
      </div>
    `,
  };

  return await activeTransport.sendMail(mailOptions);
};
