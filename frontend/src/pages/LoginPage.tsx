//import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import axios from 'axios';
import toast from 'react-hot-toast';

import './LoginPage.scss';

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const response = await api.post(
                '/auth/signin',
                {
                    email, 
                    password
                }
            )
            console.log("response data:", response.data);
            
            navigate('/subscriptions');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message ?? 'Login gone wrong')
            } else {
                toast.error('Something went wrong')
            }
            console.error("Error occurred:", error);
        }

    };

    return (
        <div className="login-page">
            <h1>Login Page</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        value={email}
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
            {/* <Link to="/signup">
                Don't have an account? Sign up here.
            </Link> */}
        </div>
    )
}

export default LoginPage