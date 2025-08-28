import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

import { patchFs } from '@yarnpkg/pnpify';
patchFs();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

export default {
  entry: "./src/index.tsx",
  mode: "development",

  output: {
    path: path.resolve(__dirName, "dist"),
    filename: "bundle.js",
    clean: true
  },

  devServer: {
    static: "./dist",
    port: 3000,
    open: true,
    hot: true
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: "@svgr/webpack",
          options: {
            icons: true,
          },
        }],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../fonts/'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
  ],
};
