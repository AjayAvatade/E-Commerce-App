import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";


function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useCart();


    // =====================================================
    // TEMPORARY PRODUCT DATA
    // Later → API / MongoDB
    // =====================================================

    const product = {

        _id: id,

        name: "Premium Wireless Headphones",

        category: "Electronics",

        price: 2499,

        oldPrice: 3999,

        rating: 4.8,

        reviews: 124,

        stock: 12,

        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",

        description:
            "Experience powerful sound with premium wireless headphones designed for comfort, clarity and everyday use.",

        features: [
            "Premium sound quality",
            "Wireless Bluetooth connectivity",
            "Long battery life",
            "Comfortable over-ear design",
            "Built-in microphone"
        ]
    };


    // =====================================================
    // STATES
    // =====================================================

    const [quantity, setQuantity] = useState(1);

    const [added, setAdded] = useState(false);


    // =====================================================
    // INCREASE QUANTITY
    // =====================================================

    const increaseQuantity = () => {

        if (quantity < product.stock) {

            setQuantity(quantity + 1);

        }
    };


    // =====================================================
    // DECREASE QUANTITY
    // =====================================================

    const decreaseQuantity = () => {

        if (quantity > 1) {

            setQuantity(quantity - 1);

        }
    };


    // =====================================================
    // ADD TO CART
    // =====================================================

    const handleAddToCart = () => {

        addToCart(product, quantity);

        setAdded(true);


        // Remove success message after 2 seconds

        setTimeout(() => {

            setAdded(false);

        }, 2000);
    };


    // =====================================================
    // BUY NOW
    // =====================================================

    const handleBuyNow = () => {

        addToCart(product, quantity);

        navigate("/checkout");
    };


    return (

        <div className="product-details-page">


            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <div className="product-breadcrumb">

                <button
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Home
                </button>

                <span>
                    /
                </span>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Products
                </button>

                <span>
                    /
                </span>

                <strong>
                    Product Details
                </strong>

            </div>


            {/* =================================================
                PRODUCT SECTION
            ================================================= */}

            <section className="product-details-container">


                {/* =================================================
                    PRODUCT IMAGE
                ================================================= */}

                <div className="product-details-image-wrapper">

                    <div className="product-details-image">

                        <img
                            src={product.image}
                            alt={product.name}
                        />

                    </div>

                    <span className="product-details-badge">
                        BEST SELLER
                    </span>

                </div>


                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <div className="product-details-info">

                    <span className="product-details-category">
                        {product.category}
                    </span>


                    <h1>
                        {product.name}
                    </h1>


                    {/* Rating */}

                    <div className="product-details-rating">

                        <span className="stars">
                            ★★★★★
                        </span>

                        <strong>
                            {product.rating}
                        </strong>

                        <span>
                            ({product.reviews} reviews)
                        </span>

                    </div>


                    {/* Description */}

                    <p className="product-details-description">
                        {product.description}
                    </p>


                    {/* Price */}

                    <div className="product-details-price">

                        <strong>
                            ₹
                            {product.price.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                        <span>
                            ₹
                            {product.oldPrice.toLocaleString(
                                "en-IN"
                            )}
                        </span>

                        <small>
                            {Math.round(
                                ((product.oldPrice -
                                    product.price) /
                                    product.oldPrice) *
                                    100
                            )}
                            % OFF
                        </small>

                    </div>


                    {/* Stock */}

                    <div className="product-stock">

                        <span className="stock-dot">
                            ●
                        </span>

                        {product.stock} items left in stock

                    </div>


                    <div className="product-details-divider" />


                    {/* =================================================
                        QUANTITY
                    ================================================= */}

                    <div className="product-quantity-section">

                        <span>
                            Quantity
                        </span>


                        <div className="product-quantity-control">

                            <button
                                type="button"
                                onClick={decreaseQuantity}
                            >
                                −
                            </button>

                            <strong>
                                {quantity}
                            </strong>

                            <button
                                type="button"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        ACTION BUTTONS
                    ================================================= */}

                    <div className="product-action-buttons">

                        <button
                            className={
                                added
                                    ? "add-to-cart-btn added"
                                    : "add-to-cart-btn"
                            }
                            onClick={handleAddToCart}
                        >

                            {added
                                ? "✓ Added to Cart"
                                : "🛒 Add to Cart"}

                        </button>


                        <button
                            className="buy-now-btn"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                            <span>
                                →
                            </span>
                        </button>

                    </div>


                    {/* =================================================
                        FEATURES
                    ================================================= */}

                    <div className="product-features">

                        <h3>
                            Product Features
                        </h3>


                        <ul>

                            {product.features.map(
                                (feature, index) => (

                                    <li key={index}>

                                        <span>
                                            ✓
                                        </span>

                                        {feature}

                                    </li>

                                )
                            )}

                        </ul>

                    </div>


                    {/* =================================================
                        SERVICE INFO
                    ================================================= */}

                    <div className="product-service-info">

                        <div>

                            <span>
                                🚚
                            </span>

                            <div>

                                <strong>
                                    Free Delivery
                                </strong>

                                <p>
                                    On orders above ₹999
                                </p>

                            </div>

                        </div>


                        <div>

                            <span>
                                ↩️
                            </span>

                            <div>

                                <strong>
                                    Easy Returns
                                </strong>

                                <p>
                                    7-day return policy
                                </p>

                            </div>

                        </div>


                        <div>

                            <span>
                                🔒
                            </span>

                            <div>

                                <strong>
                                    Secure Payment
                                </strong>

                                <p>
                                    100% secure checkout
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}


export default ProductDetails;