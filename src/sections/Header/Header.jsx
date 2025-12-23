import { NavLink } from 'react-router';
import { useState } from 'react';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardChooser from '../../components/DashboardChooser/DashboardChooser';

const Header = () => {
    const {
        state: { isLoggedIn, vObject },
        dispatch,
    } = useAuth();
    const navigate = useNavigate();
    const [showChooser, setShowChooser] = useState(false);

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
                    <img src='logo_meridian.png' alt='logo' />
                    <NavLink to='/'>Meridian Trust Bank</NavLink>{' '}
                </div>
                {isLoggedIn && (
                    <nav>
                        <ul className='nav-links'>
                            <li>
                                <a className='dashboard-switcher' onClick={() => setShowChooser(true)}>
                                    Switch Dashboard
                                </a>
                            </li>
                            <li>
                                <a>Logged in as John Q. Public</a>
                            </li>
                            <li onClick={handleLogout}>
                                <a href='#'>Log Out</a>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
            <DashboardChooser isOpen={showChooser} onClose={() => setShowChooser(false)} />
        </>
    );
};

export default Header;
