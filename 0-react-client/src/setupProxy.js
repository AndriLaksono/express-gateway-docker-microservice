const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // app.use(proxy('/users/auth/google', { target: 'http://localhost:3003/' })); // local setting
    app.use(proxy('/users/auth/google', { target: 'http://api-auth:3003/' })); // docker
};