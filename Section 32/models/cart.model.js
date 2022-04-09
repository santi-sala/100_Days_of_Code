const Product = require("../models/product.model");

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    (this.totalPrice = totalPrice).toFixed(2);
  }

  async updatePrices() {
    const productIds = this.items.map(function (item) {
      return item.product.id;
    });

    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
      const product = products.find(function (prod) {
        return prod.id === cartItem.product.id;
      });

      if (!product) {
        // product was deleted!
        // "schedule" for removal from cart
        deletableCartItemProductIds.push(cartItem.product.id);
        continue;
      }

      // product was not deleted
      // set product data and total price to latest price from database
      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(function (item) {
        return deletableCartItemProductIds.indexOf(item.product.id) < 0;
      });
    }

    // re-calculate cart totals
    this.totalQuantity = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  }

  //   Storing in users (log in or not) session not in database
  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    // Checking if the product already exists in cart
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      //   If theres a match, increment the quantity and total price
      if (item.product.id === product.id) {
        cartItem.quantity = +item.quantity + 1;
        (cartItem.totalPrice = item.totalPrice + product.price).toFixed(2);
        this.items[i] = cartItem;

        this.totalQuantity++;
        (this.totalPrice += product.price).toFixed(2);
        return;
      }
    }
    // If theres no match in the current cart, we add the product to the cart using the predefined cartItem
    this.items.push(cartItem);
    this.totalQuantity++;
    (this.totalPrice += product.price).toFixed(2);
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      //   If theres a match, increment the quantity and total price
      if (item.product.id === productId && newQuantity > 0) {
        // Making a copy of the found --> item {...item}
        const cartItem = { ...item };
        const quantityChange = newQuantity - item.quantity;
        cartItem.quantity = newQuantity;
        (cartItem.totalPrice = newQuantity * item.product.price).toFixed(2);
        this.items[i] = cartItem;

        this.totalQuantity = this.totalQuantity + quantityChange;
        (this.totalPrice += quantityChange * item.product.price).toFixed(2);
        return { updatedItemPrice: cartItem.totalPrice };
      } else if (item.product.id === productId && newQuantity <= 0) {
        // .splice is to remove a number of items (in this case 1) from an array starting from the provided index (i)
        this.items.splice(i, 1);
        this.totalQuantity = this.totalQuantity - item.quantity;
        (this.totalPrice -= item.totalPrice).toFixed(2);
        return { updatedItemPrice: 0 };
      }
    }
  }
}

module.exports = Cart;
