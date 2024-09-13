import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function InsertProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCode, setProductCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handler functions for form inputs in the product
  const handleNameChange = (e) => setProductName(e.target.value);
  const handlePriceChange = (e) => setProductPrice(e.target.value);
  const handleCodeChange = (e) => setProductCode(e.target.value.slice(0, 12)); // Limiting to 12 characters

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productCode) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/insertproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProductName: productName,
          ProductPrice: productPrice,
          ProductCode: productCode, // Ensure this matches the backend schema
        }),
      });

      if (response.status === 201) {
        alert("Product inserted successfully.");
        setProductName("");
        setProductPrice("");
        setProductCode("");
        navigate("/products");
      } else if (response.status === 422) {
        alert("Product with this code already exists.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Enter Product Information</h1>

      <form onSubmit={addProduct} className="space-y-6">
        <div>
          <label htmlFor="product_name" className="block text-lg font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            onChange={handleNameChange}
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
            onChange={handlePriceChange}
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
            onChange={handleCodeChange}
            value={productCode}
            maxLength={12}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="product_code"
            placeholder="Enter Product Code"
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
            {loading ? "Inserting..." : "Insert"}
          </button>
        </div>
      </form>
    </div>
  );
}
