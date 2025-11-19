import { NavLink } from "react-router";
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {
        state: { isLoggedIn, vObject },
        dispatch,
    } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        vObject.logout().done(() => {
            dispatch({ type: 'LOGOUT' });
            navigate('/login');
        });
    };
    return (
        <>
            <header className='navbar'>
                <div className='logo nav-links'>
                    <NavLink to='/'>ExpensePulse</NavLink>{' '}
                </div>
                {isLoggedIn && (
                    <nav>
                        <ul className='nav-links'>
                            <li>
                                <a>Logged in as John</a>
                            </li>
                            <li onClick={handleLogout}>
                                <a href='#'>Log Out</a>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
        </>
    );
};

export default Header;