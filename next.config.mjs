/** @type {import('next').NextConfig} */
const nextConfig = {};

import { configDotenv } from 'dotenv';
console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_ID);
console.log("GITHUB_CLIENT_SECRET:", process.env.GITHUB_SECRET);

export default nextConfig;
