"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import { NextResponse } from "next/server"; // Import NextResponse for redirection

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb();
    // Fetch the secret of the user who is getting the payment
    let user = await User.findOne({ username: to_username });
    const secret = user.razorpaysecret;

    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret });

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    };

    try {
        console.log("Creating Razorpay order...");
    
        // Attempt to create the Razorpay order
        let order = await instance.orders.create(options);
    
        
        // if (!order || !order.id) {
        //     console.error("Invalid Razorpay order response:", order);
        //     throw new Error("Failed to create Razorpay order.");
        // }
    
        console.log("Order created successfully:", order);
    
        // Save payment details in the database
        await Payment.create({
            oid: order.id,
            amount: amount / 100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message,
        });
    
        return order; // Return the created order
    } catch (error) {
        // Log the full error object for debugging
    
        // Handle invalid credentials specifically
        if (error.statusCode === 401 || error.message.includes("Authentication failed")) {
            throw new Error("Invalid Razorpay ID or secret. Please verify your credentials.");
        }
    
        // Handle other errors generically
        // throw new Error("Failed to create Razorpay order. Please check the credentials or try again later.");
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
    let p = await Payment.find({ to_user: username, done:true }).sort({ amount: -1 }).lean()
    return p
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let ndata = Object.fromEntries(data)

    // If the username is being updated, check if username is available
    if (oldusername !== ndata.username) {
        
        await User.updateOne({email: ndata.email}, ndata)
        // Now update all the usernames in the Payments table 
        await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
        
    }
    else{
      
        await User.updateOne({email: ndata.email}, ndata)
    }

}








