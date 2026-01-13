import { useEffect } from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';
import { USER_ROLES, PAGE_TYPES } from '../../utils/Constants';

const Hero = () => {
    const navigate = useNavigate();
    const {
        state: { isLoggedIn, loggedInUser },
    } = useAuth();

    // Handle redirection when auth state changes
    useEffect(() => {
        if (isLoggedIn) {
            if (loggedInUser === USER_ROLES.ADMIN) {
                navigate('/dashboard');
            } else {
                navigate('/pageReport');
            }
        }
    }, [isLoggedIn, loggedInUser, navigate]);

    return (
        <section className='hero h-main-section'>
            <div className='hero-content'>
                <h1>Welcome to the Meridian Trust Bank Portal</h1>
                <p>Track your expenses efficiently and effortlessly.</p>
                <button className='cta-button' onClick={() => navigate('/pageReport')}>
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;
