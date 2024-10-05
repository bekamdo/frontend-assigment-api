import { BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Customer from "./pages/Customer";



function App() {

  return (
    
<Router>
      <div className="h-screen container mx-auto bg-slate-100">
        <nav className="h-20">
          <ul className="flex items-center gap-10 justify-center">
            <li className="text-xl">
              <Link to="/login">Login</Link>
            </li>
            <li className="text-xl">
              <Link to="/products">Products</Link>
            </li>
            <li className="text-xl">
              <Link to="/customers">Customers</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Product />} />
          <Route path="/customers" element={<Customer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
