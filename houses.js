module.exports = function () {
  var express = require('express');
  var router = express.Router();

  function getHouses(res, mysql, context, complete) {
    mysql.pool.query("SELECT  id, name FROM houses", function (error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.houses = results;
      complete();
    });
  }

  // function getPeoplebyHomeworld(req, res, mysql, context, complete){
  //   var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.homeworld = ?";
  //   console.log(req.params)
  //   var inserts = [req.params.homeworld]
  //   mysql.pool.query(query, inserts, function(error, results, fields){
  //         if(error){
  //             res.write(JSON.stringify(error));
  //             res.end();
  //         }
  //         context.people = results;
  //         complete();
  //     });
  // }

  // /* Find people whose fname starts with a given string in the req */
  // function getPeopleWithNameLike(req, res, mysql, context, complete) {
  //   //sanitize the input as well as include the % character
  //    var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.fname LIKE " + mysql.pool.escape(req.params.s + '%');
  //   console.log(query)

  //   mysql.pool.query(query, function(error, results, fields){
  //         if(error){
  //             res.write(JSON.stringify(error));
  //             res.end();
  //         }
  //         context.people = results;
  //         complete();
  //     });
  // }

  // function getPerson(res, mysql, context, id, complete){
  //     var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = ?";
  //     var inserts = [id];
  //     mysql.pool.query(sql, inserts, function(error, results, fields){
  //         if(error){
  //             res.write(JSON.stringify(error));
  //             res.end();
  //         }
  //         context.person = results[0];
  //         complete();
  //     });
  // }

  /*Display all people. Requires web based javascript to delete users with AJAX*/

  router.get('/', function (req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deleteperson.js", "filterpeople.js", "searchpeople.js"];
    var mysql = req.app.get('mysql');
    getHouses(res, mysql, context, complete);

    function complete() {
      callbackCount++;
      if (callbackCount >= 1) {
        res.render('houses', context);
      }

    }
  })

  return router;
}();