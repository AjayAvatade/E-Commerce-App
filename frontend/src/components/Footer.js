import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            {/* Main Footer */}
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-column footer-brand">
                    <Link to="/" className="footer-logo">
                        Shopora<span>.</span>
                    </Link>

                    <p>
                        Discover trending products, top brands and
                        exclusive deals — all in one place.
                    </p>

                    <div className="social-links">
                        <a href="#facebook" aria-label="Facebook">
                            f
                        </a>

                        <a href="#instagram" aria-label="Instagram">
                            ◎
                        </a>

                        <a href="#twitter" aria-label="Twitter">
                            𝕏
                        </a>

                        <a href="#youtube" aria-label="YouTube">
                            ▶
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/products">Shop</Link>
                    <Link to="/deals">Deals</Link>
                    <Link to="/new-arrivals">New Arrivals</Link>
                    <Link to="/brands">Brands</Link>
                </div>

                {/* Customer Service */}
                <div className="footer-column">
                    <h3>Customer Service</h3>

                    <Link to="/orders">Track Order</Link>
                    <Link to="/returns">Returns & Refunds</Link>
                    <Link to="/shipping">Shipping Information</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/support">Contact Support</Link>
                </div>

                {/* Account */}
                <div className="footer-column">
                    <h3>My Account</h3>

                    <Link to="/profile">My Profile</Link>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/cart">Shopping Cart</Link>
                    <Link to="/login">Login</Link>
                </div>

                {/* Contact */}
                <div className="footer-column contact-column">
                    <h3>Get In Touch</h3>

                    <div className="contact-item">
                        <span>📍</span>
                        <p>India</p>
                    </div>

                    <div className="contact-item">
                        <span>📧</span>
                        <p>support@shopora.com</p>
                    </div>

                    <div className="contact-item">
                        <span>📞</span>
                        <p>+91 98765 43210</p>
                    </div>

                    <div className="contact-item">
                        <span>🕐</span>
                        <p>24/7 Customer Support</p>
                    </div>
                </div>

            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()} Shopora. All rights reserved.
                </p>

                <div className="footer-bottom-links">
                    <Link to="/privacy">
                        Privacy Policy
                    </Link>

                    <Link to="/terms">
                        Terms & Conditions
                    </Link>

                    <Link to="/cookies">
                        Cookie Policy
                    </Link>
                </div>

            </div>

        </footer>
    );
}

export default Footer;