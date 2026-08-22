import { Link } from "react-router-dom";
import './HomePage.scss';

const HomePage = () => {
    
    return (
        <div className="homepage">
            <h1>Subscriptions</h1>
            <p>Welcome to subscritptions!</p>
            <Link className="link" to="/signin">Take me to the subscriptions</Link>
        </div>
    )
}


export default HomePage;