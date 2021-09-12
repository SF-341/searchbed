import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import GetUser from './GetUserprofile'


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const userName = GetUser.getUserName();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const closeMobileMenuSignout = () => {
    localStorage.clear();
    firebaseConfig.auth().signOut();
    <Redirect to="/" />
    setClick(false);
    GetUser.clearUser();
  };


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

  window.addEventListener("resize", showButton);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(2),
      },
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }));

  const classes = useStyles();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            CMTT&nbsp;
            <i class="far fa-comment" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>

            <li>
              {!currentUser ? (
                <div>
                  <Link
                    to="/LogIn"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div
                  className="nav-links-mobile"
                  onClick={closeMobileMenuSignout}
                >
                  Sign Out
                </div>
              )}
            </li>
          </ul>

          {!currentUser
            ? button && (
              <Link to="/login">
                <Button buttonStyle="btn--outline">SIGN&nbsp;IN</Button>
              </Link>
            )
            : button && (
              <Button buttonStyle="btn--outline">SIGN&nbsp;OUT</Button>
            )}
          <>&nbsp;&nbsp;</>
          {!currentUser ? (
            button && (
              <Link to="/signup">
                <Button buttonStyle="btn--outline">SIGN&nbsp;UP</Button>
              </Link>
            )
          ) : (
            <></>
          )}
          <div className={classes.root}>
            {!currentUser ? (
              <></>
            ) : (
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Avatar className={classes.purple}>{userName[0]}</Avatar></Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
