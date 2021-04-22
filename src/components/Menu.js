import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EnrolleLogo from './img/Enrolle.svg';
import './Menu.css';

function Menu() {

    const [button, setButtonState] = useState(true);
    const mobileButton = () => {
        if(window.innerWidth <= 960){
            setButtonState(false);
        }
        else{
            setButtonState(true);
        }
    };

    window.addEventListener('resize', mobileButton);

    const [interact, setInteract] = useState(false);

    const handleInteract = () => { setInteract(!interact) };
    const closeMenu = () => setInteract(false);

    return (
        <>
        <nav className="navbar">
                <div className="navbar-container">
                
                <Link to="/" className={interact ? "navbar-logo-active" : "navbar-logo"}>
                    <img className={interact ? "enrolle-logo-active" : "enrolle-logo"} src={EnrolleLogo} alt="ENROLLE" onClick={closeMenu}></img>
                </Link>
            

                </div>
                <ul className={interact ? "nav-menu-static-active" : "nav-menu-static"}>
                    <li className='nav-item-static'>
                         <Link to="/login" className={interact ? "nav-links-static-active" : "nav-links-static"} onClick={closeMenu}>
                            Login
                        </Link>
                    </li>
                    <li className='nav-item-static'>
                         <Link to="/contact" className={interact ? "nav-links-static-active" : "nav-links-static"} onClick={closeMenu}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        <div className="menu">
            <div className={interact ? "menu-container-active" : "menu-container"} onClick={handleInteract}></div>
            <div className="menu-icon">
                <i className={interact ? "fab fa-mixer" : "fas fa-bars"}> </i>
                    
            </div>                

                <div className={interact ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-item-container">

                        <li className='nav-item'>
                            <Link to="/" className="nav-links" onClick={closeMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/features" className="nav-links" onClick={closeMenu}>
                                Features
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/mission" className="nav-links" onClick={closeMenu}>
                                Our Mission
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/application" className="nav-links" onClick={closeMenu}>
                                Application
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/why" className="nav-links" onClick={closeMenu}>
                                Why Us?
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/implementations" className="nav-links" onClick={closeMenu}>
                                Implementations
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="/faq" className="nav-links" onClick={closeMenu}>
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </div>


        </div>
        </>
    )
}

export default Menu
