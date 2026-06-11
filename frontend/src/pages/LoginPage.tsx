import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>
            <h1>Login Page</h1>

            <Link to="/signup">
                Don't have an account? Sign up here.
            </Link>
        </>
    )
}

export default LoginPage