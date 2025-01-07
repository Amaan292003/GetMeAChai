import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';
 

export const authoptions =  NextAuth({
    providers: [
      // OAuth authentication providers...
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
      GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      TwitterProvider({
        clientId:process.env.TWITTER_CLIENT_ID,
        clientSecret:process.env.TWITTER_CLIENT_SECRET,
        version: "2.0",
      }),
    
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }){
         if(account.provider == "github" || account.provider == "google" || account.provider == "twitter"){ 
          await connectDb()
          // Check if the user already exists in the database
          const currentUser =  await User.findOne({email: email}) 
          if(!currentUser){
            // Create a new user
             const newUser = await User.create({
              email: user.email, 
              username: user.email.split("@")[0], 
            })   
          } 
          return true
         }
      },
      
      async session({ session, user, token }) {
        const dbUser = await User.findOne({email: session.user.email})
        session.user.name = dbUser.username
        return session
      },
    } 
  })

  export { authoptions as GET, authoptions as POST}