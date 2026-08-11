import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

    const navigate = useNavigate();

    const { addToCart } = useCart();


    // =====================================================
    // OPEN PRODUCT
    // =====================================================

    const handleProductClick = () => {
        navigate(`/products/${product._id}`);
    };


    // =====================================================
    // ADD TO CART
    // =====================================================

    const handleAddToCart = (e) => {

        // Prevent card click
        e.stopPropagation();

        addToCart(product, 1);
    };


    // =====================================================
    // DISCOUNT
    // =====================================================

    const discount =
        product.oldPrice && product.price
            ? Math.round(
                  ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
              )
            : 0;


    return (

        <article
            className="product-card"
            onClick={handleProductClick}
        >

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="product-card-image">

                <img
                    src={product.image}
                    alt={product.name}
                />


                {/* Discount */}

                {discount > 0 && (

                    <span className="product-discount">
                        {discount}% OFF
                    </span>

                )}


                {/* Wishlist */}

                <button
                    className="product-wishlist"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    aria-label="Add to wishlist"
                >
                    ♡
                </button>

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="product-card-content">


                {/* Category */}

                <span className="product-card-category">
                    {product.category}
                </span>


                {/* Name */}

                <h3 className="product-card-name">
                    {product.name}
                </h3>


                {/* Rating */}

                <div className="product-card-rating">

                    <span>
                        ★
                    </span>

                    <strong>
                        {product.rating || "4.5"}
                    </strong>

                    {product.reviews && (

                        <small>
                            ({product.reviews})
                        </small>

                    )}

                </div>


                {/* Price */}

                <div className="product-card-bottom">

                    <div className="product-card-price">

                        <strong>
                            ₹
                            {Number(
                                product.price
                            ).toLocaleString("en-IN")}
                        </strong>


                        {product.oldPrice && (

                            <span>
                                ₹
                                {Number(
                                    product.oldPrice
                                ).toLocaleString("en-IN")}
                            </span>

                        )}

                    </div>


                    {/* Add to cart */}

                    <button
                        className="product-card-cart"
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                    >
                        🛒
                    </button>

                </div>

            </div>

        </article>
    );
}

export default ProductCard;