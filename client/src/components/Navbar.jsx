import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import "./Navbar.css";

const Navbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">ApnaMarket</Link>

      <div className="nav-links">
        <Link to="/products">Home</Link>

        {user ? (
          <>
            <Link to="/cart" className="btn"><ShoppingCartCheckoutIcon/></Link>
            <span className="user">Hi, {user.name}</span>
           
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

 