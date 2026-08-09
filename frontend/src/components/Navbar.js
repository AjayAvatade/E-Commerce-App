// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//     const navigate = useNavigate();
//     const [search, setSearch] = useState("");

//     const handleSearch = (e) => {
//         e.preventDefault();

//         if (search.trim()) {
//             navigate(`/products?search=${encodeURIComponent(search)}`);
//         }
//     };

//     return (
//         <header className="navbar-wrapper">

//             {/* Top Navbar */}
//             <div className="navbar">

//                 {/* Logo */}
//                 <Link to="/" className="logo">
//                     Shopzy<span>.</span>
//                 </Link>

//                 {/* Categories */}
//                 <button
//                     className="category-btn"
//                     onClick={() => navigate("/products")}
//                 >
//                     <span className="category-icon">☷</span>
//                     <span>All Categories</span>
//                     <span className="dropdown-arrow">⌄</span>
//                 </button>

//                 {/* Search */}
//                 <form className="search-container" onSubmit={handleSearch}>
//                     <input
//                         type="text"
//                         placeholder="Search for products, brands and more..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />

//                     <button type="submit" className="search-btn">
//                         🔍
//                     </button>
//                 </form>

//                 {/* Wishlist */}
//                 <Link to="/wishlist" className="nav-action">
//                     <span className="nav-icon">♡</span>
//                     <span>Wishlist</span>
//                 </Link>

//                 {/* Cart */}
//                 <Link to="/cart" className="nav-action cart-action">
//                     <span className="nav-icon">🛒</span>

//                     <span>Cart</span>

//                     <span className="cart-count">
//                         0
//                     </span>
//                 </Link>

//                 {/* Account */}
//                 <div className="account-section">
//                     <div className="user-avatar">
//                         👤
//                     </div>

//                     <div className="account-info">
//                         <span className="hello-text">
//                             Hello, Ajay
//                         </span>

//                         <Link to="/profile" className="account-link">
//                             My Account
//                         </Link>
//                     </div>

//                     <span className="account-arrow">
//                         ⌄
//                     </span>
//                 </div>

//             </div>

//             {/* Navigation Menu */}
//             <nav className="navigation-menu">

//                 <Link to="/" className="active">
//                     Home
//                 </Link>

//                 <Link to="/products">
//                     Shop
//                 </Link>

//                 <Link to="/deals">
//                     Deals
//                 </Link>

//                 <Link to="/new-arrivals">
//                     New Arrivals
//                 </Link>

//                 <Link to="/brands">
//                     Brands
//                 </Link>

//                 <Link to="/orders">
//                     Track Order
//                 </Link>

//                 <Link to="/support">
//                     Support
//                 </Link>

//             </nav>

//         </header>
//     );
// }

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";


function Header() {

    const navigate = useNavigate();

    const {
        cartCount
    } = useCart();


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };


    return (

        <header className="main-header">


            {/* =================================================
                LOGO
            ================================================= */}

            <Link
                to="/"
                className="header-logo"
            >

                <span className="header-logo-icon">
                    S
                </span>

                <span className="header-logo-text">
                    Shopora
                </span>

            </Link>


            {/* =================================================
                NAVIGATION
            ================================================= */}

            <nav className="header-nav">

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Shop
                </Link>

                <Link to="/categories">
                    Categories
                </Link>

                <Link to="/about">
                    About
                </Link>

                <Link to="/contact">
                    Contact
                </Link>

            </nav>


            {/* =================================================
                HEADER ACTIONS
            ================================================= */}

            <div className="header-actions">


                {/* Search */}

                <button
                    className="header-icon-btn"
                    onClick={() =>
                        navigate("/products")
                    }
                    title="Search products"
                >
                    🔍
                </button>


                {/* Cart */}

                <button
                    className="header-cart-btn"
                    onClick={() =>
                        navigate("/cart")
                    }
                    title="Shopping cart"
                >

                    <span className="header-cart-icon">
                        🛒
                    </span>

                    {cartCount > 0 && (

                        <span className="cart-count">
                            {cartCount}
                        </span>

                    )}

                </button>


                {/* User */}

                <button
                    className="header-user-btn"
                    onClick={() =>
                        navigate("/profile")
                    }
                    title="My account"
                >
                    👤
                </button>


                {/* Logout */}

                <button
                    className="header-logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </header>
    );
}


export default Header;