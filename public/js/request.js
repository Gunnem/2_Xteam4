
var ingredient = [];

var queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=6&ranking=1&ingredients=tuna'

$.ajax({
  url:queryURL,
  type:"GET",
  crossDomain: true,
  headers:{
    "X-RapidAPI-Key": "iO1JP0bW8vmshiir9bxd1hPu4sv4p1KhdBHjsnWR4JOwXs3gBt",
  }
}).then(function(response){
  console.log(response);
  // console.log(response[0].title);
  $("#title0").prepend(response[0].title);
});

// $("#title0").prepend(response[0].title);


// connection.end();
$("#submitNamebtn").on("click", function(event) {
    event.preventDefault();
  
    // This line grabs the input from the textbox
   var ingredientName = $("#inputName").val().trim();
    ingredient.push(ingredientName);
   
    
});