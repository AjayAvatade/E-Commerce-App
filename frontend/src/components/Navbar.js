import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search)}`);
        }
    };

    return (
        <header className="navbar-wrapper">

            {/* Top Navbar */}
            <div className="navbar">

                {/* Logo */}
                <Link to="/" className="logo">
                    Shopzy<span>.</span>
                </Link>

                {/* Categories */}
                <button
                    className="category-btn"
                    onClick={() => navigate("/products")}
                >
                    <span className="category-icon">☷</span>
                    <span>All Categories</span>
                    <span className="dropdown-arrow">⌄</span>
                </button>

                {/* Search */}
                <form className="search-container" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for products, brands and more..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button type="submit" className="search-btn">
                        🔍
                    </button>
                </form>

                {/* Wishlist */}
                <Link to="/wishlist" className="nav-action">
                    <span className="nav-icon">♡</span>
                    <span>Wishlist</span>
                </Link>

                {/* Cart */}
                <Link to="/cart" className="nav-action cart-action">
                    <span className="nav-icon">🛒</span>

                    <span>Cart</span>

                    <span className="cart-count">
                        0
                    </span>
                </Link>

                {/* Account */}
                <div className="account-section">
                    <div className="user-avatar">
                        👤
                    </div>

                    <div className="account-info">
                        <span className="hello-text">
                            Hello, Ajay
                        </span>

                        <Link to="/profile" className="account-link">
                            My Account
                        </Link>
                    </div>

                    <span className="account-arrow">
                        ⌄
                    </span>
                </div>

            </div>

            {/* Navigation Menu */}
            <nav className="navigation-menu">

                <Link to="/" className="active">
                    Home
                </Link>

                <Link to="/products">
                    Shop
                </Link>

                <Link to="/deals">
                    Deals
                </Link>

                <Link to="/new-arrivals">
                    New Arrivals
                </Link>

                <Link to="/brands">
                    Brands
                </Link>

                <Link to="/orders">
                    Track Order
                </Link>

                <Link to="/support">
                    Support
                </Link>

            </nav>

        </header>
    );
}

export default Navbar;