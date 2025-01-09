"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server";
export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();

    // Fetch user and their Razorpay credentials
    const user = await User.findOne({ username: to_username });
    if (!user) {
        console.error("User not found:", to_username);
        throw new Error("User not found.");
    }

    const { razorpayid, razorpaysecret } = user;

    // Validate Razorpay credentials
    if (!razorpayid || !razorpaysecret) {
        console.error("Missing Razorpay credentials for user:", to_username);
        throw new Error("Razorpay ID or Secret is missing.");
    }

    const instance = new Razorpay({
        key_id: razorpayid,
        key_secret: razorpaysecret,
    });

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    };

    // Attempt to create an order
    try {
        console.log("Creating Razorpay order...");
        const order = await instance.orders.create(options);

        // if (!order || !order.id) {
        //     console.error("Invalid Razorpay order response:", order);
        //     throw new Error("Failed to create Razorpay order.");
        // }

        // Create the payment record only if the order is valid
        // console.log("Order created successfully:", order);
        await Payment.create({
            oid: order.id,
            amount: amount / 100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message,
        });

        return order;
    } catch (error) {
        console.error("Error creating Razorpay order:");
        // throw new Error("Failed to create Razorpay order. Please check the credentials or try again later.");
        // NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard`);
    }
};




export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    // find all payments sorted by decreasing order of amount and flatten object ids
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        // let u = await User.findOne({ username: ndata.username })
        // if (u) {
        //     return { error: "Username already exists" }
        // }   
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    } else {
        await User.updateOne({email: ndata.email}, ndata)
    }
}
