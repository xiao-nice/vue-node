const KoaRouter = require('koa-router')
const router = new KoaRouter()
const res = require('../serve/response')
const query = require('../serve/bd')

router.post('/login', async ctx => {
  const { username, password, code } = ctx.request.body
  try {    
    const userSql = 'SELECT * FROM role WHERE name=?'
    const userVal = [username]
    const userData = await query(userSql, userVal)
    console.log(userData, 'userData');
    if (userData && userData.length > 0) {
      if (password !== userData[0].password) return res.error(ctx, null, '密码错误')
      const sql = 'UPDATE role SET token = ? WHERE name = ?'
      const value  = ['token-test', userData[0].name]
      await query(sql, value)
      res.success(ctx, {
        token: 'token-test',
        name: userData[0].name
      })
    } else {
      res.error(ctx, null, '该账号暂无注册')
    }
  } catch(err) {
    console.log(err);
    res.error(ctx)
  }
})

module.exports = router