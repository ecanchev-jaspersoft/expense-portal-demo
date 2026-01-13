import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';
import { AUTH_ACTIONS, USER_ROLES, PAGE_TYPES } from '../../utils/Constants';
import './Login.css';

const USERS = {
    JOHN: 'john',
    ADMIN: 'manager',
};

const Login = () => {
    const navigate = useNavigate();
    const [isDisabledBtn, setIsDisabledBtn] = useState(true);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { dispatch } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!credentials.username.trim() || !credentials.password.trim()) {
            return;
        }

        if (credentials.username.trim().toLowerCase() === USERS.JOHN && credentials.password.trim().toLowerCase() === USERS.JOHN) {
            dispatch({ type: AUTH_ACTIONS.LOGIN, payload: USER_ROLES.REGULAR });
            dispatch({ type: AUTH_ACTIONS.SET_SELECTED_PAGE, payload: PAGE_TYPES.PAGE_REPORT });
            navigate(`/${PAGE_TYPES.PAGE_REPORT}`);
        } else if (credentials.username.trim().toLowerCase() === USERS.ADMIN && credentials.password.trim().toLowerCase() === USERS.ADMIN) {
            dispatch({ type: AUTH_ACTIONS.LOGIN, payload: USER_ROLES.ADMIN });
            dispatch({ type: AUTH_ACTIONS.SET_SELECTED_PAGE, payload: PAGE_TYPES.DASHBOARD });
            navigate(`/${PAGE_TYPES.DASHBOARD}`);
        } else {
            alert('INVALID CREDENTIALS');
        }
    };

    const updateCredentials = (field, value) => {
        const newCredentials = { ...credentials, [field]: value };
        setCredentials(newCredentials);
        setIsDisabledBtn(!(newCredentials.username.trim() && newCredentials.password.trim()));
    };

    return (
        <>
            <div className='login-page h-main-section'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Username'
                        value={credentials.username}
                        onChange={(e) => updateCredentials('username', e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={credentials.password}
                        onChange={(e) => updateCredentials('password', e.target.value)}
                    />
                    <button type='submit' disabled={isDisabledBtn}>
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
