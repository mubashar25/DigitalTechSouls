import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import useAuth
  from "../../hooks/useAuth";

import Button
  from "../../components/ui/Button";

import Container
  from "../../components/common/Container";

export default function Signup() {

  // 🔐 AUTH
  const {
    signup,
    isAuthenticated,
    loading,
  } = useAuth();

  const navigate =
    useNavigate();

  // ======================================================
  // ✅ FORM STATE
  // ======================================================

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ======================================================
  // ✅ REDIRECT IF LOGGED IN
  // ======================================================

  useEffect(() => {

    if (isAuthenticated) {

      navigate("/dashboard");
    }

  }, [
    isAuthenticated,
    navigate,
  ]);

  // ======================================================
  // ✅ HANDLE CHANGE
  // ======================================================

  const handleChange = (e) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // ======================================================
  // ✅ VALIDATION
  // ======================================================

  const validateForm = () => {

    if (
      !form.name.trim()
    ) {
      return "Name is required";
    }

    if (
      !form.email.trim()
    ) {
      return "Email is required";
    }

    if (
      form.password.length < 6
    ) {
      return "Password must be at least 6 characters";
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      return "Passwords do not match";
    }

    return null;
  };

  // ======================================================
  // ✅ HANDLE SIGNUP
  // ======================================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setSuccess("");

      // 🔐 VALIDATION
      const validationError =
        validateForm();

      if (
        validationError
      ) {
        setError(
          validationError
        );

        return;
      }

      // 🔥 API CALL
      const result =
        await signup({

          name:
            form.name.trim(),

          email:
            form.email.trim(),

          password:
            form.password,
        });

      // ❌ ERROR
      if (
        !result.success
      ) {

        setError(
          result.message
        );

        return;
      }

      // ✅ SUCCESS
      setSuccess(
        result.data.message ||
        "Account created successfully"
      );

      // 🧹 RESET FORM
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // 🚀 REDIRECT
      setTimeout(() => {

        navigate("/login");

      }, 1500);
    };

  // ======================================================
  // ✅ UI
  // ======================================================

  return (
    <section
      className="
      min-h-screen
      bg-gray-50
      flex
      items-center
      py-16
    "
    >
      <Container>

        <div
          className="
          max-w-md
          mx-auto
          bg-white
          border
          rounded-xl
          shadow-sm
          p-8
        "
        >

          {/* TITLE */}
          <div className="mb-6 text-center">

            <h1
              className="
              text-3xl
              font-bold
              text-gray-900
            "
            >
              Create Account
            </h1>

            <p
              className="
              text-gray-500
              mt-2
            "
            >
              Start managing domains & hosting professionally
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}
            <div>

              <label
                className="
                block
                text-sm
                font-medium
                mb-2
              "
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="
w-full
border
rounded-lg
px-4
py-3
text-gray-900
bg-white
placeholder-gray-400
focus:outline-none
focus:ring-2
focus:ring-black
"
              />

            </div>

            {/* EMAIL */}
            <div>

              <label
                className="
                block
                text-sm
                font-medium
                mb-2
              "
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="
w-full
border
rounded-lg
px-4
py-3
text-gray-900
bg-white
placeholder-gray-400
focus:outline-none
focus:ring-2
focus:ring-black
"
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label
                className="
                block
                text-sm
                font-medium
                mb-2
              "
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                required
                className="
w-full
border
rounded-lg
px-4
py-3
text-gray-900
bg-white
placeholder-gray-400
focus:outline-none
focus:ring-2
focus:ring-black
"
              />

            </div>

            {/* CONFIRM PASSWORD */}
            <div>

              <label
                className="
                block
                text-sm
                font-medium
                mb-2
              "
              >
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="
w-full
border
rounded-lg
px-4
py-3
text-gray-900
bg-white
placeholder-gray-400
focus:outline-none
focus:ring-2
focus:ring-black
"
              />

            </div>

            {/* ERROR */}
            {error && (
              <div
                className="
                bg-red-50
                border
                border-red-200
                text-red-600
                text-sm
                rounded-lg
                px-4
                py-3
              "
              >
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div
                className="
                bg-green-50
                border
                border-green-200
                text-green-600
                text-sm
                rounded-lg
                px-4
                py-3
              "
              >
                {success}
              </div>
            )}

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Button>

          </form>

          {/* FOOTER */}
          <div
            className="
            mt-6
            text-center
            text-sm
            text-gray-500
          "
          >

            Already have an account?{" "}

            <Link
              to="/login"
              className="
              text-black
              font-semibold
              hover:underline
            "
            >
              Login
            </Link>

          </div>

        </div>

      </Container>
    </section>
  );
}