import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {

    const navigate = useNavigate();
    const location = useLocation();

    const order = location.state?.order;


    // =====================================================
    // IF ORDER DATA IS NOT AVAILABLE
    // =====================================================

    if (!order) {

        return (

            <div className="order-success-page">

                <div className="order-success-card">

                    <div className="order-success-icon">
                        ✓
                    </div>

                    <h1>
                        Order Not Found
                    </h1>

                    <p>
                        We couldn't find the order
                        information.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // GENERATE ORDER ID
    // =====================================================

    const orderId =
        `SHOP-${Date.now().toString().slice(-6)}`;


    return (

        <div className="order-success-page">

            <div className="order-success-card">


                {/* =================================================
                    SUCCESS ICON
                ================================================= */}

                <div className="order-success-icon">

                    ✓

                </div>


                {/* =================================================
                    SUCCESS MESSAGE
                ================================================= */}

                <span className="order-success-label">
                    ORDER CONFIRMED
                </span>

                <h1>
                    Order Placed Successfully!
                </h1>

                <p className="order-success-message">

                    Thank you for shopping with
                    <strong> Shopora</strong>.

                    Your order has been received
                    and will be processed shortly.

                </p>


                {/* =================================================
                    ORDER ID
                ================================================= */}

                <div className="order-id-box">

                    <span>
                        Order ID
                    </span>

                    <strong>
                        #{orderId}
                    </strong>

                </div>


                {/* =================================================
                    ORDER DETAILS
                ================================================= */}

                <div className="order-success-details">


                    <div>

                        <span>
                            Items
                        </span>

                        <strong>
                            {order.items.length}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Payment
                        </span>

                        <strong>
                            {order.paymentMethod === "COD"
                                ? "Cash on Delivery"
                                : "Online Payment"}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {order.total.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>


                    <div>

                        <span>
                            Status
                        </span>

                        <strong className="order-status">
                            {order.status === "pending"
                                ? "Order Confirmed"
                                : order.status}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    DELIVERY MESSAGE
                ================================================= */}

                <div className="order-delivery-message">

                    <span>
                        🚚
                    </span>

                    <div>

                        <strong>
                            Your order is on its way!
                        </strong>

                        <p>
                            We'll deliver your order
                            to the address provided
                            during checkout.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="order-success-buttons">

                    <button
                        className="order-primary-btn"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Continue Shopping
                        <span>
                            →
                        </span>
                    </button>


                    <button
                        className="order-secondary-btn"
                        onClick={() =>
                            navigate("/orders")
                        }
                    >
                        View My Orders
                    </button>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;