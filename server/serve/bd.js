const sql = require('mysql')

const pool = sql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'zdy'
})

const query = (sql, value) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, value, (err, results) => {
      if (err) {
        console.log(err, 'err');
        reject(err)
      } else {
        console.log(results, 'results');
        resolve(results)
      }
    })
  })
}

module.exports = query