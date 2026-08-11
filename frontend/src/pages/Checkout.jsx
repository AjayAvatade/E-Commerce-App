import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {

    const navigate = useNavigate();

    const {
        cartItems,
        getCartTotal,
        clearCart
    } = useCart();


    // =====================================================
    // FORM STATE
    // =====================================================

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });


    const [paymentMethod, setPaymentMethod] =
        useState("COD");


    const [error, setError] = useState("");


    // =====================================================
    // TOTALS
    // =====================================================

    const subtotal = getCartTotal();

    const deliveryCharge =
        subtotal === 0
            ? 0
            : subtotal >= 999
            ? 0
            : 49;

    const total =
        subtotal + deliveryCharge;


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
    };


    // =====================================================
    // VALIDATE FORM
    // =====================================================

    const validateForm = () => {

        const {
            fullName,
            email,
            phone,
            address,
            city,
            state,
            pincode
        } = formData;


        if (
            !fullName ||
            !email ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !pincode
        ) {

            setError(
                "Please fill in all required fields."
            );

            return false;
        }


        if (phone.length !== 10) {

            setError(
                "Please enter a valid 10-digit phone number."
            );

            return false;
        }


        if (pincode.length !== 6) {

            setError(
                "Please enter a valid 6-digit pincode."
            );

            return false;
        }


        return true;
    };


    // =====================================================
    // PLACE ORDER
    // =====================================================

    const handlePlaceOrder = async () => {

    if (!validateForm()) {
        return;
    }


    try {

        // ================================================
        // GET JWT TOKEN
        // ================================================

        const token =
            localStorage.getItem("token");


        if (!token) {

            setError(
                "Please login before placing an order."
            );

            navigate("/login");

            return;
        }


        // ================================================
        // PREPARE ORDER DATA
        // ================================================

        const orderData = {

            items: cartItems.map((item) => ({

                product:
                    item._id,

                quantity:
                    Number(item.quantity)

            })),

            shippingAddress: {

                fullName:
                    formData.fullName,

                email:
                    formData.email,

                phone:
                    formData.phone,

                address:
                    formData.address,

                city:
                    formData.city,

                state:
                    formData.state,

                pincode:
                    formData.pincode

            },

            paymentMethod

        };


        // ================================================
        // SEND ORDER TO BACKEND
        // ================================================

        const response = await fetch(
            "http://localhost:8080/api/orders",
            {
                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${token}`
                },

                body:
                    JSON.stringify(orderData)
            }
        );


        const data =
            await response.json();


        // ================================================
        // HANDLE BACKEND ERROR
        // ================================================

        if (!response.ok) {

            setError(
                data.message ||
                "Failed to place order."
            );

            return;
        }


        // ================================================
        // SAVE ORDER FOR SUCCESS PAGE
        // ================================================

        localStorage.setItem(
            "shoporaLastOrder",
            JSON.stringify(data.order)
        );


        // ================================================
        // CLEAR CART
        // ================================================

        clearCart();


        // ================================================
        // GO TO SUCCESS PAGE
        // ================================================

        navigate("/order-success");


    } catch (error) {

        console.error(
            "Place Order Error:",
            error
        );


        setError(
            "Unable to connect to the server. Please try again."
        );
    }
};


    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cartItems.length === 0) {

        return (

            <main className="checkout-page">

                <section className="checkout-empty">

                    <div>
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
                        Start Shopping
                    </button>

                </section>

            </main>
        );
    }


    return (

        <main className="checkout-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <section className="checkout-header">

                <span>
                    SHOPORA CHECKOUT
                </span>

                <h1>
                    Complete Your Order
                </h1>

                <p>
                    Enter your details and choose
                    your preferred payment method.
                </p>

            </section>


            {/* =================================================
                CHECKOUT CONTENT
            ================================================= */}

            <section className="checkout-container">


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <div className="checkout-form">


                    {/* =================================================
                        CUSTOMER INFORMATION
                    ================================================= */}

                    <div className="checkout-card">

                        <div className="checkout-card-title">

                            <span>
                                01
                            </span>

                            <div>

                                <h2>
                                    Customer Information
                                </h2>

                                <p>
                                    Enter your contact details
                                </p>

                            </div>

                        </div>


                        <div className="checkout-input-grid">


                            {/* Full Name */}

                            <div className="checkout-field">

                                <label>
                                    Full Name *
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={
                                        formData.fullName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            {/* Email */}

                            <div className="checkout-field">

                                <label>
                                    Email Address *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
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
                                    Phone Number *
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    maxLength="10"
                                    placeholder="10-digit mobile number"
                                    value={
                                        formData.phone
                                    }
                                    onChange={(e) => {

                                        const value =
                                            e.target.value.replace(
                                                /\D/g,
                                                ""
                                            );

                                        setFormData(
                                            (previous) => ({
                                                ...previous,
                                                phone: value
                                            })
                                        );

                                        setError("");
                                    }}
                                />

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        DELIVERY ADDRESS
                    ================================================= */}

                    <div className="checkout-card">

                        <div className="checkout-card-title">

                            <span>
                                02
                            </span>

                            <div>

                                <h2>
                                    Delivery Address
                                </h2>

                                <p>
                                    Where should we deliver
                                    your order?
                                </p>

                            </div>

                        </div>


                        <div className="checkout-input-grid">


                            {/* Address */}

                            <div className="checkout-field full-width">

                                <label>
                                    Address *
                                </label>

                                <textarea
                                    name="address"
                                    placeholder="House No., Street, Area..."
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    rows="3"
                                />

                            </div>


                            {/* City */}

                            <div className="checkout-field">

                                <label>
                                    City *
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
                                    State *
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


                            {/* Pincode */}

                            <div className="checkout-field">

                                <label>
                                    Pincode *
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    maxLength="6"
                                    placeholder="6-digit pincode"
                                    value={
                                        formData.pincode
                                    }
                                    onChange={(e) => {

                                        const value =
                                            e.target.value.replace(
                                                /\D/g,
                                                ""
                                            );

                                        setFormData(
                                            (previous) => ({
                                                ...previous,
                                                pincode: value
                                            })
                                        );

                                        setError("");
                                    }}
                                />

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        PAYMENT METHOD
                    ================================================= */}

                    <div className="checkout-card">

                        <div className="checkout-card-title">

                            <span>
                                03
                            </span>

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
                                className={`payment-option ${
                                    paymentMethod === "COD"
                                        ? "active"
                                        : ""
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={
                                        paymentMethod === "COD"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <span className="payment-icon">
                                    💵
                                </span>

                                <div>

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <small>
                                        Pay when your order arrives
                                    </small>

                                </div>

                            </label>


                            {/* ONLINE */}

                            <label
                                className={`payment-option ${
                                    paymentMethod === "ONLINE"
                                        ? "active"
                                        : ""
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="ONLINE"
                                    checked={
                                        paymentMethod === "ONLINE"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <span className="payment-icon">
                                    💳
                                </span>

                                <div>

                                    <strong>
                                        Online Payment
                                    </strong>

                                    <small>
                                        Pay securely using UPI,
                                        card or net banking
                                    </small>

                                </div>

                            </label>

                        </div>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="checkout-error">
                            ⚠ {error}
                        </div>

                    )}


                    {/* PLACE ORDER */}

                    <button
                        className="place-order-button"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>

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

                                    <small>
                                        ₹
                                        {Number(
                                            item.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </small>

                                </div>


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

                        ))}

                    </div>


                    <div className="checkout-summary-divider" />


                    {/* Subtotal */}

                    <div className="checkout-summary-line">

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


                    {/* Delivery */}

                    <div className="checkout-summary-line">

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


                    {/* Total */}

                    <div className="checkout-grand-total">

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


                    {/* Security */}

                    <div className="checkout-security">

                        <span>
                            🔒
                        </span>

                        <div>

                            <strong>
                                Secure Checkout
                            </strong>

                            <small>
                                Your information is
                                protected.
                            </small>

                        </div>

                    </div>

                </aside>

            </section>

        </main>
    );
}

export default Checkout;