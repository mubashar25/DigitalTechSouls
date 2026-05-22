const welcomeEmailTemplate =
  (user) => {
    return `
      <div style="
        font-family: Arial;
        padding: 40px;
        background: #f8fafc;
      ">

        <h1 style="
          color: #2563eb;
        ">
          Welcome ${user.name} 🚀
        </h1>

        <p>
          Thank you for joining
          DigitalTechSouls.
        </p>

        <p>
          Your hosting journey starts now.
        </p>

      </div>
    `;
  };

export default
  welcomeEmailTemplate;