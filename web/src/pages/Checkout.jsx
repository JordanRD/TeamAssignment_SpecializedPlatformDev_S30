import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BASE_URL =
  "https://teamassignment-specializedplatformdev-s30.onrender.com";

function Checkout() {
  const navigate = useNavigate();

  const { state } = useLocation();
  const items = state?.items || [];
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setCartItems(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleConfirmCheckout = async () => {
    const token = localStorage.getItem("token");

    try {
      setConfirming(true);
      const res = await fetch(`${BASE_URL}/api/cart/checkout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-gray-500">Preparing checkout...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        
        <h1 className="text-3xl font-bold text-textMain">
          Checkout
        </h1>

        {/* ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center gap-4"
            >
              {/* IMAGE */}
              <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {item.product.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-gray-400">
                    No Image
                  </span>
                )}
              </div>

              {/* INFO */}
              <div className="flex-1">
                <p className="font-medium text-textMain">
                  {item.product.name}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              {/* PRICE */}
              <p className="font-medium text-textMain">
                Rp{" "}
                {new Intl.NumberFormat("id-ID").format(
                  item.product.price * item.quantity
                )}
              </p>
            </div>
          ))}

          <hr />

          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-textMain">
              Total
            </p>
            <p className="text-xl font-bold text-textMain">
              Rp{" "}
              {new Intl.NumberFormat("id-ID").format(totalPrice)}
            </p>
          </div>
        </div>

        {/* CONFIRMATION */}
        <div className="bg-white rounded-xl shadow p-6 flex justify-end">
          <button
            onClick={handleConfirmCheckout}
            disabled={confirming}
            className={`px-6 py-3 rounded-md font-semibold text-white transition
              ${
                confirming
                  ? "bg-primary/60 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"
              }`}
          >
            {confirming ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
