var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_munizd',
  password        : '936Laley!',
  database        : 'cs340_munizd'
});
module.exports.pool = pool;
