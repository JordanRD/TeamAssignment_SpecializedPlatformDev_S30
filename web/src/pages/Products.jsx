import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE_URL =
  "https://teamassignment-specializedplatformdev-s30.onrender.com";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <h1 className="text-3xl font-bold text-textMain mb-8">
          Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-4 group-hover:scale-105 transition"
                  />
                ) : (
                  <span className="text-sm text-gray-400">
                    No Image
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-textMain line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                <p className="mt-2 font-semibold text-textMain">
                  Rp{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    product.price
                  )}
                </p>

                <span className="mt-3 inline-block text-sm font-medium text-primary">
                  View Details →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
