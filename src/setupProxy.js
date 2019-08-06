const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/.netlify/functions/', {
      target: 'http://localhost:9000/.netlify/functions/',
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
    }),
  );
};
