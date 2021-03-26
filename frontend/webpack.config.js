const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const OptimizeCssAssetWebPackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('isDev', isDev);
const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimizer = [new OptimizeCssAssetWebPackPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const getBabelOptions = prop => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }], '@babel/plugin-proposal-class-properties'],
  };
  if (prop) {
    options.presets.push(prop);
  }
  return options;
};

const jsLoaders = p => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: getBabelOptions(p),
    },
    {
      loader: 'eslint-loader',
      options: {
        emitWarning: true,
      },
    },
  ];
  return loaders;
};

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.js'],
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    modules: [path.resolve(__dirname), 'node_modules/'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@icons': path.resolve(__dirname, 'public', 'static', 'icons'),
      '@images': path.resolve(__dirname, 'public', 'static', 'images'),
    },
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    pathinfo: false,
  },
  optimization: optimization(),
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: false,
    overlay: false,
    hot: true,
    port: 3000,
    stats: {
      modules: false,
    },
    noInfo: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'БизнесАтом',
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/static/images/favicon.png',
      hash: true,
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin({
      root: path.join(__dirname, './build'),
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.DefinePlugin({
      APPMODE: JSON.stringify(process.env.NODE_ENV),
      'process.env.NODE_ENV': '"production"',
    }),
    new Dotenv(),
    new LodashModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: false, importLoaders: 1 } },
          { loader: 'postcss-loader', options: { sourceMap: false } },
          { loader: 'sass-loader', options: { sourceMap: false } },
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]',
          context: 'src', // prevent display of src/ in filename
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-react'),
      },
    ],
  },
};
