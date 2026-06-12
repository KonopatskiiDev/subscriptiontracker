import { useState } from 'react';
import { api } from '../api/api';
import './LoginPage.scss';
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/auth/signin', {
                email,
                password
            });
            console.log("response data:", response.data);
        }
        catch (error) {
            console.error("Error occurred:", error);
        }
    };
    return (<div className="login-page">
            <h1>Login Page</h1>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
            
        </div>);
};
export default LoginPage;
//# sourceMappingURL=LoginPage.js.map