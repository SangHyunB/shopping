const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:3003/",
            changeOrigin: true,
        })
    );
}


/*import { createProxyMiddleware } from 'http-proxy-middleware';

export default function proxy_middleware(app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:3003/",
            changeOrigin: true,
        })
    );
}
*/