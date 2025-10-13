
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
                <h1>Welcome to HotelManager</h1>
                <p>Manage your hotels efficiently and effortlessly.</p>
                <button className="cta-button"
                    onClick={redirectToLogin}
                >Get Started</button>
            </div>
        </section>
    </>
};

export default Hero;