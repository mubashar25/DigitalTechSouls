// 🌐 ALLOWED EXTENSIONS
const ALLOWED_EXTENSIONS = [
  "com",
  "net",
  "org",
  "store",
  "online",
];

// 🔍 VALIDATE DOMAIN
export const validateDomain = (
  domain = ""
) => {

  // 🧠 CLEAN INPUT
  const cleanDomain = domain
    .trim()
    .toLowerCase();

  // ❌ BASIC CHECK
  if (!cleanDomain) {
    return false;
  }

  // 🌐 REGEX
  const regex =
    /^(?!-)[a-z0-9-]{2,63}(?<!-)\.([a-z]{2,})$/;

  // ❌ INVALID FORMAT
  if (!regex.test(cleanDomain)) {
    return false;
  }

  // 🔍 EXTENSION CHECK
  const extension =
    cleanDomain.split(".").pop();

  return ALLOWED_EXTENSIONS.includes(
    extension
  );
};