const Order = require("../models/Order");
const Product = require("../models/Product");


// =========================================================
// CREATE ORDER
// POST /api/orders
// =========================================================

const createOrder = async (req, res) => {

    try {

        const {
            items,
            shippingAddress,
            paymentMethod
        } = req.body;


        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!items || items.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Your cart is empty."
            });
        }


        if (!shippingAddress) {

            return res.status(400).json({
                success: false,
                message: "Shipping address is required."
            });
        }


        if (!paymentMethod) {

            return res.status(400).json({
                success: false,
                message: "Payment method is required."
            });
        }


        // -------------------------------------------------
        // CHECK PRODUCTS AND CALCULATE SUBTOTAL
        // -------------------------------------------------

        let subtotal = 0;

        const orderItems = [];


        for (const item of items) {

            const product = await Product.findById(
                item.product || item._id
            );


            if (!product) {

                return res.status(404).json({
                    success: false,
                    message:
                        `Product not found: ${
                            item.name || "Unknown product"
                        }`
                });
            }


            // Use database price instead of trusting
            // price sent from frontend.

            const price = Number(product.price);

            const quantity = Number(item.quantity);


            if (!quantity || quantity < 1) {

                return res.status(400).json({
                    success: false,
                    message:
                        `Invalid quantity for ${product.name}.`
                });
            }


            const itemTotal =
                price * quantity;


            subtotal += itemTotal;


            orderItems.push({

                product: product._id,

                name: product.name,

                image: product.image,

                price: price,

                quantity: quantity

            });
        }


        // -------------------------------------------------
        // DELIVERY CHARGE
        // -------------------------------------------------

        const deliveryCharge =
            subtotal >= 999
                ? 0
                : 49;


        // -------------------------------------------------
        // TOTAL
        // -------------------------------------------------

        const totalAmount =
            subtotal + deliveryCharge;


        // -------------------------------------------------
        // GENERATE ORDER ID
        // -------------------------------------------------

        const orderId =
            `SHOP-${Date.now().toString().slice(-8)}`;


        // -------------------------------------------------
        // PAYMENT STATUS
        // -------------------------------------------------

        const paymentStatus =
            paymentMethod === "COD"
                ? "PENDING"
                : "PENDING";


        // -------------------------------------------------
        // CREATE ORDER
        // -------------------------------------------------

        const order = await Order.create({

            user: req.user
                ? req.user._id
                : undefined,

            orderId,

            items: orderItems,

            shippingAddress,

            paymentMethod,

            paymentStatus,

            orderStatus: "PLACED",

            subtotal,

            deliveryCharge,

            totalAmount

        });


        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Order placed successfully.",

            order

        });

    } catch (error) {

        console.error(
            "Create Order Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to create order.",

            error:
                error.message

        });
    }
};



// =========================================================
// GET USER ORDERS
// GET /api/orders
// =========================================================

const getUserOrders = async (req, res) => {

    try {

        const userId =
            req.user?._id;


        if (!userId) {

            return res.status(401).json({

                success: false,

                message:
                    "User authentication required."

            });
        }


        const orders =
            await Order.find({
                user: userId
            })
            .sort({
                createdAt: -1
            });


        return res.status(200).json({

            success: true,

            count: orders.length,

            orders

        });

    } catch (error) {

        console.error(
            "Get Orders Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch orders.",

            error:
                error.message

        });
    }
};



// =========================================================
// GET SINGLE ORDER
// GET /api/orders/:id
// =========================================================

const getSingleOrder = async (req, res) => {

    try {

        const order =
            await Order.findById(
                req.params.id
            );


        if (!order) {

            return res.status(404).json({

                success: false,

                message:
                    "Order not found."

            });
        }


        // -----------------------------------------------
        // SECURITY CHECK
        // -----------------------------------------------

        if (
            req.user &&
            order.user &&
            order.user.toString() !==
                req.user._id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to view this order."

            });
        }


        return res.status(200).json({

            success: true,

            order

        });

    } catch (error) {

        console.error(
            "Get Single Order Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to fetch order.",

            error:
                error.message

        });
    }
};



// =========================================================
// CANCEL ORDER
// PUT /api/orders/:id/cancel
// =========================================================

const cancelOrder = async (req, res) => {

    try {

        const order =
            await Order.findById(
                req.params.id
            );


        if (!order) {

            return res.status(404).json({

                success: false,

                message:
                    "Order not found."

            });
        }


        // -----------------------------------------------
        // SECURITY CHECK
        // -----------------------------------------------

        if (
            req.user &&
            order.user &&
            order.user.toString() !==
                req.user._id.toString()
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You are not allowed to cancel this order."

            });
        }


        // -----------------------------------------------
        // CHECK ORDER STATUS
        // -----------------------------------------------

        if (
            [
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
            ].includes(order.orderStatus)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    `Order cannot be cancelled because it is already ${order.orderStatus.toLowerCase()}.`

            });
        }


        // -----------------------------------------------
        // UPDATE STATUS
        // -----------------------------------------------

        order.orderStatus =
            "CANCELLED";


        await order.save();


        return res.status(200).json({

            success: true,

            message:
                "Order cancelled successfully.",

            order

        });

    } catch (error) {

        console.error(
            "Cancel Order Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Failed to cancel order.",

            error:
                error.message

        });
    }
};



// =========================================================
// EXPORT CONTROLLERS
// =========================================================

module.exports = {

    createOrder,

    getUserOrders,

    getSingleOrder,

    cancelOrder

};