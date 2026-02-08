import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-72px)] flex items-center bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
            Seamless shopping,
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Exceptional services.
          </h2>

          <p className="text-gray-600 mb-8">
            Discover top tech, designed for peak performance
            and aesthetic appeal.
          </p>

          <Link
            to="/products"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-hover transition">
            View Products
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow flex justify-center">
          <img
            src="https://img.freepik.com/free-psd/levitating-headphones-still-life_23-2150806967.jpg"
            alt="Featured product"
            className="max-h-80 object-contain"
          />
        </div>

      </div>
    </section>
  );
}
