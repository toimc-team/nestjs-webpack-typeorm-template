/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const lazyImports = [
  // '@nestjs/microservices',
  // 'cache-manager',
  'class-validator',
  'class-transformer',
];
const tsConfigFile = 'tsconfig.build.json';

module.exports = function (options, webpack) {
  if (process.env.NODE_ENV === 'production') {
    options.devtool = 'source-map';
    options.entry = {
      main: `./src/main.ts`,
    };
    options.optimization.minimize = true;
    options.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ];
  } else if (process.env.NODE_ENV === 'development') {
    options.entry = ['webpack/hot/poll?100', options.entry];
    options.plugins = [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
      }),
    ];
  }

  return {
    ...options,
    output: {
      filename: `[name].js`,
      path: path.join(__dirname, 'dist'),
    },
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    module: {
      rules: [
        {
          test: /.ts?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: tsConfigFile,
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: tsConfigFile,
        }),
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.ProgressPlugin(),
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
