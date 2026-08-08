import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    /* =====================================================
       TEMPORARY CART DATA
       Later → CartContext
    ===================================================== */

    const cartItems = [
        {
            _id: "1",
            name: "Premium Wireless Headphones",
            price: 2499,
            quantity: 1,
            image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
        },
        {
            _id: "2",
            name: "Classic Casual Sneakers",
            price: 1899,
            quantity: 2,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
        }
    ];

    /* =====================================================
       HANDLE INPUT
    ===================================================== */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    /* =====================================================
       CALCULATE TOTAL
    ===================================================== */

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const deliveryCharge =
        subtotal >= 999 ? 0 : 79;

    const total =
        subtotal + deliveryCharge;


    /* =====================================================
       PLACE ORDER
    ===================================================== */

    const handlePlaceOrder = (e) => {

        e.preventDefault();

        /*
         * Basic validation
         */

        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phone",
            "address",
            "city",
            "state",
            "pincode"
        ];

        const emptyField = requiredFields.find(
            (field) => !formData[field].trim()
        );

        if (emptyField) {

            alert(
                "Please fill all delivery details."
            );

            return;
        }


        /*
         * Create temporary order
         */

        const order = {

            customer: formData,

            items: cartItems,

            subtotal,

            deliveryCharge,

            total,

            paymentMethod,

            status:
                paymentMethod === "COD"
                    ? "pending"
                    : "payment_pending"
        };


        console.log(
            "Order:",
            order
        );


        /*
         * COD
         */

        if (paymentMethod === "COD") {

            navigate(
                "/order-success",
                {
                    state: {
                        order
                    }
                }
            );

            return;
        }


        /*
         * Online Payment
         *
         * Later:
         * Backend → Cashfree
         */

        alert(
            "Online payment integration will be connected with Cashfree."
        );
    };


    return (
        <div className="checkout-page">

            {/* =================================================
                CHECKOUT HEADER
            ================================================= */}

            <section className="checkout-header">

                <div>

                    <span className="section-label">
                        SHOPORA CHECKOUT
                    </span>

                    <h1>
                        Checkout
                    </h1>

                    <p>
                        Complete your order securely.
                    </p>

                </div>

            </section>


            {/* =================================================
                CHECKOUT CONTENT
            ================================================= */}

            <form
                className="checkout-container"
                onSubmit={handlePlaceOrder}
            >


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="checkout-main">


                    {/* =============================================
                        CONTACT INFORMATION
                    ============================================= */}

                    <section className="checkout-card">

                        <div className="checkout-section-title">

                            <div className="checkout-number">
                                01
                            </div>

                            <div>

                                <h2>
                                    Contact Information
                                </h2>

                                <p>
                                    Enter your contact details
                                </p>

                            </div>

                        </div>


                        <div className="checkout-form-grid">

                            <div className="checkout-field">

                                <label>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="checkout-field">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="checkout-field">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="checkout-field">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </section>


                    {/* =============================================
                        DELIVERY ADDRESS
                    ============================================= */}

                    <section className="checkout-card">

                        <div className="checkout-section-title">

                            <div className="checkout-number">
                                02
                            </div>

                            <div>

                                <h2>
                                    Delivery Address
                                </h2>

                                <p>
                                    Where should we deliver your order?
                                </p>

                            </div>

                        </div>


                        <div className="checkout-form-grid">


                            <div className="checkout-field full-width">

                                <label>
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    rows="3"
                                    placeholder="House no., street, area..."
                                    value={formData.address}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="checkout-field">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="checkout-field">

                                <label>
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="Enter state"
                                    value={formData.state}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="checkout-field">

                                <label>
                                    PIN Code
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Enter PIN code"
                                    maxLength="6"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </section>


                    {/* =============================================
                        PAYMENT METHOD
                    ============================================= */}

                    <section className="checkout-card">

                        <div className="checkout-section-title">

                            <div className="checkout-number">
                                03
                            </div>

                            <div>

                                <h2>
                                    Payment Method
                                </h2>

                                <p>
                                    Choose how you want to pay
                                </p>

                            </div>

                        </div>


                        <div className="payment-options">


                            {/* COD */}

                            <label
                                className={
                                    paymentMethod === "COD"
                                        ? "payment-option active"
                                        : "payment-option"
                                }
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={
                                        paymentMethod === "COD"
                                    }
                                    onChange={() =>
                                        setPaymentMethod("COD")
                                    }
                                />

                                <div className="payment-icon">
                                    💵
                                </div>

                                <div className="payment-info">

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <span>
                                        Pay when your order arrives
                                    </span>

                                </div>

                                <div className="payment-check">
                                    ✓
                                </div>

                            </label>


                            {/* ONLINE */}

                            <label
                                className={
                                    paymentMethod === "ONLINE"
                                        ? "payment-option active"
                                        : "payment-option"
                                }
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="ONLINE"
                                    checked={
                                        paymentMethod === "ONLINE"
                                    }
                                    onChange={() =>
                                        setPaymentMethod("ONLINE")
                                    }
                                />

                                <div className="payment-icon">
                                    💳
                                </div>

                                <div className="payment-info">

                                    <strong>
                                        Online Payment
                                    </strong>

                                    <span>
                                        UPI, Card, Net Banking
                                    </span>

                                </div>

                                <div className="payment-check">
                                    ✓
                                </div>

                            </label>

                        </div>


                        {paymentMethod === "ONLINE" && (

                            <div className="online-payment-note">

                                🔒 You will be redirected to
                                our secure payment gateway
                                after placing the order.

                            </div>

                        )}

                    </section>

                </div>


                {/* =================================================
                    RIGHT SIDE — ORDER SUMMARY
                ================================================= */}

                <aside className="checkout-summary">

                    <h2>
                        Order Summary
                    </h2>


                    {/* Products */}

                    <div className="checkout-products">

                        {cartItems.map((item) => (

                            <div
                                className="checkout-product"
                                key={item._id}
                            >

                                <div className="checkout-product-image">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <span>
                                        {item.quantity}
                                    </span>

                                </div>


                                <div className="checkout-product-info">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <span>
                                        ₹
                                        {item.price.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="checkout-summary-divider" />


                    {/* Price */}

                    <div className="checkout-summary-row">

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


                    <div className="checkout-summary-row">

                        <span>
                            Delivery
                        </span>

                        <strong>
                            {deliveryCharge === 0
                                ? "FREE"
                                : `₹${deliveryCharge}`}
                        </strong>

                    </div>


                    <div className="checkout-summary-divider" />


                    <div className="checkout-total">

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


                    {/* Place Order */}

                    <button
                        type="submit"
                        className="place-order-btn"
                    >

                        {paymentMethod === "COD"
                            ? "Place Order"
                            : "Continue to Payment"}

                        <span>
                            →
                        </span>

                    </button>


                    <div className="checkout-security">

                        🔒 Secure Checkout

                    </div>


                    <button
                        type="button"
                        className="back-to-cart-btn"
                        onClick={() =>
                            navigate("/cart")
                        }
                    >
                        ← Back to Cart
                    </button>

                </aside>

            </form>

        </div>
    );
}

export default Checkout;