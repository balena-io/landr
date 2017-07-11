const path = require('path');
const genBabelConfig = require('gatsby/dist/utils/babel-config');

const modifyWebpackConfig = (gatsby, pluginOpts) => {
  let webpackConfig = gatsby.config;
  const stage = gatsby.stage;
  const babelConfig = await genBabelConfig({ directory: pluginOpts.userDir }, stage);

  // landr specific resolves
  webpackConfig.merge({
    module: {
      noParse: [
        /node_modules\/reactstrap-tether\/dist\/js\/tether.js/
      ]
    },
    resolve: {
      modulesDirectories: [
        path.resolve(`${pluginOpts.userDir}`),
        path.resolve(`${__dirname}/../`),
        path.resolve(`${pluginOpts.userDir}/node_modules`),
        path.resolve(`${__dirname}/../node_modules`)
      ]
    }
  });

  // remove default gatsby js loader
  webpackConfig.removeLoader('js')

  // landr specific js loader
  webpackConfig.loader(`js`, {
    test: /\.jsx?$/, // Accept either .js or .jsx files.
    // exclude: /(node_modules|bower_components)/,
    include: [
      path.resolve(__dirname, "../www"),
      /node_modules\/landr\/src/,
      /node_modules\/landr\/.cache/,
      path.resolve(pluginOpts.userDir, "www"),
      path.resolve(pluginOpts.userDir, ".cache"),
    ],
    loader: `babel`,
    query: babelConfig,
  })

  return webpackConfig;
};

module.exports = modifyWebpackConfig;
