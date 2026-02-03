const { Router } = require("express");
const { authenticate } = require("../middlewares/auth");
const Order = require("../models/Order");

const router = Router();

// GET /api/orders - Get all orders for the current user
router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      message: "Orders retrieved successfully",
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/:orderId - Get a specific order by ID
router.get("/:orderId", authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "items.product",
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the current user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/orders/:orderId - Update order status
router.put("/:orderId", authenticate, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "processing", "shipped", "delivered"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order belongs to the current user (optional: could be admin-only)
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    const populatedOrder = await Order.findById(updatedOrder._id).populate(
      "items.product",
    );

    res.json({
      message: "Order status updated successfully",
      data: populatedOrder,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/orders/admin/all - Get all orders (admin only - optional)
router.get("/admin/all", authenticate, async (req, res) => {
  try {
    // Optional: Add admin role check here
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({
      message: "All orders retrieved successfully",
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
