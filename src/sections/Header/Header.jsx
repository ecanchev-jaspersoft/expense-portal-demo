import { NavLink } from 'react-router';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { AUTH_ACTIONS, USER_ROLES, PAGE_TYPES, CHARTS } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import { Tabs } from '../../utils/InputControls/Tabs/Tabs';

const Header = () => {
    const {
        state: { isLoggedIn, vObject, loggedInUser, selectedPage, chartOptions, selectedChart },
        dispatch,
    } = useAuth();
    const navigate = useNavigate();
    const username = loggedInUser === USER_ROLES.ADMIN ? 'Manager' : 'John Q. Public';
    const isManager = loggedInUser === USER_ROLES.ADMIN;
    const isDashboardMode = selectedPage === PAGE_TYPES.DASHBOARD;

    const handleLogout = () => {
        vObject.logout().done(() => {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
            navigate('/login');
        });
    };

    const handleChartSwitch = (chartName) => {
        const chart = CHARTS.find(c => c.name === chartName);
        if (chart) {
            dispatch({ type: AUTH_ACTIONS.SET_SELECTED_CHART_OBJECT, payload: chart });
        }
    };

    return (
        <>
            <header className='navbar'>
                <div className='logo nav-links'>
                    <img src='logo_meridian.png' alt='logo' />
                    <NavLink to='/'>Meridian Trust Bank</NavLink>{' '}
                </div>
                
                {/* Chart tabs for manager users in dashboard mode */}
                {isLoggedIn && isManager && isDashboardMode && chartOptions && (
                    <div className='header-tabs'>
                        <Tabs
                            options={chartOptions}
                            activeTab={selectedChart?.name}
                            onTabChange={handleChartSwitch}
                        />
                    </div>
                )}
                
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
