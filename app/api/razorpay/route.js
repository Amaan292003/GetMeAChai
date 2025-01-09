import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const POST = async (req) => {
    try {
        // Connect to the database
        await connectDb();

        // Parse the form data from the request
        let body = await req.formData();
        body = Object.fromEntries(body);

        // Check if razorpayOrderId is present on the server
        let p = await Payment.findOne({oid: body.razorpay_order_id});
        if (!p) {
            return NextResponse.json({success: false, message: "Order Id not found"});
        }

        // Fetch the secret of the user who is getting the payment
        let user = await User.findOne({username: p.to_user});
        if (!user || !user.razorpaysecret) {
            return NextResponse.json({success: false, message: "Invalid Razorpay credentials"});
        }

        const secret = user.razorpaysecret;

        // Verify the payment using Razorpay's utils
        let xx = validatePaymentVerification(
            {"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id}, 
            body.razorpay_signature, 
            secret
        );

        // If payment verification is successful, update the payment status
        if (xx) {
            const updatedPayment = await Payment.findOneAndUpdate(
                {oid: body.razorpay_order_id},
                {done: "true"},
                {new: true}
            );
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`);
        } else {
            return NextResponse.json({success: false, message: "Payment Verification Failed"});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({success: false, message: "An error occurred during payment verification. Please check your Razorpay credentials."});
    }
}
