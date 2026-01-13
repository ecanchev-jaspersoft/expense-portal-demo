import { NavLink } from 'react-router';
import './Header.css';
import { useAuth } from '../../context/AppContext';
import { AUTH_ACTIONS, USER_ROLES, PAGE_TYPES, CHARTS } from '../../utils/Constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from '../../utils/InputControls/Tabs/Tabs';
import { useChartState } from '../../hooks/useChartState';

const Header = () => {
    const {
        state: { isLoggedIn, loggedInUser, selectedChart, vObject },
        dispatch,
    } = useAuth();
    const { chartOptions } = useChartState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isManager = loggedInUser === USER_ROLES.ADMIN;
    const username = isManager ? 'Manager' : 'John Q. Public';
    const isDashboardRoute = location.pathname.endsWith(`/${PAGE_TYPES.DASHBOARD}`);

    const handleLogout = () => {
        vObject.logout().done(() => {
            navigate(`/${PAGE_TYPES.LOGIN}`);
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
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
                {isLoggedIn && isManager && isDashboardRoute && chartOptions && (
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
