import { useEffect, useState } from "react";

import Container from "../../components/common/Container";
import Button from "../../components/ui/Button";

import useAuth from "../../hooks/useAuth";

import {
  getProfileAPI,
  updateProfileAPI,
  changePasswordAPI,
} from "../../services/authService";

export default function Settings() {
  const {
    user,
    login,
  } = useAuth();

  const [loading, setLoading] =
    useState(false);

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  // 🔥 PROFILE FORM
  const [profileForm, setProfileForm] =
    useState({
      name: "",
      email: "",
    });

  // 🔥 PASSWORD FORM
  const [passwordForm, setPasswordForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  // 🔥 LOAD USER DATA
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res =
          await getProfileAPI();

        const profile =
          res.data.user;

        setProfileForm({
          name:
            profile?.name || "",
          email:
            profile?.email || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, []);

  // 🔥 PROFILE INPUT
  const handleProfileChange = (
    e
  ) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // 🔥 PASSWORD INPUT
  const handlePasswordChange = (
    e
  ) => {
    setPasswordForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  // 🔥 UPDATE PROFILE
  const handleProfileSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);
      setError("");
      setMessage("");

      try {
        const res =
          await updateProfileAPI({
            name:
              profileForm.name,
            email:
              profileForm.email,
          });

        // 🔥 UPDATE AUTH STATE
        login(
          res.data.user,
          localStorage.getItem(
            "token"
          )
        );

        setMessage(
          "Profile updated successfully"
        );
      } catch (err) {
        setError(
          err.message ||
            "Failed to update profile"
        );
      } finally {
        setLoading(false);
      }
    };

  // 🔥 CHANGE PASSWORD
  const handlePasswordSubmit =
    async (e) => {
      e.preventDefault();

      setError("");
      setMessage("");

      if (
        passwordForm.newPassword !==
        passwordForm.confirmPassword
      ) {
        setError(
          "Passwords do not match"
        );

        return;
      }

      setPasswordLoading(true);

      try {
        await changePasswordAPI({
          currentPassword:
            passwordForm.currentPassword,

          newPassword:
            passwordForm.newPassword,
        });

        setMessage(
          "Password updated successfully"
        );

        // 🔥 RESET FORM
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        setError(
          err.message ||
            "Password update failed"
        );
      } finally {
        setPasswordLoading(false);
      }
    };

  return (
    <Container>

      {/* PAGE HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Account Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your profile
          information and password
        </p>

      </div>

      {/* ALERTS */}
      {message && (
        <div className="mb-4 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* PROFILE CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Profile Information
          </h2>

          <form
            onSubmit={
              handleProfileSubmit
            }
            className="space-y-5"
          >

            {/* NAME */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  profileForm.name
                }
                onChange={
                  handleProfileChange
                }
                placeholder="Enter your name"
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={
                  profileForm.email
                }
                onChange={
                  handleProfileChange
                }
                placeholder="Enter your email"
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* ROLE */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Account Role
              </label>

              <input
                type="text"
                value={
                  user?.role ||
                  "user"
                }
                disabled
                className="w-full border bg-gray-100 px-4 py-3 rounded-xl text-gray-500"
              />

            </div>

            {/* BUTTON */}
            <Button
              disabled={loading}
              className="w-full"
            >
              {loading
                ? "Updating..."
                : "Save Changes"}
            </Button>

          </form>

        </div>

        {/* PASSWORD CARD */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Change Password
          </h2>

          <form
            onSubmit={
              handlePasswordSubmit
            }
            className="space-y-5"
          >

            {/* CURRENT */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Current Password
              </label>

              <input
                type="password"
                name="currentPassword"
                value={
                  passwordForm.currentPassword
                }
                onChange={
                  handlePasswordChange
                }
                placeholder="Current password"
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* NEW */}
            <div>

              <label className="block text-sm font-medium mb-2">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={
                  passwordForm.newPassword
                }
                onChange={
                  handlePasswordChange
                }
                placeholder="New password"
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* CONFIRM */}
            <div>

              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={
                  passwordForm.confirmPassword
                }
                onChange={
                  handlePasswordChange
                }
                placeholder="Confirm password"
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />

            </div>

            {/* BUTTON */}
            <Button
              disabled={
                passwordLoading
              }
              className="w-full"
            >
              {passwordLoading
                ? "Updating..."
                : "Change Password"}
            </Button>

          </form>

        </div>

      </div>

    </Container>
  );
}