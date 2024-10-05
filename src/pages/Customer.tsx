import { FC, useEffect, useState } from "react";
import axios from "axios";

interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

const CustomerTable: FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Optional error state

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/customer", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Include JWT token
          },
        });
        setCustomers(response.data);
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch customers");
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Customers</h2>
      
      {loading ? (
        // Show loading message while data is being fetched
        <div className="text-center text-blue-500">Loading customers...</div>
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
              <th className="py-2 px-4 text-left text-gray-700">Email</th>
              <th className="py-2 px-4 text-left text-gray-700">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="py-2 px-4">{customer.id}</td>
                <td className="py-2 px-4">{customer.name}</td>
                <td className="py-2 px-4">{customer.email}</td>
                <td className="py-2 px-4">{customer.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerTable;
