module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function serveHouses(req, res){
        console.log("You asked me for some houses?")
        // var query = 'SELECT planet_id, name, population FROM bsg_planets';
        var query = 'SELECT houses.id as id, name FROM houses'
        var mysql = req.app.get('mysql');
        var context = {};

        function handleRenderingOfHouses(error, results, fields){
          console.log(error)
          console.log(results)
          console.log(fields)
          //take the results of that query and store ti inside context
          context.houses = results;
          //pass it to handlebars to put inside a file
          res.render('houses', context)
        }
        //execute the sql query
        mysql.pool.query(query, handleRenderingOfHouses)

        //res.send('Here you go!');
    }

    function serveOneHouse(chicken, steak) {
      console.log(chicken.params.fancyId);
      console.log(chicken.params);
      fancyId = chicken.params.fancyId

      var queryString = "SELECT id, name FROM houses WHERE id = ?"

      var mysql = steak.app.get('mysql')
      var context = {};

      function handleRenderingOfOneHouse(error, results, fields){
          console.log("results are " + results)
          context.planet = results[0]
          console.log(context)

          if(error){
            console.log(error)
            steak.write(error)
            steak.end();
          }else{
            steak.render('serverHouse',context);
          }
      }
      //execute the query
      var queryString = mysql.pool.query(queryString, fancyId, handleRenderingOfOneHouse);

      //steak.send("Here's a good tasty well done steak");
    }

    router.get('/', serveHouses);
    router.get('/:fancyId', serveOneHouse);
    return router;
}();
