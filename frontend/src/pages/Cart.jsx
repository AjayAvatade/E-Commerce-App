import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {

    const navigate = useNavigate();

    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        getCartTotal
    } = useCart();


    // =====================================================
    // CART TOTAL
    // =====================================================

    const subtotal = getCartTotal();


    // Free delivery above ₹999
    const deliveryCharge =
        subtotal === 0
            ? 0
            : subtotal >= 999
            ? 0
            : 49;


    const total =
        subtotal + deliveryCharge;


    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cartItems.length === 0) {

        return (

            <main className="cart-page">

                <section className="empty-cart">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <span className="cart-eyebrow">
                        SHOPORA
                    </span>

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
                        Start Shopping
                    </button>

                </section>

            </main>
        );
    }


    return (

        <main className="cart-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <section className="cart-header">

                <span className="cart-eyebrow">
                    SHOPORA CART
                </span>

                <h1>
                    Your Shopping Cart
                </h1>

                <p>
                    Review your items before checkout.
                </p>

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


                    {/* Items */}

                    <div className="cart-items">

                        {cartItems.map((item) => (

                            <article
                                className="cart-item"
                                key={item._id}
                            >


                                {/* Product Image */}

                                <div className="cart-item-image">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                </div>


                                {/* Product Information */}

                                <div className="cart-item-info">

                                    <span>
                                        {item.category}
                                    </span>

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <strong>
                                        ₹
                                        {Number(
                                            item.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                </div>


                                {/* Quantity */}

                                <div className="cart-item-quantity">

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item._id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        −
                                    </button>

                                    <strong>
                                        {item.quantity}
                                    </strong>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item._id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                {/* Item Total */}

                                <div className="cart-item-total">

                                    <strong>
                                        ₹
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                </div>


                                {/* Remove */}

                                <button
                                    className="cart-remove"
                                    onClick={() =>
                                        removeFromCart(
                                            item._id
                                        )
                                    }
                                    aria-label="Remove product"
                                >
                                    ×
                                </button>

                            </article>

                        ))}

                    </div>


                    {/* Continue Shopping */}

                    <button
                        className="continue-shopping"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        ← Continue Shopping
                    </button>

                </div>


                {/* =================================================
                    ORDER SUMMARY
                ================================================= */}

                <aside className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="summary-line">

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


                    <div className="summary-line">

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


                    {/* Free Delivery Message */}

                    {subtotal < 999 && (
                        <div className="delivery-message">

                            Add ₹
                            {(999 - subtotal).toLocaleString(
                                "en-IN"
                            )}
                            {" "}
                            more to get
                            <strong>
                                {" "}FREE DELIVERY
                            </strong>

                        </div>
                    )}


                    {subtotal >= 999 && (
                        <div className="delivery-message success">

                            ✓ You have unlocked
                            <strong>
                                {" "}FREE DELIVERY
                            </strong>

                        </div>
                    )}


                    {/* Checkout */}

                    <button
                        className="checkout-button"
                        onClick={() =>
                            navigate("/checkout")
                        }
                    >
                        Proceed to Checkout
                    </button>


                    {/* Security */}

                    <div className="secure-checkout">

                        🔒
                        <span>
                            Secure & encrypted checkout
                        </span>

                    </div>

                </aside>

            </section>

        </main>
    );
}

export default Cart;