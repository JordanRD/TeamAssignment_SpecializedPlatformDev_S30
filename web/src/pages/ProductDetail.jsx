import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = "https://teamassignment-specializedplatformdev-s30.onrender.com";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`${BASE_URL}/api/products/${id}`).then((res) => res.json()),
      fetch(`${BASE_URL}/api/products`).then((res) => res.json()),
    ])
      .then(([productData, allProducts]) => {
        setProduct(productData);

        // ambil max 4 produk lain sebagai rekomendasi
        const filtered = allProducts
          .filter((p) => p._id !== productData._id)
          .slice(0, 4);

        setRecommended(filtered);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setAdding(true);
      const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      alert("Added to cart");
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* PRODUCT DETAIL */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* IMAGE */}
          <div className="bg-white rounded-2xl shadow p-8 flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 object-contain"
              />
            ) : (
              <div className="text-gray-400">No Image</div>
            )}
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-3xl font-bold text-textMain mb-2">
              {product.name}
            </h1>

            {product.category && (
              <p className="text-sm text-gray-500 mb-4">
                Category: {product.category}
              </p>
            )}

            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            <p className="text-2xl font-semibold text-textMain mb-8">
              Rp{" "}
              {new Intl.NumberFormat("id-ID").format(product.price)}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`px-6 py-3 rounded-md font-semibold text-white transition
                ${adding
                  ? "bg-primary/60 cursor-not-allowed"
                  : "bg-primary hover:opacity-90"}
              `}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* RECOMMENDED PRODUCTS */}
        {recommended.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-textMain mb-6">
              You might also like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {recommended.map((item) => (
                <Link
                  key={item._id}
                  to={`/products/${item._id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-4"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">
                        No Image
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-textMain line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-semibold text-textMain">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        item.price
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductDetail;
