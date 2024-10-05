import axios from "axios";
import { FC, useEffect, useState } from "react";

interface ProductProps {
    id: number
    name: string
    description: string
    price: string
}


const Product:FC = () => {

const [products, setProducts] = useState<ProductProps[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string>("");
useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data);
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      
      {loading ? (
        // Show loading message while data is being fetched
        <div className="text-center text-blue-500">Loading products...</div>
      ) : error ? (
        // Show error message if something goes wrong
        <div className="text-center text-red-500">{error}</div>
      ) : (
        // Show table when data is successfully fetched
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-2 px-4 text-left text-gray-700">ID</th>
              <th className="py-2 px-4 text-left text-gray-700">Name</th>
              <th className="py-2 px-4 text-left text-gray-700">Description</th>
              <th className="py-2 px-4 text-left text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  )
}

export default Product