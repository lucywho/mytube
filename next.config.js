/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "localhost",
            "bootcamp-lucy-22.s3.eu-central-1.amazonaws.com",
            "bootcamp-lucy-22.s3.amazonaws.com",
        ],
    },
}

module.exports = nextConfig
