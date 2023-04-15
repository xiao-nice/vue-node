/**
 * 基础请求成功值
 * @param {*} ctx 
 * @param {*} data 
 * @param {*} msg 
 * @param {*} code 
 */
const success = (ctx, data = null, msg = '操作成功', code = 0) => {
  ctx.body = {
    code,
    data,
    msg
  }
}

/**
 * 基础错误信息格式
 * @param {*} ctx 
 * @param {*} msg 
 * @param {*} data 
 * @param {*} code 
 */
 const error = (ctx, data = null, msg= '操作失败', code = -1) => {
  ctx.body = {
      code,
      data,
      msg
  }
}

module.exports = {
  success,
  error
}