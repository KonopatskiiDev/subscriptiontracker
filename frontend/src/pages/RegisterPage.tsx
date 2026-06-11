import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <>
            <h1>Register Page</h1>

            <Link to="/signin">
                Already have an account? Sign in here.
            </Link>
        </>
        
    )
}

export default RegisterPage