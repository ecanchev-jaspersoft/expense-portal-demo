import { useCallback } from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';
import { USER_ROLES, PAGE_TYPES } from '../../utils/Constants';

const Hero = () => {
    const navigate = useNavigate();
    const {
        state: { isLoggedIn, loggedInUser },
    } = useAuth();

    const navigateProperly = useCallback(() => {
        navigate(isLoggedIn ? (loggedInUser === USER_ROLES.ADMIN ? `/${PAGE_TYPES.DASHBOARD}` : `/${PAGE_TYPES.PAGE_REPORT}`) : `/${PAGE_TYPES.LOGIN}`);
    }, [navigate, isLoggedIn, loggedInUser]);

    return (
        <section className='hero h-main-section'>
            <div className='hero-content'>
                <h1>Welcome to the Meridian Trust Bank Portal</h1>
                <p>Track your expenses efficiently and effortlessly.</p>
                <button className='cta-button' onClick={navigateProperly}>
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;
