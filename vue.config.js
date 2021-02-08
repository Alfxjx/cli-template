const { VUE_APP_DEV_API } = process.env;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const webpackConfig = {
  // 生产环境关闭sourceMap
  productionSourceMap: false
};

const customOptions = {
  mozjpeg: {
    progressive: true,
    quality: 50
  },
  optipng: {
    enabled: true
  },
  pngquant: {
    quality: [0.5, 0.65],
    speed: 4
  },
  gifsicle: {
    interlaced: false
  },
  // 不支持WEBP就不要写这一项
  webp: {
    quality: 75
  }
};

if (process.env.NODE_ENV === "development") {
  webpackConfig.devServer = {
    // port: 8081, // 端口号
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器,
    proxy: {
      "/api": {
        target: VUE_APP_DEV_API,
        changeOrigin: true,
        ws: true,
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader("referer", VUE_APP_DEV_API);
        },
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  };
}

if (process.env.NODE_ENV === "production") {
  webpackConfig["chainWebpack"] = config => {
    config.module
      .rule("images")
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options(customOptions)
      .end();
  };
  webpackConfig["configureWebpack"] = config => {
    config["plugins"].push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: `../reports/r-${new Date().getTime()}.html`
      })
    );
    config["plugins"].push(
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: true
      })
    );
  };
}

module.exports = webpackConfig;
