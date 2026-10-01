import nodemailer from 'nodemailer';

const sendmail = async (to, subject, text, html) => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, '');
  if (!user || !pass) {
    throw new Error('Email notifications are not configured. Set SMTP_USER and SMTP_APP_PASSWORD.');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM || `UNIFINDS <${user}>`,
    to,
    subject,
    text,
    html,
  });

  console.log('Order notification email sent:', info.messageId);
};

export default sendmail;
