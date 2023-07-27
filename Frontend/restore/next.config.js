/** @type {import('next').NextConfig} */
const nextConfig = {
  env:{
    GOOGLE_CLIENT_ID:"632939467428-km8glfmnqemr9sl63902dd84lfb98fne.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET:"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",
    NEXTAUTH_URL:"http://localhost:3000",
    NEXTAUTH_URL_INTERNAL:"http://localhost:3000",
    NEXTAUTH_SECRET:"dPmTCswUFo6w6Xr0XufjUCq0jU8QuZhBZRktZTVruj8=",
    GITHUB_ID:"57b09d40c3ea5aaedfc1",
    GITHUB_SECRET:"dbc1c06436c306c3aba2f9703344c8432d8865c3"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imagekit.androidphoria.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "s3.studytonight.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "http2.mlstatic.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;


