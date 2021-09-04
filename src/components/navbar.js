import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'

import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <div>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        CVD
                        <i class='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/services'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Services
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/products'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/LogIn'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                LogIn
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/SignUp'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}
                            >
                                Sign UP
                            </Link>
                        </li>
                    </ul>
                    {Button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;