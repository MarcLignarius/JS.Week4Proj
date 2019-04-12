// Business Logic for site behavior --------------------------------------------

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('size')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}; //This function makes it so that only one size can be selected

// Business Logic for Order ----------------------------------------------------

function Order() {
  this.pizzas = [],
  this.currentPizzaId = 0
}

Order.prototype.addPizza = function(pizza) {
  pizza.id = this.assignPizzaId();
  this.pizzas.push(pizza);
}

Order.prototype.assignPizzaId = function() {
  this.currentPizzaId += 1;
  return this.currentPizzaId;
}

Order.prototype.findPizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  };
  return false;
}

Order.prototype.deletePizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Pizza ---------------------------------------------------

function Pizza(size, toppings) {
  this.size = size,
  this.toppings = toppings
}

Pizza.prototype.fullDescription = function() {
  return ("Size: " + this.size + " Toppings: " + this.toppings + ".");
}

// User Interface Logic ---------
var order = new Order();

function displayOrder(orderToDisplay) {
  var pizzasList = $("ul#current-order");
  var htmlForPizzaInfo = "";
  orderToDisplay.pizzas.forEach(function(pizza) {
    htmlForPizzaInfo += "<li id=" + pizza.id + ">" + pizza.size + " " + pizza.toppings + "</li>";
  });
  pizzasList.html(htmlForPizzaInfo);
};

function showPizza(pizzaId) {
  var pizza = order.findPizza(pizzaId);
  $("#pizza-details").show();
  $(".size").html(pizza.size);
  $(".toppings").html(pizza.toppings);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + pizza.id + ">Delete</button>");
}

function attachPizzaListeners() {
  $("ul#current-order").on("click", "li", function() {
    showPizza(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    order.deletePizza(this.id);
    $("#pizza-details").hide();
    displayOrder(order);
  });
};

$(document).ready(function() {
  attachPizzaListeners();
  $("form#new-pizza").submit(function(event) {
    event.preventDefault();
    var size = [];
    $("input:checkbox[name=size]:checked").each(function() {
      size.push($(this).val());
      console.log("size", size);
    }) // Tracks the pizza size the user selected
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function() {
      toppings.push($(this).val());
      console.log("toppings", toppings)
    }) // Tracks the pizza toppings the user selected
    var newPizza = new Pizza(size, toppings); // Creates a new Pizza object
    order.addPizza(newPizza); // Adds the pizza to the order
    displayOrder(order); // Displays all pizzas ordered
  })
})
