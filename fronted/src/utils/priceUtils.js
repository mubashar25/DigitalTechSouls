// 💰 CALCULATE CART TOTAL
export const calculateTotal = (
  cart = []
) => {

  return cart.reduce((sum, item) => {

    const price = Number(item.price) || 0;
    const quantity =
      Number(item.quantity) || 1;

    return sum + price * quantity;

  }, 0);
};

// 💵 FORMAT PRICE
export const formatPrice = (
  value,
  currency = "USD"
) => {

  const amount = Number(value) || 0;

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency,
    }
  ).format(amount);
};

// 🧮 TAX CALCULATION
export const calculateTax = (
  total,
  rate = 0.1
) => {

  const amount = Number(total) || 0;
  const taxRate = Number(rate) || 0;

  return amount * taxRate;
};

// 💳 FINAL TOTAL
export const calculateGrandTotal = (
  total,
  tax = 0,
  discount = 0
) => {

  return (
    (Number(total) || 0) +
    (Number(tax) || 0) -
    (Number(discount) || 0)
  );
};

// 🎟 DISCOUNT
export const calculateDiscount = (
  total,
  percentage = 0
) => {

  const amount = Number(total) || 0;

  return amount * (
    (Number(percentage) || 0) / 100
  );
};