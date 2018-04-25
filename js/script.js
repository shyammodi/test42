/* Sets a random integer quantity in range [1, 20] for each flavor.
   Referenced https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random,
   https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore,
   https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement,
   https://www.w3schools.com/jsref/prop_node_childnodes.asp,
   https://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript,
   https://www.w3schools.com/cssref/css_selectors.asp,
   https://css-tricks.com/multiple-class-id-selectors/, and
   https://www.w3schools.com/jsref/met_document_createtextnode.asp*/
function setQuantities() {
  const quantityPriceList = document.querySelectorAll(".flavor .meta")
  for (let i = 0; i < quantityPriceList.length; i++) {
    const quantityElement = document.createElement("span")
    quantityElement.setAttribute("class", "quantity")
    const quantityNumber = Math.floor(Math.random()*20 + 1)
    quantityElement.appendChild(document.createTextNode(quantityNumber))
    const nextElement = quantityPriceList[i].childNodes[0]
    quantityPriceList[i].insertBefore(quantityElement, nextElement)
  }
}

/* Extracts and returns an array of flavor objects based on data in the DOM. Each
 * flavor object should contain five properties:
 *
 * element: the HTMLElement that corresponds to the .flavor div in the DOM
 * name: the name of the flavor
 * description: the description of the flavor
 * price: how much the flavor costs
 * quantity: how many cups of the flavor are available
 * I referenced: https://www.w3schools.com/jsref/jsref_parseint.asp,
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat, and
 * https://stackoverflow.com/questions/2556338/currency-math-in-javascript
 */
function extractFlavors() {
  const flavors = []
  const flavorList = document.querySelectorAll(".flavor")
  for (let i = 0; i < flavorList.length; i++) {
    const currentFlavor = {}
    currentFlavor.element = flavorList[i]
    currentFlavor.name = flavorList[i].querySelector("h2").innerHTML
    currentFlavor.description = flavorList[i].querySelector(".description p").innerHTML
    currentFlavor.price = parseFloat(flavorList[i].querySelector(".price").innerHTML.replace("$",""))
    currentFlavor.quantity = parseInt(flavorList[i].querySelector(".quantity").innerHTML)
    flavors.push(currentFlavor)
  }
  return flavors
}

/* Calculates and returns the average price of the given set of flavors. The
 * average should be rounded to two decimal places.
 * I referenced https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach,
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed,
 * https://docs.microsoft.com/en-us/scripting/javascript/reference/foreach-method-array-javascript#callback-function-syntax, and
 * https://medium.com/@_edhuang/javascript-for-foreach-and-callbacks-206288604656*/
function calculateAveragePrice(flavors) {
  let sum = 0
  let count = 0
  flavors.forEach(value => {
    sum += value.price
    count++
  })
  const averagePrice = Number.parseFloat(sum/count).toFixed(2)
  return averagePrice
}

/* Finds flavors that have prices below the given threshold. Returns an array
 * of strings, each of the form "[flavor] costs $[price]". There should be
 * one string for each cheap flavor.
 * I referenced  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map,
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
function findCheapFlavors(flavors, threshold) {
  const cheapFlavors = flavors.filter(flavor => flavor.price < threshold)
  const cheapFlavorsString = cheapFlavors.map(flavor => flavor.name + " costs $" + flavor.price)
  return cheapFlavorsString
}

/* Populates the select dropdown with options. There should be one option tag
 * for each of the given flavors. */
function populateOptions(flavors) {
  // TODO
}

/* Processes orders for the given set of flavors. When a valid order is made,
 * decrements the quantity of the associated flavor. */
function processOrders(flavors) {
  // TODO
}

/* Highlights flavors when clicked to make a simple favoriting system. */
function highlightFlavors(flavors) {
  // TODO
}


/***************************************************************************/
/*                                                                         */
/* Please do not modify code below this line, but feel free to examine it. */
/*                                                                         */
/***************************************************************************/


const CHEAP_PRICE_THRESHOLD = 1.50

// setting quantities can modify the size of flavor divs, so apply the grid
// layout *after* quantities have been set.
setQuantities()
const container = document.getElementById('container')
new Masonry(container, { itemSelector: '.flavor' })

// calculate statistics about flavors
const flavors = extractFlavors()
const averagePrice = calculateAveragePrice(flavors)
console.log('Average price:', averagePrice)

const cheapFlavors = findCheapFlavors(flavors, CHEAP_PRICE_THRESHOLD)
console.log('Cheap flavors:', cheapFlavors)

// handle flavor orders and highlighting
populateOptions(flavors)
processOrders(flavors)
highlightFlavors(flavors)
