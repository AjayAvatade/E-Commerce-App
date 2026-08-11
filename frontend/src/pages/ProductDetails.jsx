import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);


    // =====================================================
    // TEMPORARY PRODUCTS
    // Later this will come from MongoDB
    // =====================================================

    const products = [
        {
            _id: "1",
            name: "Premium Wireless Headphones",
            category: "Electronics",
            price: 2499,
            oldPrice: 3999,
            rating: 4.8,
            reviews: 124,
            image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
            description:
                "Experience crystal-clear sound with these premium wireless headphones. Designed for comfort, long listening sessions and powerful audio performance."
        },

        {
            _id: "2",
            name: "Smart Watch",
            category: "Electronics",
            price: 1999,
            oldPrice: 2999,
            rating: 4.6,
            reviews: 89,
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
            description:
                "A stylish smart watch designed to keep you connected, track your activities and complement your everyday lifestyle."
        },

        {
            _id: "3",
            name: "Classic White Sneakers",
            category: "Fashion",
            price: 1799,
            oldPrice: 2499,
            rating: 4.7,
            reviews: 156,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
            description:
                "Classic white sneakers with a clean and versatile design. Perfect for casual outfits, everyday walks and comfortable all-day wear."
        },

        {
            _id: "4",
            name: "Leather Backpack",
            category: "Accessories",
            price: 1299,
            oldPrice: 1999,
            rating: 4.5,
            reviews: 76,
            image:
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900",
            description:
                "A premium everyday backpack with a stylish design and enough space for your essentials."
        },

        {
            _id: "5",
            name: "Minimalist Desk Lamp",
            category: "Home",
            price: 899,
            oldPrice: 1299,
            rating: 4.4,
            reviews: 64,
            image:
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900",
            description:
                "Modern minimalist desk lamp designed to provide comfortable lighting for your workspace or study area."
        },

        {
            _id: "6",
            name: "Cotton Casual T-Shirt",
            category: "Fashion",
            price: 699,
            oldPrice: 999,
            rating: 4.6,
            reviews: 112,
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900",
            description:
                "Soft and comfortable cotton T-shirt designed for everyday casual wear."
        },

        {
            _id: "7",
            name: "Modern Coffee Mug",
            category: "Home",
            price: 399,
            oldPrice: 599,
            rating: 4.3,
            reviews: 48,
            image:
                "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900",
            description:
                "A modern ceramic coffee mug that adds a simple and elegant touch to your kitchen."
        },

        {
            _id: "8",
            name: "Premium Sunglasses",
            category: "Accessories",
            price: 1499,
            oldPrice: 2199,
            rating: 4.7,
            reviews: 91,
            image:
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900",
            description:
                "Stylish premium sunglasses designed for everyday use with a modern and comfortable frame."
        }
    ];


    // =====================================================
    // FIND PRODUCT
    // =====================================================

    const product = products.find(
        (item) => item._id === id
    );


    // =====================================================
    // PRODUCT NOT FOUND
    // =====================================================

    if (!product) {

        return (

            <main className="product-not-found">

                <div>

                    <span>
                        🔍
                    </span>

                    <h1>
                        Product Not Found
                    </h1>

                    <p>
                        The product you're looking for
                        doesn't exist.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Back to Products
                    </button>

                </div>

            </main>
        );
    }


    // =====================================================
    // DISCOUNT
    // =====================================================

    const discount =
        product.oldPrice && product.price
            ? Math.round(
                  ((product.oldPrice -
                      product.price) /
                      product.oldPrice) *
                      100
              )
            : 0;


    // =====================================================
    // TOTAL PRICE
    // =====================================================

    const totalPrice =
        product.price * quantity;


    // =====================================================
    // QUANTITY
    // =====================================================

    const increaseQuantity = () => {

        setQuantity((previous) =>
            previous + 1
        );
    };


    const decreaseQuantity = () => {

        setQuantity((previous) =>
            Math.max(1, previous - 1)
        );
    };


    // =====================================================
    // ADD TO CART
    // =====================================================

    const handleAddToCart = () => {

        addToCart(product, quantity);

        navigate("/cart");
    };


    // =====================================================
    // BUY NOW
    // =====================================================

    const handleBuyNow = () => {

        addToCart(product, quantity);

        navigate("/checkout");
    };


    return (

        <main className="product-details-page">


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
                    {product.name}
                </strong>

            </div>


            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}

            <section className="product-details-container">


                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="product-details-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                    {discount > 0 && (

                        <span className="product-details-discount">
                            {discount}% OFF
                        </span>

                    )}

                </div>


                {/* =================================================
                    INFORMATION
                ================================================= */}

                <div className="product-details-info">


                    {/* Category */}

                    <span className="product-details-category">
                        {product.category}
                    </span>


                    {/* Name */}

                    <h1>
                        {product.name}
                    </h1>


                    {/* Rating */}

                    <div className="product-details-rating">

                        <span>
                            ★
                        </span>

                        <strong>
                            {product.rating}
                        </strong>

                        <span className="rating-divider">
                            |
                        </span>

                        <small>
                            {product.reviews} Reviews
                        </small>

                    </div>


                    {/* Price */}

                    <div className="product-details-price">

                        <strong>
                            ₹
                            {product.price.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                        {product.oldPrice && (

                            <span>
                                ₹
                                {product.oldPrice.toLocaleString(
                                    "en-IN"
                                )}
                            </span>

                        )}

                        {discount > 0 && (

                            <small>
                                Save {discount}%
                            </small>

                        )}

                    </div>


                    {/* Description */}

                    <p className="product-details-description">
                        {product.description}
                    </p>


                    {/* Divider */}

                    <div className="product-details-divider" />


                    {/* Quantity */}

                    <div className="product-quantity-section">

                        <span>
                            Quantity
                        </span>

                        <div className="quantity-control">

                            <button
                                onClick={
                                    decreaseQuantity
                                }
                            >
                                −
                            </button>

                            <strong>
                                {quantity}
                            </strong>

                            <button
                                onClick={
                                    increaseQuantity
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* Total */}

                    <div className="product-details-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {totalPrice.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>


                    {/* Buttons */}

                    <div className="product-details-buttons">

                        <button
                            className="product-add-cart-btn"
                            onClick={
                                handleAddToCart
                            }
                        >
                            🛒
                            <span>
                                Add to Cart
                            </span>
                        </button>


                        <button
                            className="product-buy-btn"
                            onClick={
                                handleBuyNow
                            }
                        >
                            Buy Now
                        </button>

                    </div>


                    {/* Features */}

                    <div className="product-features">

                        <div>

                            <span>
                                🚚
                            </span>

                            <div>
                                <strong>
                                    Free Delivery
                                </strong>

                                <small>
                                    On orders above ₹999
                                </small>
                            </div>

                        </div>


                        <div>

                            <span>
                                ↩
                            </span>

                            <div>
                                <strong>
                                    Easy Returns
                                </strong>

                                <small>
                                    7 days return policy
                                </small>
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

                                <small>
                                    100% secure checkout
                                </small>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </main>
    );
}

export default ProductDetails;