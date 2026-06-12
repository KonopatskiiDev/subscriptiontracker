import { Link } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {
    return (<nav className="navbar">
            <div className="navbar_logo">
                <Link to="/">Subscription Tracker</Link>
            </div>
            <div className="navbar_links">
                <Link className="navbar_link" to="/signin">Login</Link>
                <Link className="navbar_link" to="/signup">Register</Link>
            </div>
        </nav>);
};
export default Navbar;
//# sourceMappingURL=Navbar.js.map