import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'

import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const closeMobileMenuSignout = () => {
    firebaseConfig.auth().signOut()
    setClick(false);
  }

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
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            CMTT
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
                to='/dashboard'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Dashboard
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

            <li>{!currentUser ? <div><Link
              to='/LogIn'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Log In
            </Link>
              <Link
                to='/signup'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link></div> :
              <div
                className='nav-links-mobile'
                onClick={closeMobileMenuSignout}
              >
                Sign Out
              </div>}
            </li>
          </ul>
          
          {!currentUser ? button && <Link to='/login' ><Button  buttonStyle='btn--outline' >SIGN&nbsp;IN</Button></Link>
            : button && <Button buttonStyle='btn--outline'>SIGN&nbsp;OUT</Button>}<>&nbsp;&nbsp;</> 
            {!currentUser ? button && <Link to='/signup' ><Button  buttonStyle='btn--outline' >SIGN&nbsp;UP</Button></Link>
            : <></>}
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;