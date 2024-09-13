import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();
        setProductData(data);
        setLoading(false);
      } else {
        setError("Failed to fetch products.");
      }
    } catch (err) {
      setError("An error occurred while fetching products.");
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:3000/deleteproduct/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const deletedData = await response.json();
          console.log(deletedData);
          getProducts(); // Refresh the list after deletion
        } else {
          setError("Failed to delete the product.");
        }
      } catch (err) {
        setError("An error occurred while deleting the product.");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Products Inventory</h1>
          <div className="mb-6">
            <NavLink
              to="/insertproduct"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
            >
              + Add New Product
            </NavLink>
          </div>

          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-red-600 text-center py-4">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">#</th>
                    <th className="py-3 px-4 text-left">Product Name</th>
                    <th className="py-3 px-4 text-left">Product Price</th>
                    <th className="py-3 px-4 text-left">Product Code</th>
                    <th className="py-3 px-4 text-left">Update</th>
                    <th className="py-3 px-4 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {productData.map((element, index) => (
                    <tr key={element._id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">{index + 1}</td>
                      <td className="py-4 px-4">{element.ProductName}</td>
                      <td className="py-4 px-4">{element.ProductPrice}</td>
                      <td className="py-4 px-4">{element.ProductCode}</td>
                      <td className="py-4 px-4">
                        <NavLink
                          to={`/updateproduct/${element._id}`}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                          Edit
                        </NavLink>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => deleteProduct(element._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
