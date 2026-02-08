import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  "https://teamassignment-specializedplatformdev-s30.onrender.com";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch cart");
        }
        setCartItems(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  /** 
   * Cart TIDAK melakukan checkout.
   * Cart hanya mengarahkan ke halaman Checkout.
   */
  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-gray-500">Loading cart...</p>
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

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        <h1 className="text-3xl font-bold text-textMain mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-white rounded-xl shadow p-6 flex items-center gap-4"
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
                    <h3 className="font-semibold text-textMain">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* PRICE */}
                  <p className="font-semibold text-textMain">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      item.product.price * item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-textMain">
                Total
              </h2>
              <p className="text-2xl font-bold text-textMain">
                Rp{" "}
                {new Intl.NumberFormat("id-ID").format(totalPrice)}
              </p>
            </div>

            {/* ACTION */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleProceedToCheckout}
                className="px-6 py-3 rounded-md font-semibold text-white transition
                           bg-primary hover:opacity-90"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
