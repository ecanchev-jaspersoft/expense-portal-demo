import { NavLink } from "react-router";
import './Header.css';

const Header = () => {
    return (
        <>
            <header className="navbar">
                <div className="logo">HotelManager</div>
                <nav>
                    <ul className="nav-links">
                        <li><NavLink to="/">Home</NavLink></li>
                        {/* <li><a href="#">About Us</a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Contact</a></li> */}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;