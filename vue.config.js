const { VUE_APP_DEV_API } = process.env;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const webpackConfig = {};

if (process.env.NODE_ENV === "development") {
  webpackConfig.devServer = {
    port: 8081, // 端口号
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
  webpackConfig["configureWebpack"] = config => {
    config["plugins"].push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
        reportFilename: `../reports/r-${new Date().getTime()}.html`
      })
    );
  };
}

module.exports = webpackConfig;
