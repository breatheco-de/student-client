const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/js/index.js', 
  ],
  module: {
    rules: [
        { test: /\.(jsx|js)?$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.md$/, use: [
              {
                  loader: "html-loader"
              },
              {
                  loader: "markdown-loader",
                  options: {
                      /* your options here */
                  }
              }
          ]
        },
        {
          test: /\.(scss|css)$/, use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        }, //css only files
        { 
          test: /\.(png|svg|jpg|gif)$/, use: {
            loader: 'file-loader',
            options: { name: '[name].[ext]' } 
          }
        }, //for images
        { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, use: ['file-loader'] } //for fonts
    ]
  },
  optimization: {
      splitChunks: {
          cacheGroups: {
              vendor: {
                  test: /node_modules/, // you may add "vendor.js" here if you want to
                  name: "vendor",
                  chunks: "initial",
                  enforce: true
              }
          }
      }
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Student at BreatheCode Platform',
        favicon: 'favicon.png',
        template: 'template.html'
    })
  ]
};