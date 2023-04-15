const Router = require('koa-router')
const router = new Router()

const login = require('./login')
const user = require('./user')

router.use('/system', login.routes(), login.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())

module.exports = router