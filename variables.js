var inquirer = require("inquirer");
// var Choices = require('prompt-choices');
// // var choices = new Choices(['foo', 'bar', 'baz']);

var mainCourse = ["burger","pizza","salad"];
var mc= "";
var toppings = ["no toppings","cheese","marinara", "peperoni","mayo"," bacon"];
var mainToppings = [];
var patty =["hamburger","turkey","fish","veggie"];
var pattyChoice="";
var sides =["no side","fries","onion rings","breadsticks"];
var side="";
var drinks = ["no drink","water","soda","beer"];
var drink ="";
var meal=[];
function Meal(mc, side, drink )
{
    this.mc=mc;
    this.side=side;
    this.drink=drink;
}
start();
function start()
{
    inquirer
    .prompt([
      {
        type: "list",
        name: "mainCourse",
        message: "Main Course?",
        choices: mainCourse
      }
    ]).then(function(answer) {
        mc=answer.mainCourse;
     console.log(mc);
     checkAnswer();
    //  setTimeout(checkAnswer, 500);
    });
}
function checkAnswer()
{
    if(mc=="burger")
     {
        pickPatty()
     }
    //  else if(mc=="pizza")
    //  {
    //     pickPatty()
    //  }
     else pickToppings();
}
   function pickPatty()
   {
    inquirer
    .prompt([
      {
        type: "list",
        name: "whatPatty",
        message: "What kind of patty?",
        choices: patty
      }
    ]).then(function(answer) {
    pattyChoice=answer.whatPatty;
      pickToppings();
    });
   }

   function pickToppings()
   {
    inquirer
    .prompt([
        {
            type: "checkbox",
            name: "whatToppings",
            message: "What Toppings?",
            choices: toppings,
            default: "no toppings"

          }
    ]).then(function(answer) {
        mainToppings=answer.whatToppings;
        if(mainToppings[0]==null) mainToppings[0] ="nothing";
        console.log(mainToppings);
        pickSide();
    });
   }
   function pickSide()
   {
    inquirer
    .prompt([
        {
            type: "list",
            name: "whatSide",
            message: "What Side?",
            choices: sides,
            default: "no side"
          }
    ]).then(function(answer) {
        side=answer.whatSide;
        console.log(side);
        pickDrink();
    });
   }
   function pickDrink()
   {
    inquirer
    .prompt([
        {
            type: "list",
            name: "whatDrink",
            message: "What drink?",
            choices: drinks,
            default: "no drink"
          }
    ]).then(function(answer) {
        drink=answer.whatDrink;
        console.log(drink); //pickDrink();
        printMeal();
    });
   }
   function printMeal()
   {
    if(mc=="burger")
    {
        // console.log(`You ordered a ${pattyChoice} ${mc} topped with ${mainToppings.join(", ")} with ${side} and a ${drink}.`)
    } else  {
        // console.log(`You ordered a ${mc} topped with ${mainToppings.join(", ")} with ${side} and a ${drink}.`)
    }
    var newMeal = new Meal(mc,side,drink);
    console.log(newMeal);
   }