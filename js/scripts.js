
// Business Logic

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('size')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}; //This function makes it so that only one size can be selected

var size = [];
var toppings = [];

// User Interface Logic

$(function() {
  $("form#addPizza").submit(function(event){
    event.preventDefault();
    $("input:checkbox[name=size]:checked").each(function() {
      size.push($(this).val());
      console.log("size", size);
    })
    $("input:checkbox[name=toppings]:checked").each(function() {
      toppings.push($(this).val());
      console.log("toppings", toppings)
    })
  })
});
