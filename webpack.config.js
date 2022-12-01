const path = require('path');
const autoprefixer = require('autoprefixer');
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "uniteus",
    projectName: "util-stuff",
    webpackConfigEnv,
    argv,
  });

  console.log('dirname is', __dirname);
  console.log('include this path..', path.join(__dirname, '/src'))
  const sassLoaderRule = {
    test: /\.scss$/,
    include: path.join(__dirname, './src'),
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader'},
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    ],
  };

  const extraConfig = {};

  // const config = merge(defaultConfig, extraConfig);
  console.log('sassLoaderRule', sassLoaderRule)
  defaultConfig.module.rules.push(sassLoaderRule);
  console.log('config', defaultConfig.module.rules)
  return defaultConfig;
};
