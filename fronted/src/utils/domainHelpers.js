export const getExtension = (domain) => {
  return domain.substring(domain.lastIndexOf("."));
};

export const formatDomain = (name) => {
  return name.toLowerCase().trim();
};

export const isValidDomain = (name) => {
  const regex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return regex.test(name);
};