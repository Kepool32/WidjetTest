const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({ target: 'https://slmaxzoom.outer.cnvl.io', changeOrigin: true }));
};
