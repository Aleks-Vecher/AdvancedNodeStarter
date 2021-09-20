const { clearHash } = require('../services/cache')

module.exports = async (req, res, next) => {
  await next()  // the trick is here, this middleware performed after the main handler (next) implemented succesfully

  clearHash(req.user.id)
}