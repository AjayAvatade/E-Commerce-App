import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";


function Checkout() {

    const navigate = useNavigate();

    const {
        cartItems,
        subtotal,
        deliveryCharge,
        total,
        clearCart
    } = useCart();


    // =====================================================
    // PAYMENT METHOD
    // =====================================================

    const [paymentMethod, setPaymentMethod] =
        useState("COD");


    // =====================================================
    // FORM DATA
    // =====================================================

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


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData({

            ...formData,

            [name]: value

        });
    };


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
                    Add some products before
                    proceeding to checkout.
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
    // PLACE ORDER
    // =====================================================

    const handlePlaceOrder = (e) => {

        e.preventDefault();


        // -------------------------------------------------
        // Validate fields
        // -------------------------------------------------

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


        const emptyField =
            requiredFields.find(
                (field) =>
                    !formData[field].trim()
            );


        if (emptyField) {

            alert(
                "Please fill all delivery details."
            );

            return;
        }


        // -------------------------------------------------
        // Create order
        // -------------------------------------------------

        const order = {

            customer: formData,

            items: cartItems,

            subtotal: subtotal,

            deliveryCharge: deliveryCharge,

            total: total,

            paymentMethod: paymentMethod,

            status:
                paymentMethod === "COD"
                    ? "pending"
                    : "payment_pending"

        };


        console.log(
            "Order Created:",
            order
        );


        // -------------------------------------------------
        // COD
        // -------------------------------------------------

        if (paymentMethod === "COD") {

            clearCart();


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


        // -------------------------------------------------
        // ONLINE PAYMENT
        // -------------------------------------------------

        alert(
            "Online payment integration will be connected with Cashfree."
        );
    };


    return (

        <div className="checkout-page">


            {/* =================================================
                HEADER
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


                    {/* =================================================
                        CONTACT INFORMATION
                    ================================================= */}

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


                            {/* First Name */}

                            <div className="checkout-field">

                                <label>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Enter first name"
                                    value={
                                        formData.firstName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* Last Name */}

                            <div className="checkout-field">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Enter last name"
                                    value={
                                        formData.lastName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* Email */}

                            <div className="checkout-field">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@email.com"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* Phone */}

                            <div className="checkout-field">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        DELIVERY ADDRESS
                    ================================================= */}

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


                            {/* Address */}

                            <div className="checkout-field full-width">

                                <label>
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    rows="3"
                                    placeholder="House no., street, area..."
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* City */}

                            <div className="checkout-field">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter city"
                                    value={
                                        formData.city
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* State */}

                            <div className="checkout-field">

                                <label>
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    placeholder="Enter state"
                                    value={
                                        formData.state
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* PIN */}

                            <div className="checkout-field">

                                <label>
                                    PIN Code
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    placeholder="Enter PIN code"
                                    maxLength="6"
                                    value={
                                        formData.pincode
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        PAYMENT
                    ================================================= */}

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
                                        paymentMethod ===
                                        "COD"
                                    }
                                    onChange={() =>
                                        setPaymentMethod(
                                            "COD"
                                        )
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
                                        paymentMethod ===
                                        "ONLINE"
                                    }
                                    onChange={() =>
                                        setPaymentMethod(
                                            "ONLINE"
                                        )
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
                    RIGHT — ORDER SUMMARY
                ================================================= */}

                <aside className="checkout-summary">


                    <h2>
                        Order Summary
                    </h2>


                    {/* =================================================
                        CART PRODUCTS
                    ================================================= */}

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
                                        {Number(
                                            item.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>


                    <div className="checkout-summary-divider" />


                    {/* =================================================
                        PRICE
                    ================================================= */}

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


                    {/* TOTAL */}

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


                    {/* =================================================
                        PLACE ORDER
                    ================================================= */}

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