import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
    const navigate = useNavigate();

    const [isWishlisted, setIsWishlisted] = useState(false);

    if (!product) {
        return null;
    }

    const {
        _id,
        id,
        name,
        image,
        price,
        oldPrice,
        rating,
        reviews,
        discount,
        category
    } = product;

    const productId = _id || id;

    const handleProductClick = () => {
        navigate(`/products/${productId}`);
    };

    const handleWishlist = (e) => {
        e.stopPropagation();

        setIsWishlisted(!isWishlisted);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();

        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    return (
        <div className="product-card">

            {/* Product Image Section */}
            <div
                className="product-image-container"
                onClick={handleProductClick}
            >

                {/* Discount */}
                {discount && (
                    <span className="product-discount">
                        {discount}% OFF
                    </span>
                )}

                {/* Wishlist */}
                <button
                    className={`wishlist-btn ${
                        isWishlisted ? "wishlisted" : ""
                    }`}
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                >
                    {isWishlisted ? "♥" : "♡"}
                </button>

                {/* Product Image */}
                <img
                    src={image}
                    alt={name}
                    className="product-image"
                />

            </div>


            {/* Product Information */}
            <div className="product-info">

                {/* Category */}
                {category && (
                    <p className="product-category">
                        {category}
                    </p>
                )}

                {/* Product Name */}
                <h3
                    className="product-name"
                    onClick={handleProductClick}
                >
                    {name}
                </h3>


                {/* Rating */}
                <div className="product-rating">

                    <span className="rating-star">
                        ★
                    </span>

                    <span className="rating-value">
                        {rating || "4.5"}
                    </span>

                    {reviews !== undefined && (
                        <span className="review-count">
                            ({reviews})
                        </span>
                    )}

                </div>


                {/* Price */}
                <div className="product-price">

                    <span className="current-price">
                        ₹{Number(price).toLocaleString("en-IN")}
                    </span>

                    {oldPrice && (
                        <span className="old-price">
                            ₹{Number(oldPrice).toLocaleString("en-IN")}
                        </span>
                    )}

                </div>


                {/* Add To Cart */}
                <button
                    className="add-cart-btn"
                    onClick={handleAddToCart}
                >
                    <span>🛒</span>
                    Add to Cart
                </button>

            </div>

        </div>
    );
}

export default ProductCard;