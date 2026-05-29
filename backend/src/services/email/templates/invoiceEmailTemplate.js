const invoiceEmailTemplate =
  ({
    user,
    invoice,
  }) => {
    return `
      <div style="
        font-family: Arial;
        padding: 40px;
      ">

        <h2>
          Invoice Generated 🧾
        </h2>

        <p>
          Hello ${user.name},
        </p>

        <p>
          Your invoice is ready.
        </p>

        <h3>
          Invoice:
          ${invoice.invoiceNumber}
        </h3>

        <h3>
          Total:
          $${invoice.total}
        </h3>

      </div>
    `;
  };

export default
  invoiceEmailTemplate;