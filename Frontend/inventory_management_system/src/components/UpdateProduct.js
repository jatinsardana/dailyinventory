import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCode, setProductCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProductName(data.ProductName);
          setProductPrice(data.ProductPrice);
          setProductCode(data.ProductCode); // Updated to match backend schema
        } else {
          console.error("Error fetching product data.");
        }
      } catch (err) {
        console.error("An error occurred:", err);
      }
    };

    getProduct();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productCode) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3000/updateproduct/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductName: productName,
          ProductPrice: productPrice,
          ProductCode: productCode, // Updated to match backend schema
        }),
      });

      if (response.ok) {
        alert("Data Updated");
        navigate("/products");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("An error occurred:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Update Product Information</h1>

      <form onSubmit={updateProduct} className="space-y-6">
        <div>
          <label htmlFor="product_name" className="block text-lg font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="product_name"
            placeholder="Enter Product Name"
            required
          />
        </div>

        <div>
          <label htmlFor="product_price" className="block text-lg font-semibold mb-2">
            Product Price
          </label>
          <input
            type="number"
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="product_price"
            placeholder="Enter Product Price"
            required
          />
        </div>

        <div>
          <label htmlFor="product_code" className="block text-lg font-semibold mb-2">
            Product Code
          </label>
          <input
            type="text"
            onChange={(e) => setProductCode(e.target.value.slice(0, 12))}
            value={productCode}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="product_code"
            placeholder="Enter Product Code"
            maxLength={12}
            required
          />
        </div>

        {error && <div className="text-red-600 text-center font-semibold">{error}</div>}

        <div className="flex justify-between">
          <NavLink
            to="/products"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </NavLink>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${loading ? 'cursor-not-allowed bg-blue-300' : ''}`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
