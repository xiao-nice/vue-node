const Koa = require('koa')
const app = new Koa()
const BodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const bodyParser = new BodyParser()
const routers = require('./router/index')

/**解决跨域 */
app.use(cors());
app.use(bodyParser).use(routers.routes()).use(routers.allowedMethods())

app.listen(5000, () => {
  console.log('服务启动成功')
})