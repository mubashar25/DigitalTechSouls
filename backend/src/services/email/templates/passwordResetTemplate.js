const passwordResetTemplate =
  ({
    user,
    resetLink,
  }) => {
    return `
      <div style="
        font-family: Arial;
        padding: 40px;
      ">

        <h2>
          Password Reset 🔐
        </h2>

        <p>
          Hello ${user.name},
        </p>

        <p>
          Click below to reset password:
        </p>

        <a
          href="${resetLink}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #2563eb;
            color: white;
            text-decoration: none;
            border-radius: 8px;
          "
        >
          Reset Password
        </a>

      </div>
    `;
  };

export default
  passwordResetTemplate;