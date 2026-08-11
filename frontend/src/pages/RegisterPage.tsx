//import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        try {
            const response = await api.post(
                '/auth/signup',
                {
                    email,
                    password
            }
        )
        console.log("Response data with registration: ", response.data);
        navigate('/subscriptions');
        } catch (error) {
            if (axios.isAxiosError(error)){
                toast.error(error.response?.data.message ?? 'Registration failed');
            } else {
                toast.error('Something went wrong');
            }
        }
    };

    return (
        <div>
            <h1>Register Page</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        value={email}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        value={password}
                    />
                </div>
                <button type="submit">
                    Register
                </button>
            </form>

            {/* <Link to="/signin">
                Already have an account? Sign in here.
            </Link> */}
        </div>
        
    )
}

export default RegisterPage