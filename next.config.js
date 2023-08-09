/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@supabase/gotrue-js', '@supabase/supabase-js']);

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: ["media.wired.com", "eovkgbookacdkkrilawn.supabase.co"],
  },
});

module.exports = nextConfig;
