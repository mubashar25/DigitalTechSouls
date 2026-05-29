const orderConfirmationTemplate =
  ({
    user,
    order,
  }) => {
    return `
      <div style="
        font-family: Arial;
        padding: 40px;
      ">

        <h2>
          Order Confirmed ✅
        </h2>

        <p>
          Hello ${user.name},
        </p>

        <p>
          Your order has been placed
          successfully.
        </p>

        <h3>
          Order ID:
          ${order._id}
        </h3>

        <h3>
          Total:
          $${order.totalPrice}
        </h3>

      </div>
    `;
  };

export default
  orderConfirmationTemplate;