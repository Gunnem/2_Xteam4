var db = require("../models");

var unirest = require("unirest");

var input = "chicken";

var recipeNumber = 296119;

module.exports = function(app) {
  //API CALL TO GET RECIPES
        unirest
          .get(
            "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?number=6&offset=0&query=" +
              input
          )
          .header(
            "X-RapidAPI-Key",
            "iO1JP0bW8vmshiir9bxd1hPu4sv4p1KhdBHjsnWR4JOwXs3gBt"
          )
          .end(function(result) {
            console.log("*****************RECIPE CALL*****************");
            for (i = 0; i < result.body.results.length; i++) {
              console.log("Recipe Name: " + result.body.results[i].title);
              db.Recipe.create({
                recipeName: result.body.results[i].title,
                photo: result.body.results[i].image,
                recipeNumber: result.body.results[i].id
              }).then(function() {});
            }

            // console.log("id: " + result.body.results[0].id);
            // console.log("Image: " + result.body.results[0].image);
          });

        //Finds ingredients based on Recipe index#
        unirest
          .get(
            "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" +
              recipeNumber +
              "/information"
          )
          .header(
            "X-RapidAPI-Key",
            "iO1JP0bW8vmshiir9bxd1hPu4sv4p1KhdBHjsnWR4JOwXs3gBt"
          )
          .end(function(result) {
            console.log("*****************SHOPPING LIST CALL*****************");
            // console.log(
            //   result.status,
            //   result.headers
            // );
            // console.log(result.body);

            for (i = 0; i < result.body.extendedIngredients.length; i++) {
              // console.log("result.body: " + JSON.stringify(result.body.extendedIngredients[0]));
              console.log(
                "results.result.body.extendedIngredients[i].name: " +
                  result.body.extendedIngredients[i].name
              );

              db.ShoppingList.create({
                ingredient: result.body.extendedIngredients[i].name
              }).then(function(result) {
                // $("#ing1").text(result.body.extendedIngredients[0].name);
                //     $("#ing2").text(result.body.extendedIngredients[1].name);
                //         $("#ing3").text(result.body.extendedIngredients[2].name);
              });
            }
          });

        // Create a new example
        // app.post("/api/recipes", function(req, res) {
        //
      // });


  app.get("/api/examples", function(req, res) {
    db.ShoppingList.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.ShoppingList.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
