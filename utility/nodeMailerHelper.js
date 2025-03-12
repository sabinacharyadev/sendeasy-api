import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (email) => {
  try {
    const result = await transporter.sendMail(email);
    return result?.accepted;
  } catch (error) {
    console.log("Error", error);
    return false;
  }
};

export const sendEmailToClients = async (emails) => {
  const successEmails = [];
  for (const it of emails) {
    const emailObject = {
      from: process.env.SMTP_USER,
      to: it.email,
      subject: it.subject,
      html: it.htmlBody,
    };

    const result = await sendEmail(emailObject);
    if (!result) {
      return false;
    } else {
      successEmails.push(result.toString());
    }
  }
  return successEmails;
};
