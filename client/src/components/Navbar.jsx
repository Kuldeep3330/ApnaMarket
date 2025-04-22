import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">ApnaMarket</Link>

      <div className="nav-links">
        {user ? (
          <>
            <span className="user">Hi, {user.name} welcome to the ApnaMarket</span>
            {/* <button onClick={handleLogout} className="btn">Logout</button> */}
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
