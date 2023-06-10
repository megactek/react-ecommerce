import React, { useRef, useEffect } from "react";
import "./header.css";
import logo from "../../assets/images/eco-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__link = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const navigateToCart = () => {
    navigate("/cart");
  };
  const headerRef = useRef(null);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show__profile-actions");
    console.log("here");
    return true;
  };
  return (
    <>
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className="nav__wrapper">
              <div className="logo">
                <img src={logo} alt="logo" />
                <div>
                  <h1>Multimart</h1>
                </div>
              </div>
              <div className="navigation" ref={menuRef} onClick={() => menuToggle()}>
                <ul className="menu">
                  {nav__link.map((link, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink to={link.path} className={(navClass) => (navClass.isActive ? "nav__active" : "")}>
                        {link.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="nav__icons">
                <span className="fav__icon">
                  <i className="ri-heart-line"></i>
                  <span className="badge">0</span>
                </span>
                <span className="cart__icon" onClick={navigateToCart}>
                  <i className="ri-shopping-bag-line"></i>
                  <span className="badge">{totalQuantity}</span>
                </span>
                <div className="profile__wrapper">
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    src={currentUser ? currentUser.photoURL : userIcon}
                    alt="user"
                    onClick={toggleProfileActions}
                  />
                  <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                    {currentUser ? (
                      <div className="d-flex justify-content-center align-items-start flex-column">
                        <span onClick={logout}>Logout</span>
                        <Link to="/dashboard">Dashboard</Link>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/dashboard">Dashboard</Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mobile__menu">
                  <span onClick={menuToggle}>
                    <i className="ri-menu-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
