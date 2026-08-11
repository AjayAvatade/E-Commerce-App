const mongoose = require("mongoose");


// =========================================================
// ORDER ITEM SCHEMA
// =========================================================

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);


// =========================================================
// SHIPPING ADDRESS SCHEMA
// =========================================================

const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        pincode: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);


// =========================================================
// ORDER SCHEMA
// =========================================================

const orderSchema = new mongoose.Schema(
    {
        // -------------------------------------------------
        // USER
        // -------------------------------------------------

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },


        // -------------------------------------------------
        // ORDER ID
        // -------------------------------------------------

        orderId: {
            type: String,
            required: true,
            unique: true
        },


        // -------------------------------------------------
        // ORDER ITEMS
        // -------------------------------------------------

        items: {
            type: [orderItemSchema],

            required: true,

            validate: {
                validator: function (items) {
                    return items.length > 0;
                },

                message:
                    "Order must contain at least one product."
            }
        },


        // -------------------------------------------------
        // SHIPPING ADDRESS
        // -------------------------------------------------

        shippingAddress: {
            type: shippingAddressSchema,
            required: true
        },


        // -------------------------------------------------
        // PAYMENT METHOD
        // -------------------------------------------------

        paymentMethod: {
            type: String,

            enum: [
                "COD",
                "ONLINE"
            ],

            required: true
        },


        // -------------------------------------------------
        // PAYMENT STATUS
        // -------------------------------------------------

        paymentStatus: {
            type: String,

            enum: [
                "PENDING",
                "PAID",
                "FAILED"
            ],

            default: "PENDING"
        },


        // -------------------------------------------------
        // ORDER STATUS
        // -------------------------------------------------

        orderStatus: {
            type: String,

            enum: [
                "PLACED",
                "CONFIRMED",
                "PROCESSING",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED"
            ],

            default: "PLACED"
        },


        // -------------------------------------------------
        // PRICE DETAILS
        // -------------------------------------------------

        subtotal: {
            type: Number,

            required: true,

            min: 0
        },

        deliveryCharge: {
            type: Number,

            required: true,

            min: 0
        },

        totalAmount: {
            type: Number,

            required: true,

            min: 0
        }
    },

    {
        timestamps: true
    }
);


// =========================================================
// EXPORT MODEL
// =========================================================

const Order = mongoose.model(
    "Order",
    orderSchema
);

module.exports = Order;