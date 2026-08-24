import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }


    return (
        <nav className="navbar">
            <div className="navbar_logo">
                <Link className="navbar_logo_link" to="/">Subscription Tracker</Link>
            </div>
            <div className="navbar_links">
                { user ? (
                    <>
                        <Link className="navbar_link" to="/subscriptions">Subscriptions</Link>
                        <button className="navbar-button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className="navbar_link" to="/signin">Login</Link>
                        <Link className="navbar_link" to="/signup">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;