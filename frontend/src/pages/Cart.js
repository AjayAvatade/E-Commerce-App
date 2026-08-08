import React from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";


function Cart() {

    const navigate = useNavigate();

    const {

        cartItems,

        subtotal,

        deliveryCharge,

        total,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart

    } = useCart();


    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cartItems.length === 0) {

        return (

            <div className="empty-cart-page">

                <div className="empty-cart-icon">
                    🛒
                </div>

                <h1>
                    Your Cart is Empty
                </h1>

                <p>
                    Looks like you haven't added
                    anything to your cart yet.
                </p>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Continue Shopping
                </button>

            </div>
        );
    }


    // =====================================================
    // CART PAGE
    // =====================================================

    return (

        <div className="cart-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <section className="cart-header">

                <div>

                    <span className="section-label">
                        SHOPORA
                    </span>

                    <h1>
                        Your Shopping Cart
                    </h1>

                    <p>
                        Review your items before checkout.
                    </p>

                </div>


                <button
                    className="continue-shopping-btn"
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    ← Continue Shopping
                </button>

            </section>


            {/* =================================================
                CART CONTENT
            ================================================= */}

            <section className="cart-container">


                {/* =================================================
                    CART ITEMS
                ================================================= */}

                <div className="cart-items-section">

                    <div className="cart-items-header">

                        <h2>
                            Cart Items
                        </h2>

                        <span>
                            {cartItems.length}{" "}
                            {cartItems.length === 1
                                ? "Item"
                                : "Items"}
                        </span>

                    </div>


                    {cartItems.map((item) => (

                        <div
                            className="cart-item"
                            key={item._id}
                        >


                            {/* Product Image */}

                            <div
                                className="cart-item-image"
                                onClick={() =>
                                    navigate(
                                        `/products/${item._id}`
                                    )
                                }
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                            </div>


                            {/* Product Information */}

                            <div className="cart-item-info">

                                <span className="cart-item-category">
                                    {item.category}
                                </span>

                                <h3>
                                    {item.name}
                                </h3>

                                <div className="cart-item-price">

                                    ₹
                                    {Number(
                                        item.price
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </div>

                            </div>


                            {/* Quantity */}

                            <div className="cart-quantity">

                                <span>
                                    Quantity
                                </span>


                                <div className="cart-quantity-control">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            decreaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        −
                                    </button>


                                    <strong>
                                        {item.quantity}
                                    </strong>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            increaseQuantity(
                                                item._id
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>

                            </div>


                            {/* Item Total */}

                            <div className="cart-item-total">

                                <span>
                                    Item Total
                                </span>

                                <strong>

                                    ₹
                                    {(
                                        Number(
                                            item.price
                                        ) *
                                        item.quantity
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </strong>

                            </div>


                            {/* Remove */}

                            <button
                                type="button"
                                className="remove-cart-item"
                                onClick={() =>
                                    removeFromCart(
                                        item._id
                                    )
                                }
                                title="Remove item"
                            >
                                ×
                            </button>

                        </div>

                    ))}

                </div>


                {/* =================================================
                    ORDER SUMMARY
                ================================================= */}

                <aside className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <strong>

                            ₹
                            {subtotal.toLocaleString(
                                "en-IN"
                            )}

                        </strong>

                    </div>


                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <strong>

                            {deliveryCharge === 0
                                ? "FREE"
                                : `₹${deliveryCharge}`}

                        </strong>

                    </div>


                    <div className="summary-divider" />


                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>

                            ₹
                            {total.toLocaleString(
                                "en-IN"
                            )}

                        </strong>

                    </div>


                    {subtotal < 999 && (

                        <div className="free-delivery-message">

                            Add ₹
                            {(999 - subtotal).toLocaleString(
                                "en-IN"
                            )}{" "}
                            more to get FREE delivery.

                        </div>

                    )}


                    <button
                        className="checkout-btn"
                        onClick={() =>
                            navigate("/checkout")
                        }
                    >

                        Proceed to Checkout

                        <span>
                            →
                        </span>

                    </button>


                    <div className="cart-secure-info">

                        <span>
                            🔒
                        </span>

                        <p>
                            Secure and encrypted checkout
                        </p>

                    </div>

                </aside>

            </section>

        </div>
    );
}


export default Cart;