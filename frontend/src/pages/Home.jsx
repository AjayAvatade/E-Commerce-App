import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import DealCard from "../components/DealCard";
import ServiceFeature from "../components/ServiceFeature";

function Home() {
    const navigate = useNavigate();

    const name = localStorage.getItem('loggedInUser');
    const email = localStorage.getItem('loggedInEmail');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInEmail');
        handleSuccess('User Loggedout') ;     
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    };

    /* =====================================================
       CATEGORY DATA
    ===================================================== */

    const categories = [
        {
            name: "Electronics",
            category: "Electronics",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500"
        },
        {
            name: "Fashion",
            category: "Fashion",
            image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500"
        },
        {
            name: "Home & Living",
            category: "Home & Living",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500"
        },
        {
            name: "Beauty",
            category: "Beauty",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"
        },
        {
            name: "Sports",
            category: "Sports",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500"
        }
    ];


    /* =====================================================
       TEMPORARY PRODUCT DATA
       Later this will come from MongoDB
    ===================================================== */

    const products = [
        {
            _id: "1",
            name: "Premium Wireless Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
            price: 2499,
            oldPrice: 3999,
            rating: 4.6,
            reviews: 128,
            discount: 38,
            category: "Electronics"
        },
        {
            _id: "2",
            name: "Classic Casual Sneakers",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
            price: 1899,
            oldPrice: 2999,
            rating: 4.5,
            reviews: 94,
            discount: 37,
            category: "Fashion"
        },
        {
            _id: "3",
            name: "Modern Table Lamp",
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
            price: 1299,
            oldPrice: 1999,
            rating: 4.4,
            reviews: 76,
            discount: 35,
            category: "Home & Living"
        },
        {
            _id: "4",
            name: "Premium Skincare Set",
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600",
            price: 1599,
            oldPrice: 2499,
            rating: 4.7,
            reviews: 156,
            discount: 36,
            category: "Beauty"
        }
    ];


    /* =====================================================
       DEAL DATA
    ===================================================== */

    const deals = [
        {
            title: "Summer Fashion Sale",
            description:
                "Upgrade your wardrobe with the latest styles at special prices.",
            discount: 40,
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
            category: "Fashion"
        },
        {
            title: "Tech Essentials",
            description:
                "Discover smart gadgets and electronics with amazing offers.",
            discount: 30,
            image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800",
            category: "Electronics"
        }
    ];


    /* =====================================================
       ADD TO CART
       Temporary function
       Later connected to CartContext
    ===================================================== */

    const handleAddToCart = (product) => {
        console.log("Product added to cart:", product);
    };


    return (
        <div className="home-page">


            {/* =================================================
                HERO SECTION
            ================================================= */}

            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-small-text">
                        WELCOME TO SHOPZY
                    </span>

                    <h1>
                        Everything You Love.
                        <br />
                        <span>All in One Place.</span>
                    </h1>

                    <p>
                        Discover trending products, amazing deals,
                        and everyday essentials at prices you'll love.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="hero-primary-btn"
                            onClick={() =>
                                window.location.href = "/products"
                            }
                        >
                            Shop Now
                            <span>→</span>
                        </button>

                        <button
                            className="hero-secondary-btn"
                            onClick={() =>
                                window.location.href = "/products?deals=true"
                            }
                        >
                            Explore Deals
                        </button>

                    </div>

                </div>


                <div className="hero-image-wrapper">

                    <img
                        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000"
                        alt="Shopora shopping"
                        className="hero-image"
                    />

                    <div className="hero-floating-card">

                        <span className="floating-icon">
                            ✨
                        </span>

                        <div>
                            <strong>
                                Great Deals
                            </strong>

                            <small>
                                Every Day
                            </small>
                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                CATEGORIES
            ================================================= */}

            <section className="home-section categories-section">

                <div className="section-heading">

                    <div>
                        <span className="section-label">
                            EXPLORE
                        </span>

                        <h2>
                            Shop by Category
                        </h2>
                    </div>

                    <a
                        href="/products"
                        className="view-all-link"
                    >
                        View All →
                    </a>

                </div>


                <div className="categories-list">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.category}
                            name={category.name}
                            category={category.category}
                            image={category.image}
                        />
                    ))}

                </div>

            </section>


            {/* =================================================
                FEATURED PRODUCTS
            ================================================= */}

            <section className="home-section products-section">

                <div className="section-heading">

                    <div>

                        <span className="section-label">
                            TRENDING NOW
                        </span>

                        <h2>
                            Featured Products
                        </h2>

                    </div>

                    <a
                        href="/products"
                        className="view-all-link"
                    >
                        View All →
                    </a>

                </div>


                <div className="products-grid">

                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}

                </div>

            </section>


            {/* =================================================
                DEALS
            ================================================= */}

            <section className="home-section deals-section">

                <div className="section-heading">

                    <div>

                        <span className="section-label">
                            DON'T MISS OUT
                        </span>

                        <h2>
                            Today's Best Deals
                        </h2>

                    </div>

                    <a
                        href="/products?deals=true"
                        className="view-all-link"
                    >
                        View All Deals →
                    </a>

                </div>


                <div className="deals-grid">

                    {deals.map((deal, index) => (
                        <DealCard
                            key={index}
                            title={deal.title}
                            description={deal.description}
                            discount={deal.discount}
                            image={deal.image}
                            category={deal.category}
                        />
                    ))}

                </div>

            </section>


            {/* =================================================
                SERVICES
            ================================================= */}

            <section className="service-features-section">

                <div className="service-features">

                    <ServiceFeature
                        icon="🚚"
                        title="Free Shipping"
                        description="Free delivery on orders above ₹999"
                    />

                    <ServiceFeature
                        icon="↩️"
                        title="Easy Returns"
                        description="7-day easy return policy"
                    />

                    <ServiceFeature
                        icon="🔒"
                        title="Secure Payment"
                        description="100% secure payment options"
                    />

                    <ServiceFeature
                        icon="🎧"
                        title="24/7 Support"
                        description="We're here whenever you need us"
                    />

                </div>

            </section>


        </div>
    );
}

export default Home;