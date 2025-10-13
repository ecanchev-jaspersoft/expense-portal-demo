import { NavLink } from "react-router";
import './Header.css';

const Header = () => {
    return (
        <>
            <header className="navbar">
                <div className="logo">ExpensePulse </div>
                <nav>
                    <ul className="nav-links">
                        <li><NavLink to="/">Home</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;