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

export default function Login() {

  // 🔐 AUTH
  const {
    login,
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
      email: "",
      password: "",
    });

  const [error, setError] =
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
  // ✅ HANDLE LOGIN
  // ======================================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      const result =
        await login(form);

      // ❌ ERROR
      if (!result.success) {

        setError(
          result.message
        );

        return;
      }

      // ✅ SUCCESS
      navigate("/dashboard");
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
              Welcome Back
            </h1>

            <p
              className="
              text-gray-500
              mt-2
            "
            >
              Login to manage your hosting & domains
            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

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
                placeholder="Enter password"
                required
                className="
                w-full
                border
                rounded-lg
                px-4
                py-3
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

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading
                ? "Logging in..."
                : "Login"}
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

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="
              text-black
              font-semibold
              hover:underline
            "
            >
              Create Account
            </Link>

          </div>

        </div>

      </Container>
    </section>
  );
}