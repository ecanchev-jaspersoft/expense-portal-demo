import { NavLink } from 'react-router';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { AUTH_ACTIONS, USER_ROLES } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const {
        state: { isLoggedIn, vObject, loggedInUser },
        dispatch,
    } = useAuth();
    const navigate = useNavigate();
    const username = loggedInUser === USER_ROLES.ADMIN ? 'Admin' : 'John Q. Public';

    const handleLogout = () => {
        vObject.logout().done(() => {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
            navigate('/login');
        });
    };

    return (
        <>
            <header className='navbar'>
                <div className='logo nav-links'>
                    <img src='logo_meridian.png' alt='logo' />
                    <NavLink to='/'>Meridian Trust Bank</NavLink>{' '}
                </div>
                {isLoggedIn && (
                    <nav>
                        <ul className='nav-links'>
                            <li>
                                <a>Logged in as {username}</a>
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
