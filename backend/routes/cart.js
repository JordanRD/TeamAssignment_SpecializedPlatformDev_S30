// ----------------
// Cart endpoints
// ----------------

const { Router } = require("express");
const { authenticate } = require("../middlewares/auth");
const Product = require("../models/Product");
const Order = require("../models/Order");

const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    await req.user.populate("cart.product");
    res.json(req.user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existing = req.user.cart.find(
      (c) => c.product?.toString() === productId,
    );
    if (existing) {
      existing.quantity += quantity ? Number(quantity) : 1;
    } else {
      req.user.cart.push({
        product: productId,
        quantity: quantity ? Number(quantity) : 1,
      });
    }

    await req.user.save();
    await req.user.populate("cart.product");
    res.status(201).json(req.user.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// POST /cart/checkout - create order from cart and empty cart
router.post("/checkout", authenticate, async (req, res) => {
  try {
    if (!req.user.cart || req.user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Populate cart items with product details
    await req.user.populate("cart.product");

    // Build order items and calculate total
    const orderItems = [];
    let totalPrice = 0;

    for (const cartItem of req.user.cart) {
      const product = cartItem.product;
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        price: product.price,
      });

      totalPrice += product.price * cartItem.quantity;
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      status: "pending",
    });

    const savedOrder = await order.save();

    // Clear user's cart
    req.user.cart = [];
    await req.user.save();

    // Return order with populated product data
    const populatedOrder = await Order.findById(savedOrder._id).populate(
      "items.product",
    );

    res.status(201).json({
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/users//:productId - update quantity for a product in cart
router.put("/:productId", authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const idx = req.user.cart.findIndex(
      (c) => c.product?.toString() === productId,
    );
    if (idx === -1)
      return res.status(404).json({ message: "Product not in cart" });

    if (quantity <= 0) {
      // remove
      req.user.cart.splice(idx, 1);
    } else {
      req.user.cart[idx].quantity = Number(quantity);
    }

    await req.user.save();
    await req.user.populate("cart.product");
    res.json(req.user.cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:productId", authenticate, async (req, res) => {
  try {
    const { productId } = req.params;
    const before = req.user.cart.length;
    req.user.cart = req.user.cart.filter(
      (c) => c.product?.toString() !== productId,
    );
    if (req.user.cart.length === before)
      return res.status(404).json({ message: "Product not in cart" });

    await req.user.save();
    await req.user.populate("cart.product");
    res.json(req.user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
