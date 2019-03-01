var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "3anofjnono",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcom to Bamazon....");
    start();
});
var stock = 0;
var productID = "";
function start() {
    console.log("Showing all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].id + " || Department: " + res[i].department_name + " || Product Name: " + res[i].product_name + " || Price : $" + res[i].price + " || Quantity left : " + res[i].stock_quantity)
        }
        console.log("----------------------------------------------");
        shopping();
    })
};
function shopping() {
    inquirer
        .prompt({
            name: "askId",
            type: "input",
            message: "Please enter a product ID:",
            validate: function (value) {
                if (isNaN(value) === false) {
                    if (value > 0 ) {
                        return true;
                    }
                }
                console.log("\n Please enter a valid product ID.....");
                return false;
            }
        }).then(function (answer0) {
            connection.query("SELECT id,product_name,department_name,price,stock_quantity FROM products WHERE?", {
                id: answer0.askId
            }, function (err, res) {
                if (err) {
                    console.log(err);
                }
                productID = answer0.askId;
                console.log("----------------------------------------------");
                console.log("You've selected.....")
                console.log("Product ID: " + res[0].id + " || Product Name: " + res[0].product_name + " || Department: " + res[0].department_name + " || Price : $" + res[0].price)
                console.log("----------------------------------------------");
                inquirer
                    .prompt({
                        name: "askQuantity",
                        type: "input",
                        message: "Please enter quantity:",
                        validate: function (value) {
                            if (value > res[0].stock_quantity){
                                console.log("\n Insufficient quantity!");
                                return false;
                            }
                             else if (isNaN(value) === false) {
                                if (value > 0) {
                                    return true;
                                }
                            }else {
                                console.log("\n Please enter a valid number.....");
                                return false;
                            }
                    
                        }
                    }).then(function (answer1) {
                        stock = res[0].stock_quantity - answer1.askQuantity
                            var total = answer1.askQuantity * res[0].price;
                            console.log("----------------------------------------------");
                            console.log("Your total is :$" + total.toFixed(2) + "\n")
                            console.log("----------------------------------------------");
                            inquirer
                                .prompt({
                                    name: "confirm",
                                    type: "confirm",
                                    message: "Place your order?"
                                }).then(function (answer) {
                                    if (answer.confirm) {
                                        connection.query("UPDATE products SET ? WHERE ?",
                                            [{
                                                stock_quantity: (stock)
                                            }, {
                                                id: productID
                                            }], function (err) {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            })
                                        console.log("Placing order......\n");
                                        console.log("Thank you for your purchase!!")
                                        connection.end();
                                    } else {
                                        inquirer
                                            .prompt({
                                                name: "confirm",
                                                type: "confirm",
                                                message: "Would you like to continue shopping?"
                                            }).then(function (answer) {
                                                if (answer.confirm) {
                                                    start();
                                                } else {
                                                    console.log("Thank you for visitting Bamazon.....")
                                                    connection.end();
                                                }
                                            })

                                    }
                                })
                        
                    })
            })
        })
}

