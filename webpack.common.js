const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  // Determine the correct .env file based on the ENVIRONMENT
  const dotenvPath = env.ENVIRONMENT === "dev" ? './.env' : `./.env.${env.ENVIRONMENT}`;
  return {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      chunkFilename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name].[contenthash][ext]",
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        inject: true,
        publicPath: "/",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new Dotenv({
        path: dotenvPath, // Use the determined path
        systemvars: true, // Load system environment variables as well
      }),
    ],
  };
};
