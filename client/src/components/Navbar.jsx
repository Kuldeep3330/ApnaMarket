import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
      };

  return (
    <nav className="navbar">
      <Link to="/products" className="logo">ApnaMarket</Link>

      <div className="nav-links">
        <Link to="/products">Home</Link>

        {user ? (
          <>
            <Link to="/cart" className="btn"><ShoppingCartCheckoutIcon/></Link>
            <span className="user">Hi, {user.name}</span>
            <button onClick={handleLogout} className="btn">Logout</button>
           
          </>
        ) : (
          <>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar

 