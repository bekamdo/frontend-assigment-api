import  { FormEvent, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
//   const navigate = useNavigate();
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("jwt", token);
      setMessage("Login successful");
    } catch (error) {
      setMessage("Login failed");
    //   navigate("/customers");
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-lg">
    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>
    </form>
    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
  </div>
  )
}

export default Login