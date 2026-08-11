import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {

    const navigate = useNavigate();

    // Get the recently placed order
    const savedOrder =
        localStorage.getItem("shoporaLastOrder");

    const order = savedOrder
        ? JSON.parse(savedOrder)
        : null;


    // Generate a temporary order ID
    const orderId =
        order?.orderId ||
        `SHOP-${Date.now().toString().slice(-8)}`;


    return (

        <main className="order-success-page">

            <section className="success-card">

                {/* Success Icon */}

                <div className="success-icon">
                    ✓
                </div>


                {/* Heading */}

                <span className="success-eyebrow">
                    SHOPORA
                </span>

                <h1>
                    Order Placed Successfully!
                </h1>

                <p className="success-message">
                    Thank you for shopping with Shopora.
                    Your order has been received successfully.
                </p>


                {/* Order Details */}

                <div className="order-details">

                    <div className="order-detail">

                        <span>
                            Order ID
                        </span>

                        <strong>
                            {orderId}
                        </strong>

                    </div>


                    <div className="order-detail">

                        <span>
                            Payment Method
                        </span>

                        <strong>
                            {order?.paymentMethod === "ONLINE"
                                ? "Online Payment"
                                : "Cash on Delivery"}
                        </strong>

                    </div>


                    <div className="order-detail">

                        <span>
                            Total Amount
                        </span>

                        <strong className="success-price">
                            ₹
                            {Number(
                                order?.total || 0
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>

                </div>


                {/* Delivery Message */}

                <div className="delivery-info">

                    <span>
                        🚚
                    </span>

                    <div>

                        <strong>
                            Your order is being processed
                        </strong>

                        <p>
                            We'll notify you when your
                            order is shipped.
                        </p>

                    </div>

                </div>


                {/* Buttons */}

                <div className="success-actions">

                    <button
                        className="continue-shopping-btn"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Continue Shopping
                    </button>


                    <button
                        className="view-orders-btn"
                        onClick={() =>
                            navigate("/orders")
                        }
                    >
                        View My Orders
                    </button>

                </div>

            </section>

        </main>
    );
}

export default OrderSuccess;