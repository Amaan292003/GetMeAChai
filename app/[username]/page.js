import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import connectDb from '@/db/connectDb'
import User from '@/models/User'

const Username = async ({ params }) => {
  // Fetch the user from the database
  const fetchUser = async () => {
    await connectDb()
    let u = await User.findOne({ username: params.username })
    return u
  }

  const user = await fetchUser()

  // If the user is not found, display a custom message
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] text-center">
        <h1 className="text-3xl font-bold text-red-500">User Not Found</h1>
        <p className="text-lg text-red-700 mt-4">The username &quot;{params.username}&quot; does not exist in our database.</p>

      </div>
    )
  }

  return (
    <>
    <PaymentPage username={params.username}/>
    </>
   )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}