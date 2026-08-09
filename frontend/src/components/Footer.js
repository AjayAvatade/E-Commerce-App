import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="main-footer">

            {/* =================================================
                FOOTER TOP
            ================================================= */}

            <div className="footer-container">

                {/* Brand */}

                <div className="footer-brand">

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        <span className="footer-logo-icon">
                            S
                        </span>

                        <span>
                            Shopzy
                        </span>
                    </Link>

                    <p>
                        Discover products you love,
                        delivered right to your doorstep.
                        Shop smarter, shop better with
                        Shopora.
                    </p>

                    <div className="footer-socials">

                        <a
                            href="#"
                            aria-label="Instagram"
                        >
                            ◎
                        </a>

                        <a
                            href="#"
                            aria-label="Facebook"
                        >
                            f
                        </a>

                        <a
                            href="#"
                            aria-label="Twitter"
                        >
                            𝕏
                        </a>

                        <a
                            href="#"
                            aria-label="LinkedIn"
                        >
                            in
                        </a>

                    </div>

                </div>


                {/* =================================================
                    QUICK LINKS
                ================================================= */}

                <div className="footer-column">

                    <h3>
                        Quick Links
                    </h3>

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
                        About Us
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                </div>


                {/* =================================================
                    CUSTOMER SERVICE
                ================================================= */}

                <div className="footer-column">

                    <h3>
                        Customer Service
                    </h3>

                    <Link to="/orders">
                        My Orders
                    </Link>

                    <Link to="/cart">
                        Shopping Cart
                    </Link>

                    <Link to="/shipping">
                        Shipping Information
                    </Link>

                    <Link to="/returns">
                        Returns & Refunds
                    </Link>

                    <Link to="/faq">
                        FAQ
                    </Link>

                </div>


                {/* =================================================
                    CONTACT
                ================================================= */}

                <div className="footer-column footer-contact">

                    <h3>
                        Get In Touch
                    </h3>

                    <div className="footer-contact-item">

                        <span>
                            📍
                        </span>

                        <p>
                            Pune, Maharashtra,
                            India
                        </p>

                    </div>

                    <div className="footer-contact-item">

                        <span>
                            ✉
                        </span>

                        <p>
                            support@shopora.com
                        </p>

                    </div>

                    <div className="footer-contact-item">

                        <span>
                            ☎
                        </span>

                        <p>
                            +91 98765 43210
                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                FOOTER DIVIDER
            ================================================= */}

            <div className="footer-divider" />


            {/* =================================================
                FOOTER BOTTOM
            ================================================= */}

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()}
                    {" "}
                    Shopzy. All rights reserved.
                </p>

                <div>

                    <Link to="/privacy">
                        Privacy Policy
                    </Link>

                    <Link to="/terms">
                        Terms & Conditions
                    </Link>

                </div>

            </div>

        </footer>
    );
}

export default Footer;