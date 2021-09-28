const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/incubator/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            pathRewrite: {
                '/incubator/api/(.*)': '/api/$1'
            }
        })
    );
};
