const homeHandler = require('./home')
const staticFiles = require('./staticfiles')
const cat = require('./cats.js')

module.exports = [homeHandler, staticFiles,cat]