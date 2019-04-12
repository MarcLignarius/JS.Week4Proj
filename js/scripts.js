// Business Logic for site behavior --------------------------------------------

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('size')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}; //This function makes it so that only one size can be selected

// Business Logic for Order --------------------------------------------

function Order() {
  this.pizzas = [];
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
}

// Business Logic for Pizzas -------------------------------------------------

function Pizza(size, toppings) {
  this.size = size,
  this.toppings = toppings
}

Pizza.prototype.fullDescription = function() {
  return ("Size: " + this.size + " Toppings: " + this.toppings + ".");
}

// User Interface Logic

$(function() {
  $("form#addPizza").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=size]:checked").each(function() {
      var size = [];
      size.push($(this).val());
      console.log("size", size);
    }) // Tracks the pizza size the user selected
    $("input:checkbox[name=toppings]:checked").each(function() {
      var toppings = [];
      toppings.push($(this).val());
      console.log("toppings", toppings)
    }) // Tracks the pizza toppings the user selected
  })
});

// Testing stuff

var order = new Order();
var pizza1 = new Pizza("XL", ["Mushrooms", "Onions", "Black Olives"]);
var pizza2 = new Pizza("SM", ["Green Peppers", "Pineapple", "Spinach"]);
order.addPizza(pizza1);
order.addPizza(pizza2);
