// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: {
    overview: "./src/overview.tsx",
    main: "./src/client.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    },
    static: {
      directory: path.join(__dirname, 'static'),
      publicPath: '/static'
    },
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/client.html' },
        { from: /^\/overview/, to: '/overview.html' },
      ],
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client.html",
      filename: "client.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      template: "./overview.html",
      filename: "overview.html",
      chunks: ["overview"],
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: [
        '/node_modules/',
      ],
      context: path.resolve(__dirname, 'src'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    alias: {
      '@root': path.resolve(__dirname, 'src'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
