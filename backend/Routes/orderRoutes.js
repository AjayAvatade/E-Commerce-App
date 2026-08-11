const express = require("express");

const router = express.Router();


// Controllers
const {
    createOrder,
    getUserOrders,
    getSingleOrder,
    cancelOrder
} = require("../controllers/orderController");


// Authentication Middleware
const authMiddleware =
    require("../middleware/authMiddleware");


// =========================================================
// CREATE ORDER
// POST /api/orders
// =========================================================

router.post(
    "/",
    authMiddleware,
    createOrder
);


// =========================================================
// GET ALL ORDERS OF LOGGED-IN USER
// GET /api/orders
// =========================================================

router.get(
    "/",
    authMiddleware,
    getUserOrders
);


// =========================================================
// GET SINGLE ORDER
// GET /api/orders/:id
// =========================================================

router.get(
    "/:id",
    authMiddleware,
    getSingleOrder
);


// =========================================================
// CANCEL ORDER
// PUT /api/orders/:id/cancel
// =========================================================

router.put(
    "/:id/cancel",
    authMiddleware,
    cancelOrder
);


module.exports = router;