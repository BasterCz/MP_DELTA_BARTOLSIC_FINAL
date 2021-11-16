const withNextCircularDeps = require('next-circular-dependency');
const withCSS = require('@zeit/next-css');
const optimizedImages = require('next-optimized-images');

const circularDep = withNextCircularDeps(optimizedImages(withCSS({
  exclude: /node_modules/,
  failOnError: false,
})))

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    

    return config
  },
  circularDep,
};
