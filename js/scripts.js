// Business Logic for site behavior --------------------------------------------

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('size')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
};

// Business Logic for Pizza ----------------------------------------------------

var regToppings = ["mushrooms", "onions", "black olives", "green peppers", "pineapple", "spinach"];

function Pizza(size, toppings, price) {
  this.size = size,
  this.toppings = toppings,
  this.price = 0;
  this.currentPizzaId = 0
}

Pizza.prototype.getPizzaPrice = function() {
  if(this.size === "small") {
    this.price += 8;
  } else if(this.size === "medium") {
    this.price += 10;
  } else if(this.size === "large") {
      this.price += 12;
  } else if(this.size === "extra large") {
      this.price += 14;
  }
  if (this.toppings.length === 0) {
    this.price += 0;
  } else {
    this.price += this.toppings.length;
  }
};

// User Interface Logic --------------------------------------------------------

$(document).ready(function() {
  $("form#new-pizza").submit(function(event) {
    event.preventDefault();
    var size = $("input:checkbox[name=size]:checked").val();
    var toppings = [];
    $("input:checkbox[name=toppings]:checked").each(function() {
      toppings.push($(this).val());
    })
    var newPizza = new Pizza(size, toppings);
    newPizza.getPizzaPrice();
    $(".size").text(newPizza.size);
    $(".toppings").text(newPizza.toppings.join(", "));
    $(".price").text(newPizza.price);
    $("#output").show();
  })
})
