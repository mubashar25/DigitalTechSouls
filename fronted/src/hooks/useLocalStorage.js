const isBrowser = typeof window !== "undefined";

export const setItem = (key, value) => {
  if (!isBrowser) return;

  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error("setItem error:", err);
  }
};

export const getItem = (key) => {
  if (!isBrowser) return null;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error("getItem error:", err);
    return null;
  }
};

export const removeItem = (key) => {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("removeItem error:", err);
  }
};

export const clearStorage = () => {
  if (!isBrowser) return;

  try {
    localStorage.clear();
  } catch (err) {
    console.error("clearStorage error:", err);
  }
};