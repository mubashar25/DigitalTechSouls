const TOKEN_KEY = "token";
const USER_KEY = "user";

// 💾 SAVE TOKEN
export const saveAuth = (user, token) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

// 📥 GET TOKEN
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// 📥 GET USER
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

// ❌ REMOVE AUTH
export const clearAuth = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

// 🧠 DECODE USER (mock for now)
export const decodeUser = (token) => {
  if (!token) return null;

  // fake decode (later JWT decode)
  return {
    id: "u1",
    name: "Mubashar",
    email: "demo@mail.com",
  };
};