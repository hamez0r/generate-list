'use strict'

let fs = require('fs')

let Quantity = function(str) {
  let tokens = str.split(' ')

  if (tokens.length < 1) {
    throw "OMG MEASURE NOT CORRECT"
  }

  this.value = Number(tokens[0])
  this.unit = tokens.length == 2 ? tokens[1] : ""
}

let ShoppingList = function() {
  this.items = new Map() // "item" -> Quantity
}

ShoppingList.prototype = {
  addItem: function(item, quantity) {
    if (this.items.has(item)) 
      this.items.get(item).value += quantity.value
    else
      this.items.set(item, quantity)
  },

  print: function() {
    for (let [item, quantity] of this.items.entries()) {
      let displayString = `${item}: ${quantity.value} ${quantity.unit}`
      console.log(displayString)
    }
  }
}

let content = JSON.parse(fs.readFileSync('recipes.json'))
let recipes = content.recipes
let shoppingList = new ShoppingList()

for (let recipe of recipes) {
  for (let ingredient of recipe.ingredients) {
    let itemName = ingredient.name
    let itemQuantity = new Quantity(ingredient.quantity)

    shoppingList.addItem(itemName, itemQuantity)
  }
}

shoppingList.print()