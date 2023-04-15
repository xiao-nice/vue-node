const KoaRouter = require('koa-router')
const router = new KoaRouter()
const res = require('../serve/response')
const query = require('../serve/bd')

router.get('/info', async ctx => {
  const { token } = ctx.headers
  try {
    const userSql = 'SELECT * FROM role WHERE token=?'
    const userVal = [token]
    const userData = await query(userSql, userVal)
    const data = JSON.parse(JSON.stringify(userData[0]))
    delete data.password
    delete data.token
    res.success(ctx, data)
  } catch(err) {
    res.error(ctx)
  }
})

router.get('/list', async ctx => {
  const { page, size } = ctx.request.query
  try {
    const userSql = 'SELECT * FROM role LIMIT ?,?'
    const userVal = [Number(page) - 1, Number(size)]
    const userData = await query(userSql, userVal)
    res.success(ctx, userData)
  } catch(err) {
    res.error(ctx)
  }
})

router.post('/add', async ctx => {
  const { name, mobile, password, nickname, role } = ctx.request.body
  try {
    const sql = 'SELECT * FROM role WHERE name=?'
    const val = [name]
    const data = await query(sql, val)
    if (data && data.length>0) {
      return res.error(ctx,null, '用户名已存在')
    }
  } catch(err) {
    res.error(ctx)
  }
  try {
    const userSql = 'INSERT INTO role (name, mobile, password, nickname, role) VALUES (?,?,?,?,?);'
    const userVal = [name, mobile, password, nickname, role]
    await query(userSql, userVal)
    res.success(ctx)
  } catch(err) {
    res.error(ctx)
  }
})
router.put('/update', async ctx => {
  const { id, name, mobile, password, nickname, role } = ctx.request.body
  try {
    const sql = 'SELECT * FROM role WHERE id=?'
    const val = [id]
    const data = await query(sql, val)
    if (data && data.length < 1) {
      return res.error(ctx,null, '用户不存在')
    }
    const uSql = 'SELECT * FROM role WHERE name=?'
    const uVal = [name]
    const uData = await query(uSql, uVal)
    const isOnly = uData.some(item => item.id != id)
    if (uData && uData.length > 0 && isOnly) {
      return res.error(ctx,null, '用户名已存在')
    }
  } catch(err) {
    res.error(ctx)
  }
  try {
    const userSql = 'UPDATE role SET name = ?, mobile = ?, password = ?, nickname = ?, role = ?  WHERE id = ?'
    const userVal = [name, mobile, password, nickname, role, id]
    await query(userSql, userVal)
    res.success(ctx)
  } catch(err) {
    res.error(ctx)
  }
})
router.delete('/del/:id', async ctx => {
  const { id } = ctx.request.params
  const val = [id]
  try {
    const sql = 'SELECT * FROM role WHERE id=?'
    const data = await query(sql, val)
    if (data && data.length < 1) {
      return res.error(ctx,null, '用户不存在')
    }
  } catch(err) {
    res.error(ctx)
  } 
  try {
    const sql = 'DELETE FROM role WHERE id = ?'
    await query(sql, val)
    res.success(ctx)
  } catch (err) {
    res.error(ctx)
  }
})

module.exports = router