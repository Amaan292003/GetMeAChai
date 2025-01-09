import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold text-red-600">Invalid Razorpay Credentials</h1>
    <p className="mt-4 text-lg">The Razorpay key or secret provided is invalid. Please try again.</p>
</div>
  )
}

export default page