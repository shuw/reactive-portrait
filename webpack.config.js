const path = require("path");

module.exports = {
  entry: "./src/bindReactivePortrait.js",
  output: {
    libraryTarget: "window",
    library: "bindReactivePortrait",
    libraryExport: "default",
    path: path.resolve(__dirname, "build"),
    filename: "bindReactivePortrait.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/env"], ["@babel/react"]],
              plugins: ["@babel/proposal-class-properties"],
            },
          },
        ],
      },
    ],
  },
};
