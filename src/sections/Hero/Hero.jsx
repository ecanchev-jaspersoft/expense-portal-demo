
import './Hero.css';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const redirectToLogin = () => {
        navigate('/login');
    };

    return <>
        <section className="hero h-main-section">
            <div className="hero-content">
                <h1>Welcome to the ExpensePulse Portal</h1>
                <p>Track your expenses efficiently and effortlessly.</p>
                <button className="cta-button"
                    onClick={redirectToLogin}
                >Get Started</button>
            </div>
        </section>
    </>
};

export default Hero;