import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import User from "../models/User.js";
import Payment from "../models/Payment.js";

// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 49 * 100, // ₹49 in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= VERIFY PAYMENT =================
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ IMPORTANT FIX: req.user.id (NOT _id)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Update user
    user.paymentStatus = "paid";
    user.razorpayPaymentId = razorpay_payment_id;
    await user.save();

    // ✅ Save payment record
    await Payment.create({
      userId: user._id,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount: 49,
      status: "success",
    });

    // ✅ Return updated user
    res.json({
      success: true,
      message: "Payment verified successfully",
      user,
    });

  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
