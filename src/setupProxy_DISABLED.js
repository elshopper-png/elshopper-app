const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/atlash",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      secure: false,
      ws: true,
    })
  );
};
