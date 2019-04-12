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

function Pizza(size, toppings, price) {
  this.size = size,
  this.toppings = toppings
}

Pizza.prototype.getPizzaPrice = function(newPizza) {
  var price = 0;
  if(newPizza.size === "small") {
    newPizza.price += 8;
  } else if(newPizza.size === "medium") {
    newPizza.price += 10;
  } else if(newPizza.size === "large") {
      newPizza.price += 12;
  } else if(newPizza.size === "extra large") {
      newPizza.price += 14;
  }
  if (newPizza.toppings.length === 0) {
    price += 0;
  } else {
    price += newPizza.toppings.length;
  }
  return newPizza.price;
};

// User Interface Logic ---------
var order = new Order();

function displayOrder(orderToDisplay) {
  var pizzasList = $("ul#current-order");
  var htmlForPizzaInfo = "";
  orderToDisplay.pizzas.forEach(function(pizza) {
    htmlForPizzaInfo += "<li id=" + pizza.id + ">" + "A " + pizza.size + " pizza with " + pizza.toppings.join(', ') + "." + " Price: $" + pizza.price + "</li>";
  });
  pizzasList.html(htmlForPizzaInfo);
};

function showPizza(pizzaId) {
  var pizza = order.findPizza(pizzaId);
  $("#pizza-details").show();
  $(".size").html(pizza.size);
  $(".toppings").html(pizza.toppings);
  $(".price").html(pizza.price);
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
    var price = "";
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
    var newPizza = new Pizza(size, toppings, price); // Creates a new Pizza object
    order.addPizza(newPizza); // Adds the pizza to the order
    displayOrder(order); // Displays all pizzas ordered
    getPizzaPrice(newPizza);
  })
})
