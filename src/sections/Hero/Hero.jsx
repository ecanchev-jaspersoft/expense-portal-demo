import './Hero.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Hero = () => {
    const navigate = useNavigate();
    const { state: { isLoggedIn } } = useAuth();

    const redirectToPage = () => {
        if (isLoggedIn) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <section className="hero h-main-section">
            <div className="hero-content">
                <h1>Welcome to the ExpensePulse Portal</h1>
                <p>Track your expenses efficiently and effortlessly.</p>
                <button className="cta-button" onClick={redirectToPage}>
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;