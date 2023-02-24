"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  reactStrictMode: true
};
module.exports = {
  serverRuntimeConfig: {
    basePath: './server/server.js'
  }
};