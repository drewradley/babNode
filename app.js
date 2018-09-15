var inquirer = require("inquirer");
var mysql = require("mysql2");
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "fishsticks",
    database: "bab_DB"
  });
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    else start();
  });
// var Choices = require('prompt-choices');
// // var choices = new Choices(['foo', 'bar', 'baz']);

var mainCourse = ["burger","pizza","salad"];
var mc= "";
var mainCourses =[];
var mainCoursesToppings =[];
var mainCoursesPatties =[];
var toppings = ["no toppings","cheese","marinara", "peperoni","mayo"," bacon"];
var mainToppings = [];
var patty =["hamburger","turkey","fish","veggie"];
var pattyChoice="";
var sides =["no side","fries","onion rings","breadsticks"];
var side="";
var drinks = ["no drink","water","soda","beer"];
var drink ="";
var order=[];
function Meal(mc, side, drink )
{
    this.mc=mc;
    this.side=side;
    this.drink=drink;
}
function MainCourse(mainCourse,toppings, patty)
{
    this.mainCourse=mainCourse;
    this.toppings=toppings;
    this.patty=patty;
  }
  function Order(meal)
  {
      this.meal=meal;
  }
// start();
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
    var newMC= new MainCourse(mc,mainToppings,pattyChoice);
    mainCourses.push(newMC);
    mainCoursesToppings.push(mainToppings);
    mainCoursesPatties.push(pattyChoice);
    console.log(newMC);
    var newMeal = new Meal(newMC,side,drink);
    // var newMeal = new Meal(mc,side,drink);
    order.push(newMeal);
    //console.log(newMeal);

    connection.query(
        "INSERT INTO maincourse SET ?",
        {
            mainCourse: mc,
            toppings: mainToppings.join(", "),
            patty: pattyChoice
        },
        function(err) {
          if (err) throw err;
          //console.log("Your main course was created successfully!");
          }
      );
      connection.query(
        "INSERT INTO meal SET ?",
        {
            mainCourse: JSON.stringify(newMeal),
            side: side,
            drink: drink
        },
        function(err) {
          if (err) throw err;
          //console.log("Your meal was created successfully!");
          inquirer
            .prompt([
            {
            name: "anykey",
            type: "confirm",
            message: "Continue?"
            }
            ]).then(function(answer) {
           if(answer.anykey)
           {
                pattyChoice="";
                side="";
                drink="";
                mainToppings = [];
                start();
           }
           else {
            console.log(mainCourses);
            console.log("your order:")
            console.log(order);
            connection.query(
                "INSERT INTO orders SET ?",
                {
                    orderZ: JSON.stringify(order)
                   // toppings
                    
                },
                function(err) {
                  if (err) throw err;
                  // re-prompt the user for if they want to bid or post
                  //start();
                }
              );
               connection.end();
            }
            });
        }
      );
   }