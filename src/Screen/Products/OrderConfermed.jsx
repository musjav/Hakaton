const OrderConfirmed = () => {
  const order = JSON.parse(localStorage.getItem("order") || "{}");

  return (
    <div className="p-6 max-w-2xl mx-auto text-gray-600">
      <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
      <p>Your order has been successfully placed.</p>
      <h3 className="mt-4 font-bold">Order Summary:</h3>
      <ul className="mt-2 space-y-1">
        {order.items?.map((item, idx) => (
          <li key={idx}>{item.productTitle} - ${item.price}</li>
        ))}
      </ul>
      <p className="mt-2 font-bold">Total: ${order.total}</p>
    </div>
  );
};

export default OrderConfirmed;
