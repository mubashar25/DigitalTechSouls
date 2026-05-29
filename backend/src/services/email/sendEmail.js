import transporter from "./transport.js";

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,

    to,

    subject,

    html,
  };

  const info =
    await transporter.sendMail(
      mailOptions
    );

  return info;
};

export default sendEmail;