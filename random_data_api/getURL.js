const url = require('url')
function getURL(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl,
  });
}
module.exports = getURL;
