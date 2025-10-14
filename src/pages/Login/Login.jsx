import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login process
        if (credentials.username && credentials.password) {
            dispatch({ type: 'LOGIN' });
            navigate('/dashboard');
        }
    };

    const updateCredentials = (field, value) => {
        const newCredentials = { ...credentials, [field]: value };
        setCredentials(newCredentials);
        setIsDisabledBtn(!(newCredentials.username && newCredentials.password));
    };

    return (
        <div className="login-page h-main-section">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => updateCredentials('username', e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => updateCredentials('password', e.target.value)}
                />
                <button type="submit" disabled={isDisabledBtn}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;