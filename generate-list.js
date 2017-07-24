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

let content = JSON.parse(fs.readFileSync('recipes.json'))
let recipes = content.recipes
let shoppingList = new Map() // "item" -> Quantity

for (let recipe of recipes) {
  for (let ingredient of recipe.ingredients) {
    let itemName = ingredient.name
    let itemQuantity = new Quantity(ingredient.quantity)

    if (shoppingList.has(itemName)) {
      let quantity = shoppingList.get(itemName)
      quantity.value += itemQuantity.value
    } else {
      shoppingList.set(itemName, itemQuantity)
    }
  }
}

for (let [item, quantity] of shoppingList.entries()) {
  let displayString = `${item}: ${quantity.value} ${quantity.unit}`
  console.log(displayString)
}