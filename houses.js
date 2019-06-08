module.exports = function () {
  var express = require('express');
  var router = express.Router();


  function getHouses(res, mysql, context, complete) {
    mysql.pool.query("SELECT houses.id as id, name FROM houses", function (error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.houses = results;
      complete();
    });
  }

  router.get('/', function (req, res) {
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    getHouses(res, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 2) {
        res.render('houses', context);
      }
    }
  });
  return router;
}();