import nodemailer from "nodemailer";

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"${process.env.FROM_NAME || "DigitalTechSouls"}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

// ================================
// EMAIL TEMPLATES
// ================================

export const sendVerificationEmail = async (user, token) => {
  const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  await sendEmail({
    to: user.email,
    subject: "Verify Your Email - DigitalTechSouls",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Welcome to DigitalTechSouls!</h2>
        <p>Hi ${user.fullName},</p>
        <p>Please verify your email address by clicking the button below:</p>
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #666;">This link expires in 24 hours.</p>
        <p style="color: #666;">If you didn't create an account, ignore this email.</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (user, token) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  await sendEmail({
    to: user.email,
    subject: "Password Reset - DigitalTechSouls",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Reset Your Password</h2>
        <p>Hi ${user.fullName},</p>
        <p>You requested a password reset. Click below to set a new password:</p>
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #666;">This link expires in 30 minutes.</p>
        <p style="color: #666;">If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
};

export const sendOrderConfirmationEmail = async (user, order) => {
  const itemsHtml = order.orderItems
    .map((item) => `<tr><td>${item.name}</td><td>$${item.price.toFixed(2)}</td></tr>`)
    .join("");

  await sendEmail({
    to: user.email,
    subject: `Order Confirmed #${order.orderNumber} - DigitalTechSouls`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a2e;">Order Confirmed!</h2>
        <p>Hi ${user.fullName}, your order <strong>#${order.orderNumber}</strong> has been confirmed.</p>
        <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
          <tr style="background: #f3f4f6;"><th style="padding: 8px; text-align:left;">Item</th><th style="padding: 8px; text-align:left;">Price</th></tr>
          ${itemsHtml}
          <tr><td style="padding: 8px;"><strong>Total</strong></td><td style="padding: 8px;"><strong>$${order.total.toFixed(2)}</strong></td></tr>
        </table>
        <p>Visit your <a href="${process.env.FRONTEND_URL}/dashboard">dashboard</a> to manage your services.</p>
      </div>
    `,
  });
};

export default sendEmail;