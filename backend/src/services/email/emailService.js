import sendEmail from "./sendEmail.js";

import welcomeEmailTemplate
  from "./templates/welcomeEmailTemplate.js";

import orderConfirmationTemplate
  from "./templates/orderConfirmationTemplate.js";

import invoiceEmailTemplate
  from "./templates/invoiceEmailTemplate.js";

import passwordResetTemplate
  from "./templates/passwordResetTemplate.js";

const sendWelcomeEmail =
  async (user) => {
    const html =
      welcomeEmailTemplate(user);

    return await sendEmail({
      to: user.email,

      subject:
        "Welcome To DigitalTechSouls 🚀",

      html,
    });
  };

const sendOrderConfirmationEmail =
  async ({
    user,
    order,
  }) => {
    const html =
      orderConfirmationTemplate({
        user,
        order,
      });

    return await sendEmail({
      to: user.email,

      subject:
        "Order Confirmation",

      html,
    });
  };

const sendInvoiceEmail =
  async ({
    user,
    invoice,
  }) => {
    const html =
      invoiceEmailTemplate({
        user,
        invoice,
      });

    return await sendEmail({
      to: user.email,

      subject:
        "Invoice Generated",

      html,
    });
  };

const sendPasswordResetEmail =
  async ({
    user,
    resetLink,
  }) => {
    const html =
      passwordResetTemplate({
        user,
        resetLink,
      });

    return await sendEmail({
      to: user.email,

      subject:
        "Password Reset Request",

      html,
    });
  };

export {
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendInvoiceEmail,
  sendPasswordResetEmail,
};