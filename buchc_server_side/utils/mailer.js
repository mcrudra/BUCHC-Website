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
      "Your registration has been successfully completed.",
      "",
      "We will notify you shortly about your interview date and time via email. Until then, please follow our official Facebook page for the latest updates and announcements: https://www.facebook.com/realbuchc",
      "",
      "You can also join our Discord server to communicate with us directly: https://discord.com/invite/KWyShyZaQz",
      "",
      "This is an auto-generated email. Please do not reply to this message.",
      "",
      "Thank you.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">Registration Completed</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Your registration has been successfully completed.</p>
        <p>We will notify you shortly about your interview date and time via email. Until then, please follow our official Facebook page for the latest updates and announcements: <a href="https://www.facebook.com/realbuchc" target="_blank">link</a></p>
        <p>You can also join our Discord server to communicate with us directly: <a href="https://discord.com/invite/KWyShyZaQz" target="_blank">link</a></p>
        <p style="color: #6b7280; font-size: 13px;">This is an auto-generated email. Please do not reply to this message.</p>
        <p>Thank you.</p>
      </div>
    `,
  };

  return await activeTransport.sendMail(mailOptions);
};
