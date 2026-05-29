export const getDomainPrice = (ext) => {
  const prices = {
    ".com": 10,
    ".net": 12,
    ".org": 9,
    ".store": 15,
    ".online": 18,
  };

  return prices[ext] || 20;
};